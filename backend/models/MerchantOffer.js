const mongoose = require('mongoose');

const merchantOfferSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required']
  },
  merchantName: {
    type: String,
    required: [true, 'Merchant name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  productUrl: {
    type: String,
    required: [true, 'Product URL is required'],
    trim: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Index to quickly fetch offers for a product sorted by price
merchantOfferSchema.index({ product: 1, price: 1 });

module.exports = mongoose.model('MerchantOffer', merchantOfferSchema);
