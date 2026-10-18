import React, { useState, useEffect } from 'react';
import api from '../api';

const VALID_CATEGORIES = [
  'Watches',
  'Smartphones',
  'Laptops',
  'Headphones',
  'Fashion',
  'Home Appliances'
];

const emptyFormData = {
  name: '',
  brand: '',
  model: '',
  variant: '',
  category: 'Watches',
  description: '',
  imageUrl: '',
  specifications: ''
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/products', { params: { limit: 100 } });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(emptyFormData);
    setShowForm(true);
    setActionSuccess('');
  };

  const handleOpenEdit = (product) => {
    setIsEditing(true);
    setEditingId(product._id);

    let specsString = '';
    if (product.specifications) {
      if (typeof product.specifications === 'string') {
        specsString = product.specifications;
      } else {
        try {
          specsString = JSON.stringify(product.specifications, null, 2);
        } catch {
          specsString = String(product.specifications);
        }
      }
    }

    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      model: product.model || '',
      variant: product.variant || '',
      category: product.category || 'Watches',
      description: product.description || '',
      imageUrl: product.images && product.images.length > 0 ? product.images.join(', ') : '',
      specifications: specsString
    });

    setShowForm(true);
    setActionSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData(emptyFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setError('');
    setActionSuccess('');

    // Parse specifications
    let parsedSpecs = {};
    if (formData.specifications.trim()) {
      try {
        parsedSpecs = JSON.parse(formData.specifications);
      } catch {
        // Parse simple key: value pairs per line if not JSON
        const lines = formData.specifications.split('\n');
        lines.forEach((line) => {
          const colonIdx = line.indexOf(':');
          if (colonIdx !== -1) {
            const k = line.slice(0, colonIdx).trim();
            const v = line.slice(colonIdx + 1).trim();
            if (k) parsedSpecs[k] = v;
          } else if (line.trim()) {
            parsedSpecs[line.trim()] = true;
          }
        });
      }
    }

    // Parse images array
    const imagesArray = formData.imageUrl
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      variant: formData.variant.trim(),
      category: formData.category,
      description: formData.description.trim(),
      images: imagesArray,
      specifications: parsedSpecs
    };

    try {
      if (isEditing) {
        await api.put(`/products/${editingId}`, payload);
        setActionSuccess('Product updated successfully.');
      } else {
        await api.post('/products', payload);
        setActionSuccess('Product created successfully.');
      }
      handleCloseForm();
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          'Failed to save product.'
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeactivate = async (id, name) => {
    if (!window.confirm(`Are you sure you want to deactivate "${name}"?`)) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      setActionSuccess(`Product "${name}" was deactivated.`);
      fetchProducts();
    } catch (err) {
      console.error('Error deactivating product:', err);
      setError(err.response?.data?.message || 'Failed to deactivate product.');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div>
          <h1>Admin - Products</h1>
          <p>Manage product catalog and specifications</p>
        </div>
        {!showForm && (
          <button onClick={handleOpenAdd} className="btn-primary">
            + Add Product
          </button>
        )}
      </div>

      {actionSuccess && <div className="alert-success">{actionSuccess}</div>}
      {error && <div className="alert-error">{error}</div>}

      {/* Form Section */}
      {showForm && (
        <div className="admin-form-card">
          <div className="admin-form-header">
            <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
            <button onClick={handleCloseForm} className="btn-text">
              ✕ Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="prod-name">Product Name *</label>
                <input
                  id="prod-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="prod-brand">Brand *</label>
                <input
                  id="prod-brand"
                  name="brand"
                  type="text"
                  required
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="prod-model">Model</label>
                <input
                  id="prod-model"
                  name="model"
                  type="text"
                  value={formData.model}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="prod-variant">Variant</label>
                <input
                  id="prod-variant"
                  name="variant"
                  type="text"
                  placeholder="e.g. 128GB Black"
                  value={formData.variant}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="prod-category">Category *</label>
                <select
                  id="prod-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {VALID_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prod-image">Image URL(s)</label>
                <input
                  id="prod-image"
                  name="imageUrl"
                  type="text"
                  placeholder="Comma-separated image URLs"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="prod-description">Description</label>
              <textarea
                id="prod-description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-specs">Specifications (JSON or Key: Value per line)</label>
              <textarea
                id="prod-specs"
                name="specifications"
                rows="4"
                placeholder={'Display: 6.7 inch\nBattery: 5000mAh\nor {"screen": "6.7 inch"}'}
                value={formData.specifications}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={formSubmitting} className="btn-primary">
                {formSubmitting
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Product'
                  : 'Create Product'}
              </button>
              <button type="button" onClick={handleCloseForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Get started by adding your first product.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Model</th>
                <th>Lowest Price</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={
                        p.images && p.images.length > 0
                          ? p.images[0]
                          : 'https://via.placeholder.com/60x45?text=No+Img'
                      }
                      alt={p.name}
                      className="table-thumbnail-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/60x45?text=No+Img';
                      }}
                    />
                  </td>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>
                  <td>{p.model || '-'}</td>
                  <td>
                    {p.lowestPrice !== null && p.lowestPrice !== undefined
                      ? `$${Number(p.lowestPrice).toFixed(2)}`
                      : '-'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions">
                      <button onClick={() => handleOpenEdit(p)} className="btn-table-edit">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeactivate(p._id, p.name)}
                        className="btn-table-danger"
                      >
                        Deactivate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
