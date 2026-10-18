const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  variant: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Watches', 'Smartphones', 'Laptops', 'Headphones', 'Fashion', 'Home Appliances']
  },
  description: {
    type: String,
    trim: true
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  images: {
    type: [String],
    default: []
  },
  canonicalId: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Helper function to build canonical slug from text parts
function generateCanonicalSlug(brand, model, variant, name) {
  const parts = [brand, model, variant].filter(Boolean);
  const source = parts.length > 0 ? parts.join(' ') : (name || '');
  return source
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Pre-save hook to generate canonicalId from brand + model + variant if not already set
productSchema.pre('save', function (next) {
  if (!this.canonicalId) {
    this.canonicalId = generateCanonicalSlug(this.brand, this.model, this.variant, this.name);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
