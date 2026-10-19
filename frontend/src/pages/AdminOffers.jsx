import React, { useState, useEffect } from 'react';
import api from '../api';

const emptyOfferForm = {
  merchantName: '',
  price: '',
  productUrl: '',
  availability: true
};

const AdminOffers = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [offers, setOffers] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [formData, setFormData] = useState(emptyOfferForm);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Load products list on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setError('');
      try {
        const res = await api.get('/products', { params: { limit: 100 } });
        const prods = res.data.products || [];
        setProducts(prods);
        if (prods.length > 0) {
          setSelectedProductId(prods[0]._id);
        }
      } catch (err) {
        console.error('Error fetching products list:', err);
        setError('Failed to load products.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch offers whenever selectedProductId changes
  const fetchOffers = async (prodId = selectedProductId) => {
    if (!prodId) {
      setOffers([]);
      return;
    }
    setLoadingOffers(true);
    setError('');
    try {
      const res = await api.get(`/offers/product/${prodId}`);
      setOffers(res.data || []);
    } catch (err) {
      console.error('Error fetching offers for product:', err);
      setError('Failed to load merchant offers for the selected product.');
    } finally {
      setLoadingOffers(false);
    }
  };

  useEffect(() => {
    if (selectedProductId) {
      fetchOffers(selectedProductId);
      handleCloseForm();
    }
  }, [selectedProductId]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingOfferId(null);
    setFormData(emptyOfferForm);
    setShowForm(true);
    setSuccess('');
    setError('');
  };

  const handleOpenEdit = (offer) => {
    setIsEditing(true);
    setEditingOfferId(offer._id);
    setFormData({
      merchantName: offer.merchantName || '',
      price: offer.price !== undefined ? String(offer.price) : '',
      productUrl: offer.productUrl || '',
      availability: offer.availability !== undefined ? offer.availability : true
    });
    setShowForm(true);
    setSuccess('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingOfferId(null);
    setFormData(emptyOfferForm);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId) {
      setError('Please select a product first.');
      return;
    }

    setFormSubmitting(true);
    setError('');
    setSuccess('');

    const payload = {
      product: selectedProductId,
      merchantName: formData.merchantName.trim(),
      price: parseFloat(formData.price),
      productUrl: formData.productUrl.trim(),
      availability: formData.availability
    };

    try {
      if (isEditing) {
        await api.put(`/offers/${editingOfferId}`, payload);
        setSuccess('Offer updated successfully.');
      } else {
        await api.post('/offers', payload);
        setSuccess('Offer added successfully.');
      }
      handleCloseForm();
      fetchOffers(selectedProductId);
    } catch (err) {
      console.error('Error saving offer:', err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          'Failed to save merchant offer.'
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (offerId, merchantName) => {
    if (!window.confirm(`Delete offer from "${merchantName}"?`)) {
      return;
    }

    try {
      await api.delete(`/offers/${offerId}`);
      setSuccess(`Offer from "${merchantName}" was deleted.`);
      fetchOffers(selectedProductId);
    } catch (err) {
      console.error('Error deleting offer:', err);
      setError(err.response?.data?.message || 'Failed to delete offer.');
    }
  };

  const currentProduct = products.find((p) => p._id === selectedProductId);

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div>
          <h1>Admin - Merchant Offers</h1>
          <p>Manage merchant pricing and store affiliate links</p>
        </div>
        {selectedProductId && !showForm && (
          <button onClick={handleOpenAdd} className="btn-primary">
            + Add Offer
          </button>
        )}
      </div>

      {success && <div className="alert-success">{success}</div>}
      {error && <div className="alert-error">{error}</div>}

      {/* Product Selector */}
      <div className="selector-panel">
        <label htmlFor="product-select">
          <strong>Select Product:</strong>
        </label>
        {loadingProducts ? (
          <span>Loading products...</span>
        ) : (
          <select
            id="product-select"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="product-select-dropdown"
          >
            {products.length === 0 && <option value="">No products available</option>}
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.brand} - {p.category})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="admin-form-card">
          <div className="admin-form-header">
            <h3>
              {isEditing ? 'Edit Offer' : 'Add New Offer'}{' '}
              {currentProduct && <small className="text-muted">for {currentProduct.name}</small>}
            </h3>
            <button onClick={handleCloseForm} className="btn-text">
              ✕ Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="offer-merchant">Merchant Name *</label>
                <input
                  id="offer-merchant"
                  name="merchantName"
                  type="text"
                  placeholder="e.g. Amazon, BestBuy, Walmart"
                  required
                  value={formData.merchantName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="offer-price">Price (₹) *</label>
                <input
                  id="offer-price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 299.99"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="offer-url">Product Affiliate URL *</label>
                <input
                  id="offer-url"
                  name="productUrl"
                  type="url"
                  placeholder="https://example.com/product/123"
                  required
                  value={formData.productUrl}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleInputChange}
                  />{' '}
                  In Stock / Available
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={formSubmitting} className="btn-primary">
                {formSubmitting
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Offer'
                  : 'Add Offer'}
              </button>
              <button type="button" onClick={handleCloseForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Offers Table */}
      {!selectedProductId ? (
        <div className="empty-state">
          <p>Please select a product from above to view and manage its offers.</p>
        </div>
      ) : loadingOffers ? (
        <div className="loading-state">Loading offers...</div>
      ) : offers.length === 0 ? (
        <div className="empty-state">
          <h3>No offers for this product yet</h3>
          <p>Click "+ Add Offer" above to add the first merchant deal.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Product URL</th>
                <th>Last Updated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id}>
                  <td>
                    <strong>{offer.merchantName}</strong>
                  </td>
                  <td>
                    <span className="price-tag-table">₹{Number(offer.price).toLocaleString('en-IN')}</span>
                  </td>
                  <td>
                    {offer.availability ? (
                      <span className="badge-in-stock">Available</span>
                    ) : (
                      <span className="badge-out-of-stock">Unavailable</span>
                    )}
                  </td>
                  <td>
                    <a
                      href={offer.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-external-link"
                    >
                      Open Link ↗
                    </a>
                  </td>
                  <td>
                    <small className="text-muted">
                      {offer.lastUpdated
                        ? new Date(offer.lastUpdated).toLocaleDateString()
                        : '-'}
                    </small>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions">
                      <button onClick={() => handleOpenEdit(offer)} className="btn-table-edit">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(offer._id, offer.merchantName)}
                        className="btn-table-danger"
                      >
                        Delete
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

export default AdminOffers;
