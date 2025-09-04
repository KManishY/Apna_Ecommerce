const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthModel",
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductModel",
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can't add the same product twice
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Virtual for formatted date
wishlistSchema.virtual('formattedDate').get(function() {
  return this.addedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
});

// Ensure virtual fields are serialized
wishlistSchema.set('toJSON', { virtuals: true });

const WishlistModel = mongoose.model("WishlistModel", wishlistSchema);

module.exports = { WishlistModel };
