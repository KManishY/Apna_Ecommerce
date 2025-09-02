const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'userauth', // Reference to user collection
		required: true
	},
	userEmail: {
		type: String,
		required: true
	},
	addressType: {
		type: String,
		enum: ["home", "office", "other"],
		default: "home"
	},
	isDefault: {
		type: Boolean,
		default: false
	},
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	phone: {
		type: String,
		required: true,
		trim: true
	},
	addressLine1: {
		type: String,
		required: true,
		trim: true
	},
	addressLine2: {
		type: String,
		trim: true
	},
	landmark: {
		type: String,
		trim: true
	},
	city: {
		type: String,
		required: true,
		trim: true
	},
	pinCode: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function(v) {
				return /^[1-9][0-9]{5}$/.test(v);
			},
			message: 'Pin code must be 6 digits and cannot start with 0'
		}
	},
	state: {
		type: String,
		required: true,
		trim: true
	},
	country: {
		type: String,
		default: "India",
		trim: true
	}
}, {
	timestamps: true // Adds createdAt and updatedAt
});

// Index for better query performance
addressSchema.index({ userId: 1 });
addressSchema.index({ userEmail: 1 });
addressSchema.index({ isDefault: 1 });

// Pre-save middleware to ensure only one default address per user
addressSchema.pre('save', async function(next) {
	if (this.isDefault) {
		// Remove default flag from other addresses of the same user
		await this.constructor.updateMany(
			{ 
				userId: this.userId, 
				_id: { $ne: this._id } 
			},
			{ $set: { isDefault: false } }
		);
	}
	next();
});

const AddressModel = mongoose.model("address", addressSchema);
module.exports = { AddressModel };