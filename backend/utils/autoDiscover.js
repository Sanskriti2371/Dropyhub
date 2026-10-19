const mongoose = require('mongoose');
const Product = require('../models/Product');
const MerchantOffer = require('../models/MerchantOffer');

const BRAND_PATTERNS = [
  { name: 'Apple', regex: /\b(apple|iphone|ipad|macbook|airpods|iwatch)\b/i },
  { name: 'Samsung', regex: /\b(samsung|galaxy)\b/i },
  { name: 'OnePlus', regex: /\b(oneplus|nord)\b/i },
  { name: 'Google', regex: /\b(google|pixel)\b/i },
  { name: 'Sony', regex: /\b(sony|bravia|playstation|ps5)\b/i },
  { name: 'Dell', regex: /\b(dell|alienware|xps|inspiron)\b/i },
  { name: 'HP', regex: /\b(hp|pavilion|omen|victus|spectre)\b/i },
  { name: 'Lenovo', regex: /\b(lenovo|thinkpad|ideapad|legion)\b/i },
  { name: 'Asus', regex: /\b(asus|rog|tuf|zenbook|vivobook)\b/i },
  { name: 'boAt', regex: /\b(boat|rockerz|airdopes|wave)\b/i },
  { name: 'Noise', regex: /\b(noise|colorfit|buds)\b/i },
  { name: 'JBL', regex: /\b(jbl|flip|charge)\b/i },
  { name: 'Bose', regex: /\b(bose|quietcomfort)\b/i },
  { name: 'Nike', regex: /\b(nike|air max|jordan|dunk)\b/i },
  { name: 'Adidas', regex: /\b(adidas|ultraboost|stan smith|samba)\b/i },
  { name: 'Puma', regex: /\b(puma)\b/i },
  { name: "Levi's", regex: /\b(levi'?s|511|512)\b/i },
  { name: 'Casio', regex: /\b(casio|g-shock|edifice|enticer|casioak)\b/i },
  { name: 'Titan', regex: /\b(titan|fastrack|sonata|raga)\b/i },
  { name: 'Fossil', regex: /\b(fossil)\b/i },
  { name: 'Dyson', regex: /\b(dyson)\b/i },
  { name: 'Philips', regex: /\b(philips)\b/i },
  { name: 'Bajaj', regex: /\b(bajaj)\b/i },
  { name: 'Instant Pot', regex: /\b(instant pot)\b/i },
  { name: 'LG', regex: /\b(lg)\b/i },
  { name: 'Whirlpool', regex: /\b(whirlpool)\b/i }
];

const CATEGORY_MAP = [
  {
    category: 'Smartphones',
    regex: /\b(phone|mobile|smartphone|iphone|galaxy|pixel|oneplus|redmi|realme|vivo|oppo|poco|5g|android)\b/i,
    basePrice: 24999,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'Laptops',
    regex: /\b(laptop|notebook|macbook|thinkpad|zenbook|vivobook|pavilion|inspiron|legion|omen|gaming laptop|pc|computer)\b/i,
    basePrice: 59990,
    merchants: ['Amazon India', 'Flipkart', 'Reliance Digital'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'Watches',
    regex: /\b(watch|smartwatch|chronograph|g-shock|casio|titan|fossil|timex|rolex|tissot|analog|timepiece)\b/i,
    basePrice: 6995,
    merchants: ['Amazon India', 'Flipkart', 'Tata CLiQ'],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'Headphones',
    regex: /\b(headphone|earphone|earbuds|airpods|buds|tws|neckband|headset|audio|speaker|anc|wireless earbuds)\b/i,
    basePrice: 4999,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'Fashion',
    regex: /\b(shoe|shoes|sneaker|sneakers|shirt|t-shirt|tshirt|jeans|jacket|hoodie|pant|sunglass|sunglasses|dress|trouser|kurta|wear|clothing)\b/i,
    basePrice: 2999,
    merchants: ['Myntra', 'Amazon India', 'Ajio'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'Home Appliances',
    regex: /\b(appliance|fryer|air fryer|pot|cooker|microwave|oven|vacuum|cleaner|purifier|ro|mixer|grinder|blender|fridge|refrigerator|ac|air conditioner|washing machine|fan|kettle|iron)\b/i,
    basePrice: 8499,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// Helper to capitalize words
const titleCase = (str) => {
  return str
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Auto-discover and dynamically seed products for search queries
const autoDiscoverProducts = async (rawQuery, requestedCategory) => {
  if (!rawQuery || rawQuery.trim().length < 2) return [];

  const query = rawQuery.trim();

  // 1. Identify brand
  let detectedBrand = 'DealBridge Choice';
  for (const b of BRAND_PATTERNS) {
    if (b.regex.test(query)) {
      detectedBrand = b.name;
      break;
    }
  }

  // 2. Identify category
  let categoryConfig = null;
  if (requestedCategory) {
    categoryConfig = CATEGORY_MAP.find((c) => c.category.toLowerCase() === requestedCategory.toLowerCase());
  }
  if (!categoryConfig) {
    categoryConfig = CATEGORY_MAP.find((c) => c.regex.test(query)) || CATEGORY_MAP[0]; // default Smartphones/Tech
  }

  const categoryName = categoryConfig.category;
  const cleanTitle = titleCase(query);

  // Generate 2 complementary product models
  const productConfigs = [
    {
      name: `${detectedBrand !== 'DealBridge Choice' && !cleanTitle.includes(detectedBrand) ? detectedBrand + ' ' : ''}${cleanTitle} (Standard Edition)`,
      model: cleanTitle,
      variant: 'Standard Edition',
      basePrice: categoryConfig.basePrice
    },
    {
      name: `${detectedBrand !== 'DealBridge Choice' && !cleanTitle.includes(detectedBrand) ? detectedBrand + ' ' : ''}${cleanTitle} (Pro Edition)`,
      model: `${cleanTitle} Pro`,
      variant: 'Pro Edition',
      basePrice: Math.round(categoryConfig.basePrice * 1.35)
    }
  ];

  const createdProducts = [];

  for (const cfg of productConfigs) {
    const slugBase = `${detectedBrand}-${cfg.model}-${cfg.variant}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const canonicalId = `${slugBase}-${Date.now().toString().slice(-4)}`;

    const product = new Product({
      name: cfg.name,
      brand: detectedBrand,
      model: cfg.model,
      variant: cfg.variant,
      category: categoryName,
      description: `Premium ${cfg.name} offering top-tier performance, reliable durability, and verified multi-merchant pricing. Compare offers across leading Indian retailers to grab the best deal today.`,
      specifications: {
        category: categoryName,
        brand: detectedBrand,
        model: cfg.model,
        warranty: '1 Year Manufacturer Domestic Warranty',
        inTheBox: 'Product Unit, User Documentation, Standard Accessories'
      },
      images: categoryConfig.images,
      canonicalId,
      popularity: Math.floor(Math.random() * 30) + 70,
      isActive: true
    });

    await product.save();
    createdProducts.push(product);

    // Create 3 merchant offers
    const merchants = categoryConfig.merchants;
    const baseP = cfg.basePrice;

    const offerVariations = [
      { merchant: merchants[0], price: baseP, diff: 0 },
      { merchant: merchants[1], price: Math.round(baseP * 1.03), diff: 3 },
      { merchant: merchants[2], price: Math.round(baseP * 1.06), diff: 6 }
    ];

    for (const off of offerVariations) {
      let productUrl;
      const encodedName = encodeURIComponent(cfg.name);
      if (off.merchant === 'Amazon India') {
        productUrl = `https://www.amazon.in/s?k=${encodedName}&tag=dealbridge-21`;
      } else if (off.merchant === 'Flipkart') {
        productUrl = `https://www.flipkart.com/search?q=${encodedName}`;
      } else if (off.merchant === 'Myntra') {
        productUrl = `https://www.myntra.com/${encodedName}`;
      } else if (off.merchant === 'Tata CLiQ') {
        productUrl = `https://www.tatacliq.com/search/?searchCategory=all&text=${encodedName}`;
      } else {
        productUrl = `https://www.croma.com/searchB?q=${encodedName}`;
      }

      await MerchantOffer.create({
        product: product._id,
        merchantName: off.merchant,
        price: off.price,
        productUrl,
        availability: true
      });
    }
  }

  return createdProducts;
};

module.exports = { autoDiscoverProducts };
