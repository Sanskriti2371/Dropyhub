const app = require('./server');
const http = require('http');

async function runTests() {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5001, resolve));
  console.log('Test server started on port 5001');

  const baseUrl = 'http://127.0.0.1:5001';

  async function api(path, options = {}) {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, data };
  }

  let passed = 0;
  let failed = 0;

  function assert(desc, condition, details = '') {
    if (condition) {
      console.log(` PASS: ${desc}`);
      passed++;
    } else {
      console.error(` FAIL: ${desc} ${details}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const health = await api('/api/health');
    assert('GET /api/health returns 200 and status ok', health.status === 200 && health.data?.status === 'ok');

    // 2. Auth login (Admin)
    const adminLogin = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@dealbridge.com', password: 'admin123' })
    });
    assert('POST /api/auth/login for admin', adminLogin.status === 200 && adminLogin.data?.user?.role === 'admin');
    const adminToken = adminLogin.data?.token;

    // 3. Auth login (User)
    const userLogin = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'user@dealbridge.com', password: 'user123' })
    });
    assert('POST /api/auth/login for user', userLogin.status === 200 && userLogin.data?.user?.role === 'user');
    const userToken = userLogin.data?.token;

    // 4. GET /api/products
    const productsRes = await api('/api/products?page=1&limit=6');
    assert('GET /api/products returns products list and pagination', productsRes.status === 200 && productsRes.data?.products?.length === 6);
    assert('Product list items include lowestPrice', typeof productsRes.data?.products[0]?.lowestPrice === 'number');

    const firstProduct = productsRes.data.products[0];

    // 5. GET /api/products/:id with populated offers
    const singleProduct = await api(`/api/products/${firstProduct._id}`);
    assert('GET /api/products/:id returns offers and lowestPrice', singleProduct.status === 200 && Array.isArray(singleProduct.data?.offers) && singleProduct.data.offers.length > 0);

    const firstOffer = singleProduct.data.offers[0];

    // 6. GET /api/offers/product/:productId
    const offersRes = await api(`/api/offers/product/${firstProduct._id}`);
    assert('GET /api/offers/product/:productId returns offers', offersRes.status === 200 && offersRes.data.length > 0);

    // 7. GET /api/redirect/:offerId
    const initialPop = singleProduct.data.popularity || 0;
    const redirectRes = await api(`/api/redirect/${firstOffer._id}`);
    assert('GET /api/redirect/:offerId returns redirectUrl without server redirect', redirectRes.status === 200 && typeof redirectRes.data?.redirectUrl === 'string');

    // Verify popularity incremented
    const afterRedirectProduct = await api(`/api/products/${firstProduct._id}`);
    assert('Product popularity incremented after redirect', afterRedirectProduct.data.popularity === initialPop + 1);

    // 8. Wishlist endpoints
    const wishlistRes = await api('/api/wishlist', {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert('GET /api/wishlist returns user wishlist', wishlistRes.status === 200 && Array.isArray(wishlistRes.data?.wishlist));

    const removeRes = await api('/api/wishlist/remove', {
      method: 'POST',
      headers: { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ productId: firstProduct._id })
    });
    assert('POST /api/wishlist/remove works', removeRes.status === 200);

    const addRes = await api('/api/wishlist/add', {
      method: 'POST',
      headers: { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ productId: firstProduct._id })
    });
    assert('POST /api/wishlist/add works', addRes.status === 200);

    // 9. Analytics (Admin only)
    const nonAdminAnalytics = await api('/api/analytics', {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert('GET /api/analytics rejects non-admin with 403', nonAdminAnalytics.status === 403);

    const adminAnalytics = await api('/api/analytics', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert('GET /api/analytics returns platform metrics', adminAnalytics.status === 200 && adminAnalytics.data?.totalProducts > 0 && Array.isArray(adminAnalytics.data?.mostClickedProducts));

    // 10. Filter & Sorting tests
    const categoryFilter = await api('/api/products?category=Smartphones');
    assert('Category filter works', categoryFilter.status === 200 && categoryFilter.data.products.every(p => p.category === 'Smartphones'));

    const sortPriceAsc = await api('/api/products?sort=price_asc&limit=5');
    const prices = sortPriceAsc.data.products.map(p => p.lowestPrice);
    const isSorted = prices.slice(1).every((p, i) => p >= prices[i]);
    assert('Sorting by price_asc works', isSorted);

    console.log(`\nTests finished: ${passed} passed, ${failed} failed.`);
  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
