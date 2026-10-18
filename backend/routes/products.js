const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const MerchantOffer = require('../models/MerchantOffer');
const { authenticate, isAdmin } = require('../middleware/auth');

const VALID_CATEGORIES = ['Watches', 'Smartphones', 'Laptops', 'Headphones', 'Fashion', 'Home Appliances'];

// Helper to generate canonicalId
const generateSlug = (brand, model, variant, name) => {
  const parts = [brand, model, variant].filter(Boolean);
  const source = parts.length > 0 ? parts.join(' ') : (name || '');
  return source
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// GET /api/products
// Query params: search, category, brand, minPrice, maxPrice, sort, page, limit
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 12);
    const skip = (pageNum - 1) * limitNum;

    const matchQuery = { isActive: true };

    if (category) {
      matchQuery.category = category;
    }

    if (brand) {
      matchQuery.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
    }

    if (search && search.trim()) {
      const term = search.trim();
      matchQuery.$or = [
        { name: { $regex: term, $options: 'i' } },
        { brand: { $regex: term, $options: 'i' } },
        { model: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } }
      ];
    }

    // Build aggregation pipeline
    const pipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: 'merchantoffers',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$product', '$$productId'] },
                    { $eq: ['$availability', true] }
                  ]
                }
              }
            },
            { $sort: { price: 1 } }
          ],
          as: 'activeOffers'
        }
      },
      {
        $addFields: {
          lowestPrice: {
            $cond: {
              if: { $gt: [{ $size: '$activeOffers' }, 0] },
              then: { $min: '$activeOffers.price' },
              else: null
            }
          },
          offersCount: { $size: '$activeOffers' }
        }
      }
    ];

    // Optional price filtering on lowestPrice
    const priceFilterMatch = {};
    if (minPrice !== undefined && minPrice !== '') {
      priceFilterMatch.$gte = Number(minPrice);
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      priceFilterMatch.$lte = Number(maxPrice);
    }

    if (Object.keys(priceFilterMatch).length > 0) {
      pipeline.push({
        $match: {
          lowestPrice: priceFilterMatch
        }
      });
    }

    // Sort condition
    let sortStage = { createdAt: -1 };
    if (sort === 'price_asc') {
      sortStage = { lowestPrice: 1, createdAt: -1 };
    } else if (sort === 'price_desc') {
      sortStage = { lowestPrice: -1, createdAt: -1 };
    } else if (sort === 'popularity') {
      sortStage = { popularity: -1, createdAt: -1 };
    } else if (sort === 'newest') {
      sortStage = { createdAt: -1 };
    }

    pipeline.push({
      $facet: {
        totalData: [{ $count: 'count' }],
        products: [
          { $sort: sortStage },
          { $skip: skip },
          { $limit: limitNum },
          {
            $project: {
              activeOffers: 0
            }
          }
        ]
      }
    });

    const results = await Product.aggregate(pipeline);
    const total = results[0]?.totalData[0]?.count || 0;
    const products = results[0]?.products || [];

    res.json({
      products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error retrieving products' });
  }
});

// GET /api/products/:id
// Returns product with populated offers and lowestPrice
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    if (!product) {
      product = await Product.findOne({ canonicalId: id });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const offers = await MerchantOffer.find({ product: product._id, availability: true }).sort({ price: 1 });
    const lowestPrice = offers.length > 0 ? offers[0].price : null;

    res.json({
      ...product.toObject(),
      offers,
      lowestPrice
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error retrieving product' });
  }
});

// POST /api/products
// Admin only: create a new product
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('brand').trim().notEmpty().withMessage('Brand is required'),
    body('category').isIn(VALID_CATEGORIES).withMessage(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`)
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: errors.array()[0].msg });
      }

      const {
        name,
        brand,
        model,
        variant,
        category,
        description,
        specifications,
        images,
        canonicalId
      } = req.body;

      let generatedCanonicalId = canonicalId
        ? canonicalId.toLowerCase().trim()
        : generateSlug(brand, model, variant, name);

      // Verify canonicalId uniqueness
      const existing = await Product.findOne({ canonicalId: generatedCanonicalId });
      if (existing) {
        generatedCanonicalId = `${generatedCanonicalId}-${Date.now()}`;
      }

      const product = new Product({
        name,
        brand,
        model,
        variant,
        category,
        description,
        specifications: specifications || {},
        images: images || [],
        canonicalId: generatedCanonicalId
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Server error creating product' });
    }
  }
);

// PUT /api/products/:id
// Admin only: update a product
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updates = { ...req.body };

    // If category is provided, validate it
    if (updates.category && !VALID_CATEGORIES.includes(updates.category)) {
      return res.status(400).json({
        message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error updating product' });
  }
});

// DELETE /api/products/:id
// Admin only: soft delete product by setting isActive to false
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deactivated successfully', product });
  } catch (error) {
    console.error('Error deactivating product:', error);
    res.status(500).json({ message: 'Server error deactivating product' });
  }
});

module.exports = router;
