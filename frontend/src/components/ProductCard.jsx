import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://via.placeholder.com/250x180?text=No+Image';

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/250x180?text=No+Image';
          }}
        />
      </div>

      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-title">{product.name}</h3>
        <div className="product-card-brand">Brand: {product.brand}</div>

        <div className="product-card-price">
          {product.lowestPrice !== null && product.lowestPrice !== undefined ? (
            <>
              <span className="price-label">From: </span>
              <span className="price-amount">${Number(product.lowestPrice).toFixed(2)}</span>
            </>
          ) : (
            <span className="no-price">No active offers</span>
          )}
        </div>

        <Link to={`/product/${product._id}`} className="btn-view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
