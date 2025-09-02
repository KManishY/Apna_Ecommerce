const { Router } = require("express");
const { OrderModel } = require("../Modal/order.module.js");
const { CartModel } = require("../Modal/Cart.module.js");
const { ProductModel } = require("../Modal/product.module.js");
const { AddressModel } = require("../Modal/address.module.js");
const { authentication } = require("../Middleware/authentication.js");
const mongoose = require("mongoose");
require("dotenv").config();

const orderController = Router();

// Apply authentication middleware to all routes
orderController.use(authentication);

// Create new order from cart
orderController.post("/", async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	
	try {
		const userEmail = req.body.userEmail;
		const userId = req.body.userId;
		const { 
			shippingAddressId, 
			billingAddressId, 
			paymentMethod = "cod",
			notes = ""
		} = req.body;
		
		// Get cart items with product details using aggregation
		const cartItems = await CartModel.aggregate([
			{
				$match: { userEmail }
			},
			{
				$addFields: {
					prod_id_object: { $toObjectId: "$prod_id" }
				}
			},
			{
				$lookup: {
					from: "products",
					localField: "prod_id_object",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
				$unwind: {
					path: "$productDetails",
					preserveNullAndEmptyArrays: true
				}
			}
		]);
		
		if (cartItems.length === 0) {
			await session.abortTransaction();
			return res.status(400).json({
				success: false,
				message: "Cart is empty"
			});
		}
		
		// Get addresses
		const shippingAddress = await AddressModel.findOne({ 
			_id: shippingAddressId, 
			userEmail 
		});
		
		if (!shippingAddress) {
			await session.abortTransaction();
			return res.status(400).json({
				success: false,
				message: "Shipping address not found"
			});
		}
		
		let billingAddress = shippingAddress;
		if (billingAddressId && billingAddressId !== shippingAddressId) {
			billingAddress = await AddressModel.findOne({ 
				_id: billingAddressId, 
				userEmail 
			});
			
			if (!billingAddress) {
				await session.abortTransaction();
				return res.status(400).json({
					success: false,
					message: "Billing address not found"
				});
			}
		}
		
		// Calculate order totals
		let subtotal = 0;
		const orderItems = cartItems.map(item => {
			const price = Number(item.productDetails.prod_price || 0);
			const quantity = Number(item.count || 1);
			const totalPrice = price * quantity;
			subtotal += totalPrice;
			
			return {
				productId: item.prod_id_object,
				productName: item.productDetails.prod_name || "Unknown Product",
				productImage: item.productDetails.prod_image,
				productCategory: item.productDetails.prod_cat,
				quantity,
				price,
				totalPrice
			};
		});
		
		// Calculate shipping, tax, and total
		const shippingCost = subtotal > 1000 ? 0 : 50; // Free shipping above ₹1000
		const tax = Math.round(subtotal * 0.08); // 8% GST
		const totalAmount = subtotal + shippingCost + tax;
		
		// Create order
		const newOrder = new OrderModel({
			userId,
			userEmail,
			items: orderItems,
			subtotal,
			shippingCost,
			tax,
			totalAmount,
			paymentMethod,
			shippingAddress: {
				fullName: shippingAddress.fullName,
				phone: shippingAddress.phone,
				addressLine1: shippingAddress.addressLine1,
				addressLine2: shippingAddress.addressLine2,
				landmark: shippingAddress.landmark,
				city: shippingAddress.city,
				pinCode: shippingAddress.pinCode,
				state: shippingAddress.state,
				country: shippingAddress.country
			},
			billingAddress: {
				fullName: billingAddress.fullName,
				phone: billingAddress.phone,
				addressLine1: billingAddress.addressLine1,
				addressLine2: billingAddress.addressLine2,
				landmark: billingAddress.landmark,
				city: billingAddress.city,
				pinCode: billingAddress.pinCode,
				state: billingAddress.state,
				country: billingAddress.country
			},
			notes
		});
		
		await newOrder.save({ session });
		
		// Clear cart after successful order
		await CartModel.deleteMany({ userEmail }, { session });
		
		await session.commitTransaction();
		
		res.status(201).json({
			success: true,
			data: newOrder,
			message: "Order created successfully"
		});
		
	} catch (error) {
		await session.abortTransaction();
		console.error("Error creating order:", error);
		res.status(500).json({
			success: false,
			message: "Error creating order",
			error: error.message
		});
	} finally {
		session.endSession();
	}
});

