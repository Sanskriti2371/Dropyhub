import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingId, setRemovingId] = useState(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/wishlist');
      setItems(res.data.wishlist || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError('Failed to load your wishlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    try {
      await api.post('/wishlist/remove', { productId });
      setItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      alert('Could not remove item from wishlist.');
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Wishlist</h1>
        <p>Products you have saved to track prices</p>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">Loading wishlist...</div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h3>Your wishlist is empty</h3>
          <p>Explore our catalog and click "Add to Wishlist" on products you want to follow.</p>
          <Link to="/" className="btn-filter-apply" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Lowest Price</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : 'https://via.placeholder.com/80x60?text=No+Img'
                      }
                      alt={item.name}
                      className="table-thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/80x60?text=No+Img';
                      }}
                    />
                  </td>
                  <td>
                    <strong>{item.name}</strong>
                    {item.model && <div className="text-muted"><small>Model: {item.model}</small></div>}
                  </td>
                  <td>{item.brand}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.lowestPrice !== null && item.lowestPrice !== undefined ? (
                      <span className="price-tag-table">${Number(item.lowestPrice).toFixed(2)}</span>
                    ) : (
                      <span className="text-muted">No offers</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions">
                      <Link to={`/product/${item._id}`} className="btn-table-view">
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemove(item._id)}
                        disabled={removingId === item._id}
                        className="btn-table-danger"
                      >
                        {removingId === item._id ? 'Removing...' : 'Remove'}
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

export default Wishlist;
