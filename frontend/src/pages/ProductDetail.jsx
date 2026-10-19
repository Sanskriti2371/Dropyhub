import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [redirectingOfferId, setRedirectingOfferId] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch product and wishlist status
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(res.data.images[0]);
        }

        // If authenticated, check wishlist
        if (isAuthenticated) {
          try {
            const wishRes = await api.get('/wishlist');
            const items = wishRes.data?.wishlist || [];
            const isMatch = items.some(
              (item) => item._id === res.data._id || item.canonicalId === res.data.canonicalId
            );
            setInWishlist(isMatch);
          } catch (wishErr) {
            console.error('Error fetching wishlist status:', wishErr);
          }
        }
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, isAuthenticated]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!product) return;

    setWishlistLoading(true);
    try {
      if (inWishlist) {
        await api.post('/wishlist/remove', { productId: product._id });
        setInWishlist(false);
      } else {
        await api.post('/wishlist/add', { productId: product._id });
        setInWishlist(true);
      }
    } catch (err) {
      console.error('Error updating wishlist:', err);
      alert('Could not update wishlist. Please try again.');
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleBuyNow = async (offerId) => {
    setRedirectingOfferId(offerId);
    try {
      const res = await api.get(`/redirect/${offerId}`);
      if (res.data && res.data.redirectUrl) {
        window.open(res.data.redirectUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert('Could not retrieve merchant URL.');
      }
    } catch (err) {
      console.error('Error initiating redirect:', err);
      alert('Redirect failed. Please try again.');
    } finally {
      setRedirectingOfferId(null);
    }
  };

  if (loading) {
    return <div className="page-container loading-state">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="page-container alert-error">
        {error || 'Product not found.'}
        <div style={{ marginTop: '1rem' }}>
          <Link to="/" className="btn-filter-reset">Back to Products</Link>
        </div>
      </div>
    );
  }

  const offers = product.offers || [];
  const lowestPrice = product.lowestPrice;

  // Render specifications object
  const renderSpecifications = () => {
    if (!product.specifications) return <p>No specifications provided.</p>;

    if (typeof product.specifications === 'string') {
      return <p>{product.specifications}</p>;
    }

    if (typeof product.specifications === 'object') {
      const keys = Object.keys(product.specifications);
      if (keys.length === 0) return <p>No specifications provided.</p>;

      return (
        <table className="specs-table">
          <tbody>
            {keys.map((key) => (
              <tr key={key}>
                <td className="spec-key">{key}</td>
                <td className="spec-val">
                  {typeof product.specifications[key] === 'object'
                    ? JSON.stringify(product.specifications[key])
                    : String(product.specifications[key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  return (
    <div className="page-container">
      <div className="breadcrumbs">
        <Link to="/">Products</Link> &gt; <span>{product.category}</span> &gt; <span>{product.name}</span>
      </div>

      <div className="product-detail-layout">
        {/* Left Column: Images */}
        <div className="product-detail-gallery">
          <div className="main-image-wrap">
            <img
              src={selectedImage || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={product.name}
              className="main-product-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`thumbnail-img ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info */}
        <div className="product-detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-meta">
            <span><strong>Brand:</strong> {product.brand}</span>
            {product.model && <span> | <strong>Model:</strong> {product.model}</span>}
            {product.variant && <span> | <strong>Variant:</strong> {product.variant}</span>}
          </div>

          <div className="detail-lowest-price">
            {lowestPrice !== null && lowestPrice !== undefined ? (
              <>
                <span className="price-tag">Best Price:</span>
                <span className="price-val">₹{Number(lowestPrice).toLocaleString('en-IN')}</span>
              </>
            ) : (
              <span className="no-price">Currently no active offers</span>
            )}
          </div>

          {product.description && (
            <div className="detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="detail-actions">
            {isAuthenticated ? (
              <button
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                className={`btn-wishlist ${inWishlist ? 'btn-wishlist-remove' : 'btn-wishlist-add'}`}
              >
                {wishlistLoading
                  ? 'Updating...'
                  : inWishlist
                  ? 'Remove from Wishlist'
                  : 'Add to Wishlist'}
              </button>
            ) : (
              <Link to="/login" className="btn-wishlist btn-wishlist-add">
                Login to Add to Wishlist
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="detail-section">
        <h2>Specifications</h2>
        {renderSpecifications()}
      </div>

      {/* Merchant Offers Section */}
      <div className="detail-section">
        <h2>Available Merchant Offers</h2>
        {offers.length === 0 ? (
          <p className="no-offers-msg">No merchant offers currently available for this product.</p>
        ) : (
          <table className="offers-table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => {
                const isLowest = lowestPrice !== null && offer.price === lowestPrice;
                return (
                  <tr key={offer._id} className={isLowest ? 'offer-lowest-row' : ''}>
                    <td>
                      <strong>{offer.merchantName}</strong>
                      {isLowest && <span className="badge-best-price">Lowest Price</span>}
                    </td>
                    <td className="offer-price-cell">
                      ₹{Number(offer.price).toLocaleString('en-IN')}
                    </td>
                    <td>
                      {offer.availability ? (
                        <span className="badge-in-stock">In Stock</span>
                      ) : (
                        <span className="badge-out-of-stock">Out of Stock</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleBuyNow(offer._id)}
                        disabled={redirectingOfferId === offer._id || !offer.availability}
                        className="btn-buy-now"
                      >
                        {redirectingOfferId === offer._id ? 'Redirecting...' : 'Buy Now'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
