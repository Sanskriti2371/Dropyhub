const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const MerchantOffer = require('../models/MerchantOffer');
const Click = require('../models/Click');
const { authenticate, isAdmin } = require('../middleware/auth');

// GET /api/analytics
// Admin only: return high-level platform statistics and top clicked products/merchants
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const [totalProducts, totalOffers, totalClicks, mostClickedProducts, mostClickedMerchants] =
      await Promise.all([
        Product.countDocuments({ isActive: true }),
        MerchantOffer.countDocuments({ availability: true }),
        Click.countDocuments(),
        Click.aggregate([
          { $match: { product: { $ne: null } } },
          { $group: { _id: '$product', clicks: { $sum: 1 } } },
          { $sort: { clicks: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: 'products',
              localField: '_id',
              foreignField: '_id',
              as: 'product'
            }
          },
          { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
          {
            $project: {
              productId: '$_id',
              clicks: 1,
              name: '$product.name',
              brand: '$product.brand',
              category: '$product.category',
              images: '$product.images'
            }
          }
        ]),
        Click.aggregate([
          { $match: { merchantName: { $exists: true, $ne: '' } } },
          { $group: { _id: '$merchantName', clicks: { $sum: 1 } } },
          { $sort: { clicks: -1 } },
          { $limit: 5 },
          {
            $project: {
              _id: 0,
              merchantName: '$_id',
              clicks: 1
            }
          }
        ])
      ]);

    res.json({
      totalProducts,
      totalOffers,
      totalClicks,
      mostClickedProducts,
      mostClickedMerchants
    });
  } catch (error) {
    console.error('Error calculating analytics:', error);
    res.status(500).json({ message: 'Server error retrieving analytics data' });
  }
});

module.exports = router;
