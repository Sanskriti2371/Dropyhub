# DealBridge — Product Discovery & Affiliate Commerce Platform

A full-stack MERN application that lets users browse products across multiple categories, compare merchant offers from external e-commerce platforms, and get redirected to purchase. The platform does not sell products directly — it aggregates offers and tracks outbound clicks.

## Tech Stack

- **Frontend:** React.js (Vite)
- **Backend:** Express.js + Node.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT (JSON Web Tokens) + bcrypt password hashing

## Features

### Public
- Browse products across 6 categories (Watches, Smartphones, Laptops, Headphones, Fashion, Home Appliances)
- Search products by name, brand, or model
- Filter by category, brand, and price range
- Sort by price (low/high), newest arrivals, or popularity
- Server-side pagination
- View product details with specifications
- Compare merchant offers (Amazon, Flipkart, Croma, etc.)
- "Buy Now" redirects to external merchant pages with click tracking

### Authenticated Users
- Register and login
- Add/remove products from personal wishlist
- Wishlist persists across sessions

### Admin
- Add, edit, and deactivate products
- Manage merchant offers (add, update, delete)
- View analytics dashboard (total products, offers, clicks, most-clicked products/merchants)

## Architecture

```
dropyhub/
├── backend/
│   ├── models/          # Mongoose schemas (User, Product, MerchantOffer, Click)
│   ├── routes/          # Express route handlers (auth, products, offers, wishlist, redirect, analytics)
│   ├── middleware/       # JWT authentication & admin role check
│   ├── server.js        # Express app entry point
│   ├── seed.js          # Database seeding script
│   └── .env.example     # Environment variable template
├── frontend/
│   ├── src/
│   │   ├── pages/       # React page components
│   │   ├── components/  # Reusable UI components (Navbar, ProductCard, ProtectedRoute)
│   │   ├── context/     # Auth context provider
│   │   ├── api.js       # Axios instance with auth interceptor
│   │   ├── App.jsx      # Router setup
│   │   └── main.jsx     # Entry point
│   └── index.html
├── README.md
└── .gitignore
```

### Database Design

**Product** — Canonical product entity with brand, model, variant, category, specifications. Uses a `canonicalId` (generated from brand+model+variant) to prevent duplicate entries and support product normalization.

**MerchantOffer** — References a Product. Contains merchant name, price, external URL, availability. Multiple offers can link to one product.

**Click** — Logs outbound click events with product, offer, merchant name, and timestamp. Used for analytics and popularity tracking.

**User** — Stores name, email, hashed password, role (user/admin), and wishlist (array of Product references).

### Product Normalization

Products are identified by a canonical ID built from `brand + model + variant` (lowercased and trimmed). This ensures:
1. The same product from different merchants maps to one canonical entry
2. Different variants (e.g., 42mm vs 46mm) remain separate
3. Duplicate offers are avoided by linking to the canonical product
4. Missing model/variant info defaults gracefully

### Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT-based authentication with 7-day token expiry
- Role-based access control enforced on the backend (not just frontend)
- Admin routes protected by `isAdmin` middleware
- Users can only access their own wishlist
- Redirect URLs are validated — users cannot inject arbitrary redirect targets
- Input validation using express-validator

## Demo Credentials

| Role  | Email                  | Password |
|-------|------------------------|----------|
| Admin | admin@dealbridge.com   | admin123 |
| User  | user@dealbridge.com    | user123  |

## Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (default: `mongodb://localhost:27017/dealbridge`)

### 1. Clone the repository
```bash
git clone <repo-url>
cd dropyhub
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env
# Edit .env if needed (MongoDB URI, JWT secret, port)
npm install
node seed.js    # Seed the database with demo data
npm start       # Starts on http://localhost:5000
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev     # Starts on http://localhost:5173
```

### 4. Open in browser
Go to `http://localhost:5173` — the frontend connects to the backend at `http://localhost:5000/api`.

## Environment Variables

### Backend (`.env`)
| Variable    | Description                        | Default                                    |
|-------------|------------------------------------|--------------------------------------------|
| PORT        | Server port                        | 5000                                       |
| MONGO_URI   | MongoDB connection string          | mongodb://localhost:27017/dealbridge        |
| JWT_SECRET  | Secret key for signing JWT tokens  | (set your own)                             |

### Frontend
| Variable      | Description         | Default                      |
|---------------|---------------------|------------------------------|
| VITE_API_URL  | Backend API base URL | http://localhost:5000/api     |

## API Endpoints

| Method | Endpoint                    | Auth     | Description                          |
|--------|-----------------------------|----------|--------------------------------------|
| POST   | /api/auth/register          | Public   | Register new user                    |
| POST   | /api/auth/login             | Public   | Login, returns JWT                   |
| GET    | /api/auth/me                | User     | Get current user profile             |
| GET    | /api/products               | Public   | List products (search/filter/sort)   |
| GET    | /api/products/:id           | Public   | Get product details + offers         |
| POST   | /api/products               | Admin    | Create product                       |
| PUT    | /api/products/:id           | Admin    | Update product                       |
| DELETE | /api/products/:id           | Admin    | Deactivate product                   |
| GET    | /api/offers/product/:id     | Public   | Get offers for a product             |
| POST   | /api/offers                 | Admin    | Create merchant offer                |
| PUT    | /api/offers/:id             | Admin    | Update merchant offer                |
| DELETE | /api/offers/:id             | Admin    | Delete merchant offer                |
| GET    | /api/wishlist               | User     | Get user's wishlist                  |
| POST   | /api/wishlist/add           | User     | Add product to wishlist              |
| POST   | /api/wishlist/remove        | User     | Remove product from wishlist         |
| GET    | /api/redirect/:offerId      | Public   | Track click and return redirect URL  |
| GET    | /api/analytics              | Admin    | Platform analytics dashboard data    |
| GET    | /api/health                 | Public   | Health check                         |

## Seed Data

The seed script (`backend/seed.js`) creates:
- 24 products across all 6 categories with realistic brands and models
- 72 merchant offers across Amazon India, Flipkart, Croma, Reliance Digital, Tata CLiQ, Myntra, and Ajio
- 45 sample click events for analytics
- 1 admin account and 1 standard user account

## Simulated Data Disclaimer

All product data in this application is seeded/simulated for demonstration purposes. External merchant URLs point to real e-commerce platforms but are sample links used to demonstrate the redirect functionality. No actual affiliate partnerships or live merchant integrations are used.