// Get all orders for a user
orderController.get("/", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const { page = 1, limit = 10, status } = req.query;
		
		const query = { userEmail };
		if (status) {
			query.status = status;
		}
		
		const orders = await OrderModel.find(query)
			.sort({ orderDate: -1 })
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.populate('items.productId', 'prod_name prod_image');
		
		const total = await OrderModel.countDocuments(query);
		
		res.status(200).json({
			success: true,
			data: {
				orders,
				pagination: {
					currentPage: parseInt(page),
					totalPages: Math.ceil(total / limit),
					totalOrders: total,
					hasNext: page < Math.ceil(total / limit),
					hasPrev: page > 1
				}
			},
			message: "Orders fetched successfully"
		});
	} catch (error) {
		console.error("Error fetching orders:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching orders",
			error: error.message
		});
	}
});

// Get specific order by ID
orderController.get("/:id", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const { id } = req.params;
		
		const order = await OrderModel.findOne({ 
			_id: id, 
			userEmail 
		}).populate('items.productId', 'prod_name prod_image prod_desc');
		
		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found"
			});
		}
		
		res.status(200).json({
			success: true,
			data: order,
			message: "Order fetched successfully"
		});
	} catch (error) {
		console.error("Error fetching order:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching order",
			error: error.message
		});
	}
});

// Update order status (for admin use)
orderController.put("/:id/status", async (req, res) => {
	try {
		const { id } = req.params;
		const { status, adminNotes } = req.body;
		
		const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"];
		
		if (!validStatuses.includes(status)) {
			return res.status(400).json({
				success: false,
				message: "Invalid status"
			});
		}
		
		const updateData = { status };
		if (adminNotes) {
			updateData.adminNotes = adminNotes;
		}
		
		// Add tracking dates
		if (status === "shipped") {
			updateData.shippingDate = new Date();
		} else if (status === "delivered") {
			updateData.deliveryDate = new Date();
		}
		
		const order = await OrderModel.findByIdAndUpdate(
			id,
			updateData,
			{ new: true, runValidators: true }
		);
		
		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found"
			});
		}
		
		res.status(200).json({
			success: true,
			data: order,
			message: "Order status updated successfully"
		});
	} catch (error) {
		console.error("Error updating order status:", error);
		res.status(500).json({
			success: false,
			message: "Error updating order status",
			error: error.message
		});
	}
});

// Cancel order
orderController.put("/:id/cancel", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const { id } = req.params;
		const { reason } = req.body;
		
		const order = await OrderModel.findOne({ 
			_id: id, 
			userEmail 
		});
		
		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found"
			});
		}
		
		// Check if order can be cancelled
		if (["shipped", "delivered", "cancelled"].includes(order.status)) {
			return res.status(400).json({
				success: false,
				message: "Order cannot be cancelled at this stage"
			});
		}
		
		order.status = "cancelled";
		if (reason) {
			order.notes = reason;
		}
		
		await order.save();
		
		res.status(200).json({
			success: true,
			data: order,
			message: "Order cancelled successfully"
		});
	} catch (error) {
		console.error("Error cancelling order:", error);
		res.status(500).json({
			success: false,
			message: "Error cancelling order",
			error: error.message
		});
	}
});

// Get order statistics for user
orderController.get("/stats/summary", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		
		const stats = await OrderModel.aggregate([
			{ $match: { userEmail } },
			{
				$group: {
					_id: null,
					totalOrders: { $sum: 1 },
					totalSpent: { $sum: "$totalAmount" },
					pendingOrders: {
						$sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
					},
					deliveredOrders: {
						$sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] }
					},
					cancelledOrders: {
						$sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] }
					}
				}
			}
		]);
		
		const result = stats[0] || {
			totalOrders: 0,
			totalSpent: 0,
			pendingOrders: 0,
			deliveredOrders: 0,
			cancelledOrders: 0
		};
		
		res.status(200).json({
			success: true,
			data: result,
			message: "Order statistics fetched successfully"
		});
	} catch (error) {
		console.error("Error fetching order statistics:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching order statistics",
			error: error.message
		});
	}
});

module.exports = { orderController };
