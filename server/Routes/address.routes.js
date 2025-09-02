const { Router } = require("express");
const { AddressModel } = require("../Modal/address.module.js");
const { authentication } = require("../Middleware/authentication.js");
require("dotenv").config();

const addressController = Router();

// Apply authentication middleware to all routes
addressController.use(authentication);

// Get all addresses for a user
addressController.get("/", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		
		const addresses = await AddressModel.find({ userEmail })
			.sort({ isDefault: -1, createdAt: -1 });
		
		res.status(200).json({
			success: true,
			data: addresses,
			message: "Addresses fetched successfully"
		});
	} catch (error) {
		console.error("Error fetching addresses:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching addresses",
			error: error.message
		});
	}
});

// Get default address for a user
addressController.get("/default", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		
		const defaultAddress = await AddressModel.findOne({ 
			userEmail, 
			isDefault: true 
		});
		
		if (!defaultAddress) {
			return res.status(404).json({
				success: false,
				message: "No default address found"
			});
		}
		
		res.status(200).json({
			success: true,
			data: defaultAddress,
			message: "Default address fetched successfully"
		});
	} catch (error) {
		console.error("Error fetching default address:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching default address",
			error: error.message
		});
	}
});

// Add new address
addressController.post("/", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const userId = req.body.userId;
		const addressData = req.body;
		
		// Validate required fields
		const requiredFields = ['fullName', 'phone', 'addressLine1', 'city', 'pinCode', 'state'];
		const missingFields = requiredFields.filter(field => !addressData[field]);
		
		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: `Missing required fields: ${missingFields.join(', ')}`
			});
		}
		
		// Create new address
		const newAddress = new AddressModel({
			...addressData,
			userId,
			userEmail
		});
		
		await newAddress.save();
		
		res.status(201).json({
			success: true,
			data: newAddress,
			message: "Address added successfully"
		});
	} catch (error) {
		console.error("Error adding address:", error);
		res.status(500).json({
			success: false,
			message: "Error adding address",
			error: error.message
		});
	}
});

// Update address
addressController.put("/:id", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const { id } = req.params;
		const updateData = req.body;
		
		// Check if address exists and belongs to user
		const existingAddress = await AddressModel.findOne({ 
			_id: id, 
			userEmail 
		});
		
		if (!existingAddress) {
			return res.status(404).json({
				success: false,
				message: "Address not found"
			});
		}
		
		// Update address
		const updatedAddress = await AddressModel.findByIdAndUpdate(
			id,
			updateData,
			{ new: true, runValidators: true }
		);
		
		res.status(200).json({
			success: true,
			data: updatedAddress,
			message: "Address updated successfully"
		});
	} catch (error) {
		console.error("Error updating address:", error);
		res.status(500).json({
			success: false,
			message: "Error updating address",
			error: error.message
		});
	}
});

// Set default address
addressController.put("/:id/default", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const { id } = req.params;
		
		// Check if address exists and belongs to user
		const address = await AddressModel.findOne({ 
			_id: id, 
			userEmail 
		});
		
		if (!address) {
			return res.status(404).json({
				success: false,
				message: "Address not found"
			});
		}
		
		// Set as default (pre-save middleware will handle removing default from others)
		address.isDefault = true;
		await address.save();
		
		res.status(200).json({
			success: true,
			data: address,
			message: "Default address updated successfully"
		});
	} catch (error) {
		console.error("Error setting default address:", error);
		res.status(500).json({
			success: false,
			message: "Error setting default address",
			error: error.message
		});
	}
});

// Delete address
addressController.delete("/:id", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const { id } = req.params;
		
		// Check if address exists and belongs to user
		const address = await AddressModel.findOne({ 
			_id: id, 
			userEmail 
		});
		
		if (!address) {
			return res.status(404).json({
				success: false,
				message: "Address not found"
			});
		}
		
		// Delete address
		await AddressModel.findByIdAndDelete(id);
		
		res.status(200).json({
			success: true,
			message: "Address deleted successfully"
		});
	} catch (error) {
		console.error("Error deleting address:", error);
		res.status(500).json({
			success: false,
			message: "Error deleting address",
			error: error.message
		});
	}
});

// Get address by ID
addressController.get("/:id", async (req, res) => {
	try {
		const userEmail = req.body.userEmail;
		const { id } = req.params;
		
		const address = await AddressModel.findOne({ 
			_id: id, 
			userEmail 
		});
		
		if (!address) {
			return res.status(404).json({
				success: false,
				message: "Address not found"
			});
		}
		
		res.status(200).json({
			success: true,
			data: address,
			message: "Address fetched successfully"
		});
	} catch (error) {
		console.error("Error fetching address:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching address",
			error: error.message
		});
	}
});

module.exports = { addressController };
