import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/analytics');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div>
          <h1>Platform Analytics</h1>
          <p>Key metrics and affiliate performance insights</p>
        </div>
        <button onClick={fetchAnalytics} disabled={loading} className="btn-secondary">
          {loading ? 'Refreshing...' : '↻ Refresh Data'}
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {loading && !data ? (
        <div className="loading-state">Loading analytics...</div>
      ) : data ? (
        <>
          {/* Key Metric Summary Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-title">Total Active Products</span>
              <span className="metric-value">{data.totalProducts ?? 0}</span>
              <span className="metric-desc">Catalog items currently active</span>
            </div>

            <div className="metric-card">
              <span className="metric-title">Total Active Offers</span>
              <span className="metric-value">{data.totalOffers ?? 0}</span>
              <span className="metric-desc">Available merchant pricing feeds</span>
            </div>

            <div className="metric-card">
              <span className="metric-title">Total Affiliate Clicks</span>
              <span className="metric-value">{data.totalClicks ?? 0}</span>
              <span className="metric-desc">Redirects tracked across all items</span>
            </div>
          </div>

          {/* Tables Section */}
          <div className="analytics-tables-grid">
            {/* Top 5 Products Table */}
            <div className="analytics-card">
              <h3>Top 5 Most Clicked Products</h3>
              {(!data.mostClickedProducts || data.mostClickedProducts.length === 0) ? (
                <p className="text-muted">No product click activity recorded yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>#</th>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th style={{ textAlign: 'right' }}>Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.mostClickedProducts.map((item, index) => (
                        <tr key={item.productId || index}>
                          <td>{index + 1}</td>
                          <td>
                            {item.productId ? (
                              <Link to={`/product/${item.productId}`} className="table-link">
                                {item.name || 'Unknown Product'}
                              </Link>
                            ) : (
                              item.name || 'Unknown Product'
                            )}
                          </td>
                          <td>{item.brand || '-'}</td>
                          <td>{item.category || '-'}</td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                            {item.clicks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Top 5 Merchants Table */}
            <div className="analytics-card">
              <h3>Top 5 Most Clicked Merchants</h3>
              {(!data.mostClickedMerchants || data.mostClickedMerchants.length === 0) ? (
                <p className="text-muted">No merchant click activity recorded yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>#</th>
                        <th>Merchant Name</th>
                        <th style={{ textAlign: 'right' }}>Total Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.mostClickedMerchants.map((m, index) => (
                        <tr key={m.merchantName || index}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{m.merchantName}</strong>
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                            {m.clicks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Analytics;
