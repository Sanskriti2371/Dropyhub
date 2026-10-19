import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">BUYhatke</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/wishlist">Wishlist</Link>

            {isAdmin && (
              <>
                <Link to="/admin/products">Admin Products</Link>
                <Link to="/admin/offers">Admin Offers</Link>
                <Link to="/analytics">Analytics</Link>
              </>
            )}

            <span className="user-greeting">
              {user?.name} {isAdmin && <small className="badge-admin">(Admin)</small>}
            </span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
