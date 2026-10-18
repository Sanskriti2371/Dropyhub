import React, { useState, useEffect } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  'Watches',
  'Smartphones',
  'Laptops',
  'Headphones',
  'Fashion',
  'Home Appliances'
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  // Pagination meta from backend
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  });

  const fetchProducts = async (currentPage = page) => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: currentPage,
        limit: 12,
        sort
      };

      if (search.trim()) params.search = search.trim();
      if (category) params.category = category;
      if (brand.trim()) params.brand = brand.trim();
      if (minPrice !== '') params.minPrice = minPrice;
      if (maxPrice !== '') params.maxPrice = maxPrice;

      const response = await api.get('/products', { params });
      setProducts(response.data.products || []);
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when page, category, or sort changes
  useEffect(() => {
    fetchProducts(page);
  }, [page, category, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (page < pagination.totalPages) {
      setPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="page-container">
      <div className="home-header">
        <h1>Discover Products & Best Deals</h1>
        <p>Find the best prices across multiple merchants with DealBridge</p>
      </div>

      {/* Filter / Search Form */}
      <form onSubmit={handleSearchSubmit} className="filter-panel">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            type="text"
            placeholder="e.g. Apple, Samsung"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="filter-group price-inputs">
          <label>Price Range</label>
          <div className="price-row">
            <input
              type="number"
              placeholder="Min"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button type="submit" className="btn-filter-apply">
            Apply
          </button>
          <button type="button" onClick={handleResetFilters} className="btn-filter-reset">
            Reset
          </button>
        </div>
      </form>

      {/* Results Section */}
      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your search or filters to find what you are looking for.</p>
        </div>
      ) : (
        <>
          <div className="results-summary">
            Showing {products.length} of {pagination.total} products (Page {pagination.page} of{' '}
            {pagination.totalPages})
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pagination-bar">
              <button
                onClick={handlePrevPage}
                disabled={page <= 1}
                className="btn-page"
              >
                &larr; Previous
              </button>
              <span className="page-indicator">
                Page {page} of {pagination.totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page >= pagination.totalPages}
                className="btn-page"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
