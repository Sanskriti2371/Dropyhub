const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const MerchantOffer = require('../models/MerchantOffer');
const { authenticate } = require('../middleware/auth');

// All wishlist routes require authentication
router.use(authenticate);

// GET /api/wishlist
// Get current user's wishlist with populated product details and current lowest price
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      match: { isActive: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const wishlistProducts = user.wishlist || [];
    const productIds = wishlistProducts.map((p) => p._id);

    // Fetch lowest active prices for items in wishlist
    const offers = await MerchantOffer.find({
      product: { $in: productIds },
      availability: true
    }).sort({ price: 1 });

    const lowestPriceMap = {};
    for (const offer of offers) {
      const pIdStr = offer.product.toString();
      if (!lowestPriceMap[pIdStr]) {
        lowestPriceMap[pIdStr] = offer.price;
      }
    }

    const items = wishlistProducts.map((prod) => ({
      ...prod.toObject(),
      lowestPrice: lowestPriceMap[prod._id.toString()] || null
    }));

    res.json({ wishlist: items });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error retrieving wishlist' });
  }
});

// POST /api/wishlist/add
// Add a product to the user's wishlist
router.post('/add', async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Valid productId is required' });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found or inactive' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');

    res.json({
      message: 'Product added to wishlist',
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error adding product to wishlist' });
  }
});

// POST /api/wishlist/remove
// Remove a product from the user's wishlist
router.post('/remove', async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Valid productId is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');

    res.json({
      message: 'Product removed from wishlist',
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error removing product from wishlist' });
  }
});

module.exports = router;
