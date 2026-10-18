const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const MerchantOffer = require('../models/MerchantOffer');
const Product = require('../models/Product');
const { authenticate, isAdmin } = require('../middleware/auth');

// GET /api/offers/product/:productId
// Get all offers for a specific product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const offers = await MerchantOffer.find({ product: productId }).sort({ price: 1 });
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers for product:', error);
    res.status(500).json({ message: 'Server error retrieving offers' });
  }
});

// POST /api/offers
// Admin only: create a new merchant offer
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    body('product').isMongoId().withMessage('Valid product ID is required'),
    body('merchantName').trim().notEmpty().withMessage('Merchant name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('productUrl').isURL().withMessage('Valid product URL is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: errors.array()[0].msg });
      }

      const { product, merchantName, price, productUrl, availability } = req.body;

      const productExists = await Product.findById(product);
      if (!productExists) {
        return res.status(404).json({ message: 'Referenced product not found' });
      }

      const offer = new MerchantOffer({
        product,
        merchantName,
        price,
        productUrl,
        availability: availability !== undefined ? availability : true,
        lastUpdated: new Date()
      });

      await offer.save();
      res.status(201).json(offer);
    } catch (error) {
      console.error('Error creating offer:', error);
      res.status(500).json({ message: 'Server error creating merchant offer' });
    }
  }
);

// PUT /api/offers/:id
// Admin only: update an offer
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid offer ID' });
    }

    const updates = { ...req.body, lastUpdated: new Date() };

    const offer = await MerchantOffer.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.json(offer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ message: 'Server error updating offer' });
  }
});

// DELETE /api/offers/:id
// Admin only: delete an offer
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid offer ID' });
    }

    const offer = await MerchantOffer.findByIdAndDelete(id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.json({ message: 'Offer deleted successfully', offerId: id });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ message: 'Server error deleting offer' });
  }
});

module.exports = router;
