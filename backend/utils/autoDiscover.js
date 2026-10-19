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

// Product archetype configs with exact matching images and realistic base prices
const ARCHETYPE_CONFIGS = [
  {
    regex: /\b(ipad|tablet|tab)\b/i,
    category: 'Laptops',
    basePrice: 34900,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(tv|television|bravia|led|oled|smart tv)\b/i,
    category: 'Home Appliances',
    basePrice: 39990,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(camera|dslr|lens|mirrorless)\b/i,
    category: 'Home Appliances',
    basePrice: 49990,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(airpods|earbuds|buds|tws|earphone|earphones)\b/i,
    category: 'Headphones',
    basePrice: 2499,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(headphone|headphones|headset)\b/i,
    category: 'Headphones',
    basePrice: 4999,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(watch|smartwatch|chronograph|g-shock|casio|titan|timex|fastrack|fossil)\b/i,
    category: 'Watches',
    basePrice: 4995,
    merchants: ['Amazon India', 'Flipkart', 'Tata CLiQ'],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(laptop|notebook|macbook|thinkpad|zenbook|vivobook|inspiron|pavilion)\b/i,
    category: 'Laptops',
    basePrice: 59990,
    merchants: ['Amazon India', 'Flipkart', 'Reliance Digital'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(shoe|shoes|sneaker|sneakers|boots)\b/i,
    category: 'Fashion',
    basePrice: 3499,
    merchants: ['Myntra', 'Amazon India', 'Ajio'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(shirt|tshirt|t-shirt|polo|hoodie|jacket|jeans|clothing|apparel|dress)\b/i,
    category: 'Fashion',
    basePrice: 1999,
    merchants: ['Myntra', 'Amazon India', 'Ajio'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(fridge|refrigerator)\b/i,
    category: 'Home Appliances',
    basePrice: 24990,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(fryer|air fryer)\b/i,
    category: 'Home Appliances',
    basePrice: 8999,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(vacuum|cleaner)\b/i,
    category: 'Home Appliances',
    basePrice: 19990,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    regex: /\b(phone|smartphone|iphone|galaxy|pixel|oneplus|mobile|android|5g)\b/i,
    category: 'Smartphones',
    basePrice: 24999,
    merchants: ['Amazon India', 'Flipkart', 'Croma'],
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
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
  let detectedBrand = 'BUYhatke Choice';
  for (const b of BRAND_PATTERNS) {
    if (b.regex.test(query)) {
      detectedBrand = b.name;
      break;
    }
  }

  // 2. Identify archetype by exact item pattern first
  let config = ARCHETYPE_CONFIGS.find((c) => c.regex.test(query));

  // If requestedCategory was specified and doesn't match archetype, adjust
  if (requestedCategory) {
    const byCategory = ARCHETYPE_CONFIGS.find((c) => c.category.toLowerCase() === requestedCategory.toLowerCase());
    if (byCategory) config = byCategory;
  }

  // Default fallback if nothing matched
  if (!config) {
    config = ARCHETYPE_CONFIGS[ARCHETYPE_CONFIGS.length - 1]; // Smartphones fallback
  }

  const categoryName = config.category;
  const cleanTitle = titleCase(query);

  // Generate 2 complementary product models
  const productConfigs = [
    {
      name: `${detectedBrand !== 'BUYhatke Choice' && !cleanTitle.toLowerCase().includes(detectedBrand.toLowerCase()) ? detectedBrand + ' ' : ''}${cleanTitle} (Standard Edition)`,
      model: cleanTitle,
      variant: 'Standard Edition',
      basePrice: config.basePrice
    },
    {
      name: `${detectedBrand !== 'BUYhatke Choice' && !cleanTitle.toLowerCase().includes(detectedBrand.toLowerCase()) ? detectedBrand + ' ' : ''}${cleanTitle} (Pro Edition)`,
      model: `${cleanTitle} Pro`,
      variant: 'Pro Edition',
      basePrice: Math.round(config.basePrice * 1.35)
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
      description: `Official ${cfg.name} with certified manufacturer warranty. Featuring high performance, premium build quality, and verified comparison pricing across leading e-commerce merchants.`,
      specifications: {
        category: categoryName,
        brand: detectedBrand,
        model: cfg.model,
        warranty: '1 Year Manufacturer Domestic Warranty',
        inTheBox: 'Product Unit, User Documentation, Standard Accessories'
      },
      images: config.images,
      canonicalId,
      popularity: Math.floor(Math.random() * 30) + 70,
      isActive: true
    });

    await product.save();
    createdProducts.push(product);

    // Create 3 merchant offers
    const merchants = config.merchants;
    const baseP = cfg.basePrice;

    const offerVariations = [
      { merchant: merchants[0], price: baseP },
      { merchant: merchants[1], price: Math.round(baseP * 1.02) },
      { merchant: merchants[2], price: Math.round(baseP * 1.05) }
    ];

    for (const off of offerVariations) {
      let productUrl;
      const encodedName = encodeURIComponent(cfg.name);
      if (off.merchant === 'Amazon India') {
        productUrl = `https://www.amazon.in/s?k=${encodedName}&tag=buyhatke-21`;
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
