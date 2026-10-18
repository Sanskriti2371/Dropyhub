const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MerchantOffer'
  },
  merchantName: {
    type: String,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for aggregation queries by product and merchantName
clickSchema.index({ product: 1, timestamp: -1 });
clickSchema.index({ merchantName: 1 });

module.exports = mongoose.model('Click', clickSchema);
