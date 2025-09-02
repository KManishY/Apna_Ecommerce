const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
		required: true
	},
	productName: {
		type: String,
		required: true
	},
	productImage: {
		type: String
	},
	productCategory: {
		type: String
	},
	quantity: {
		type: Number,
		required: true,
		min: 1
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	totalPrice: {
		type: Number,
		required: true,
		min: 0
	}
});

const orderSchema = new mongoose.Schema({
	orderId: {
		type: String,
		unique: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'userauth',
		required: true
	},
	userEmail: {
		type: String,
		required: true
	},
	orderDate: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"],
		default: "pending"
	},
	paymentStatus: {
		type: String,
		enum: ["pending", "paid", "failed", "refunded"],
		default: "pending"
	},
	paymentMethod: {
		type: String,
		enum: ["cod", "online", "card", "upi", "wallet"],
		default: "cod"
	},
	paymentId: {
		type: String
	},
	
	// Order Items
	items: [orderItemSchema],
	
	// Pricing Details
	subtotal: {
		type: Number,
		required: true,
		min: 0
	},
	discount: {
		type: Number,
		default: 0,
		min: 0
	},
	shippingCost: {
		type: Number,
		default: 0,
		min: 0
	},
	tax: {
		type: Number,
		default: 0,
		min: 0
	},
	totalAmount: {
		type: Number,
		required: true,
		min: 0
	},
	
	// Address Information
	shippingAddress: {
		fullName: { type: String, required: true },
		phone: { type: String, required: true },
		addressLine1: { type: String, required: true },
		addressLine2: { type: String },
		landmark: { type: String },
		city: { type: String, required: true },
		pinCode: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, default: "India" }
	},
	
	billingAddress: {
		fullName: { type: String, required: true },
		phone: { type: String, required: true },
		addressLine1: { type: String, required: true },
		addressLine2: { type: String },
		landmark: { type: String },
		city: { type: String, required: true },
		pinCode: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, default: "India" }
	},
	
	// Tracking Information
	trackingNumber: {
		type: String
	},
	shippingDate: {
		type: Date
	},
	deliveryDate: {
		type: Date
	},
	
	// Notes
	notes: {
		type: String
	},
	
	// Admin Notes
	adminNotes: {
		type: String
	}
}, {
	timestamps: true
});

// Indexes for better query performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ userId: 1 });
orderSchema.index({ userEmail: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderDate: -1 });
orderSchema.index({ paymentStatus: 1 });

// Pre-save middleware to generate order ID
orderSchema.pre('save', async function(next) {
	if (!this.orderId) {
		const timestamp = Date.now().toString();
		const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
		this.orderId = `ORD${timestamp}${random}`;
	}
	next();
});

// Virtual for order status display
orderSchema.virtual('statusDisplay').get(function() {
	const statusMap = {
		pending: "Pending",
		confirmed: "Confirmed",
		processing: "Processing",
		shipped: "Shipped",
		delivered: "Delivered",
		cancelled: "Cancelled",
		returned: "Returned"
	};
	return statusMap[this.status] || this.status;
});

// Method to calculate total amount
orderSchema.methods.calculateTotal = function() {
	this.totalAmount = this.subtotal - this.discount + this.shippingCost + this.tax;
	return this.totalAmount;
};

const OrderModel = mongoose.model("order", orderSchema);
module.exports = { OrderModel };
