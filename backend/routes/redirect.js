const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MerchantOffer = require('../models/MerchantOffer');
const Product = require('../models/Product');
const Click = require('../models/Click');

// GET /api/redirect/:offerId
// Log click, increment product popularity, and return destination affiliate URL
// Note: Frontend performs the actual user-facing redirection
router.get('/:offerId', async (req, res) => {
  try {
    const { offerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({ message: 'Invalid offer ID' });
    }

    const offer = await MerchantOffer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    if (!offer.productUrl) {
      return res.status(400).json({ message: 'Offer has no valid destination URL' });
    }

    // Record the click event for affiliate analytics
    await Click.create({
      product: offer.product,
      offer: offer._id,
      merchantName: offer.merchantName,
      timestamp: new Date()
    });

    // Increment popularity score on the associated product
    if (offer.product) {
      await Product.findByIdAndUpdate(offer.product, {
        $inc: { popularity: 1 }
      });
    }

    // Do NOT perform res.redirect - respond with JSON as specified
    res.json({
      redirectUrl: offer.productUrl,
      merchantName: offer.merchantName,
      price: offer.price,
      offerId: offer._id
    });
  } catch (error) {
    console.error('Error handling redirect tracking:', error);
    res.status(500).json({ message: 'Server error processing affiliate redirect' });
  }
});

module.exports = router;
