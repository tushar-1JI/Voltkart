/* ============================================================
   VOLTKART / ELECTROFAST — In-Browser Backend (localStorage)
   All data: products, users, riders, orders
   ============================================================ */

const DB = (() => {
  // ---------- helpers ----------
  const _get = k => JSON.parse(localStorage.getItem(k) || 'null');
  const _set = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const uid = () => 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();

  // ---------- seed products ----------
  const PRODUCTS = [
    { id: 'p1', name: 'Havells 16A One-Way Electrical Switch', brand: 'Havells', category: 'Switches', price: 45, mrp: 80, rating: 4.9, reviews: 2341, img: 'switch_havells.svg', color: '#ffffff', desc: 'Arctic White finish, high-grade polycarbonate, ISI certified', specs: { voltage: '250V AC', current: '16 Amperes', cycles: '1,00,000 Operations', flame: 'UL-94 V0', size: '86×86×38mm', finish: 'Glossy White', contact: 'Silver Cadmium', install: 'Standard Flush Mounting' } },
    { id: 'p2', name: 'Syska 9W Cool Day Light LED Bulb (Pack of 2)', brand: 'Syska', category: 'Lights', price: 199, mrp: 299, rating: 4.6, reviews: 1890, img: 'bulb_syska.svg', color: '#fef9c3', desc: 'Energy-efficient, 50000 hrs life, cool daylight 6500K', specs: { wattage: '9W', lumens: '900lm', color_temp: '6500K', life: '50,000 hrs', base: 'B22', voltage: '220-240V', body: 'Polycarbonate', dimmable: 'No' } },
    { id: 'p3', name: 'Polycab 2.5sqmm Red Flexible Wire (10 Meters)', brand: 'Polycab', category: 'Cables', price: 240, mrp: 350, rating: 4.7, reviews: 3120, img: 'wire_polycab.svg', color: '#fca5a5', desc: 'FR-LSH insulated, ISI marked, multi-strand copper', specs: { area: '2.5 sq mm', length: '10 Meters', conductor: 'Electrolytic Copper', insulation: 'HR-FR PVC', voltage: '1100V', temp: '85°C max', standard: 'IS 694', flame: 'Self-extinguishing' } },
    { id: 'p4', name: 'Schneider Electric 32A Double Pole MCB C-Curve', brand: 'Schneider', category: 'Breakers', price: 385, mrp: 520, rating: 4.8, reviews: 980, img: 'mcb_schneider.svg', color: '#86efac', desc: 'DIN rail mount, 10kA breaking capacity, C-curve', specs: { current: '32A', poles: 'Double Pole', curve: 'C-Curve', breaking: '10kA', standard: 'IEC 60898', width: '2 Module', mount: 'DIN Rail', indicator: 'Trip indicator' } },
    { id: 'p5', name: 'Schneider Livia 6AX 1-Way Switch with Strip', brand: 'Schneider', category: 'Switches', price: 55, mrp: 90, rating: 4.5, reviews: 1250, img: 'switch_schneider.svg', color: '#e0e7ff', desc: 'Fluorescent locator strip, modular design', specs: { voltage: '250V AC', current: '6A', cycles: '50,000 Operations', flame: 'UL-94 V0', size: '50×50×32mm', finish: 'Ivory White', contact: 'Silver Alloy', install: 'Modular' } },
    { id: 'p6', name: 'Anchor Penta 6A 1-Way Switch White', brand: 'Anchor', category: 'Switches', price: 32, mrp: 55, rating: 4.3, reviews: 2100, img: 'switch_anchor.svg', color: '#f5f5f4', desc: 'Budget-friendly, durable polycarbonate body', specs: { voltage: '250V AC', current: '6A', cycles: '40,000 Operations', flame: 'UL-94 V0', size: '50×50×30mm', finish: 'White', contact: 'Silver Tips', install: 'Modular' } },
    { id: 'p7', name: 'Legrand Mylinc 6A One-Way Switch', brand: 'Legrand', category: 'Switches', price: 48, mrp: 75, rating: 4.6, reviews: 1560, img: 'switch_legrand.svg', color: '#fef3c7', desc: 'Sleek design, quick-fix mounting, fire retardant', specs: { voltage: '250V AC', current: '6A', cycles: '80,000 Operations', flame: 'UL-94 V2', size: '45×45×35mm', finish: 'Pearl White', contact: 'Silver Cadmium', install: 'Modular Plate' } },
    { id: 'p8', name: 'GM Elite 10A One-Way Switch - Matte Black', brand: 'GM', category: 'Switches', price: 68, mrp: 110, rating: 4.4, reviews: 870, img: 'switch_gm.svg', color: '#27272a', desc: 'Premium matte black finish, silent operation', specs: { voltage: '250V AC', current: '10A', cycles: '60,000 Operations', flame: 'UL-94 V0', size: '50×50×34mm', finish: 'Matte Black', contact: 'Silver Alloy', install: 'Concealed' } },
    { id: 'p9', name: 'Havells Fabio 10AX 2-Way Switch - White', brand: 'Havells', category: 'Switches', price: 72, mrp: 120, rating: 4.7, reviews: 1340, img: 'switch_havells2.svg', color: '#f0fdf4', desc: '2-way operation, elegant design, fire-retardant', specs: { voltage: '250V AC', current: '10A', cycles: '1,00,000 Operations', flame: 'UL-94 V0', size: '50×50×36mm', finish: 'White', contact: 'Silver Cadmium', install: 'Modular' } },
    { id: 'p10', name: 'Schneider Zencelo 10AX 1-Way Switch Full Flat', brand: 'Schneider', category: 'Switches', price: 95, mrp: 150, rating: 4.8, reviews: 760, img: 'switch_zencelo.svg', color: '#eff6ff', desc: 'Full-flat design, whisper-quiet operation, premium build', specs: { voltage: '250V AC', current: '10A', cycles: '1,00,000 Operations', flame: 'UL-94 V0', size: '44×44×28mm', finish: 'Silver Bronze', contact: 'AgNi Contacts', install: 'Grid & Cover' } },
    { id: 'p11', name: 'Anchor Roma 6AX 1-Way Switch with Indicator', brand: 'Anchor', category: 'Switches', price: 38, mrp: 60, rating: 4.2, reviews: 1980, img: 'switch_roma.svg', color: '#f5f5f4', desc: 'LED indicator, ISI certified, robust build', specs: { voltage: '250V AC', current: '6A', cycles: '50,000 Operations', flame: 'UL-94 V0', size: '50×50×31mm', finish: 'White', contact: 'Silver Tips', install: 'Roma Plate' } },
    { id: 'p12', name: 'Legrand Arteor 10A 1-Way Switch White', brand: 'Legrand', category: 'Switches', price: 185, mrp: 280, rating: 4.9, reviews: 520, img: 'switch_arteor.svg', color: '#fafaf9', desc: 'Luxury segment, curved design, premium finish', specs: { voltage: '250V AC', current: '10A', cycles: '1,20,000 Operations', flame: 'UL-94 V0', size: '45×45×27mm', finish: 'Mirror White', contact: 'Silver Cadmium Oxide', install: 'Arteor Plate' } },
    { id: 'p13', name: 'Wipro Leaf 6A One-Way Switch', brand: 'Wipro', category: 'Switches', price: 28, mrp: 45, rating: 4.1, reviews: 2450, img: 'switch_wipro.svg', color: '#f5f5f4', desc: 'Eco-friendly, compact design, value for money', specs: { voltage: '250V AC', current: '6A', cycles: '30,000 Operations', flame: 'UL-94 V2', size: '50×50×29mm', finish: 'White', contact: 'Brass Tips', install: 'Modular' } },
    { id: 'p14', name: 'Anchor 3-Pin Universal Plug 6A', brand: 'Anchor', category: 'Connectors', price: 25, mrp: 40, rating: 4.3, reviews: 3450, img: 'plug_anchor.svg', color: '#e2e8f0', desc: 'Universal 3-pin plug, ISI marked', specs: { current: '6A', pins: '3-Pin', type: 'Universal', material: 'Polycarbonate', standard: 'IS 1293', color: 'White', cord_grip: 'Yes', earth: 'Yes' } },
    { id: 'p15', name: 'Stanley 8-Piece Screwdriver Set', brand: 'Stanley', category: 'Tools', price: 450, mrp: 650, rating: 4.7, reviews: 1120, img: 'tools_stanley.svg', color: '#fef08a', desc: 'Chrome vanadium steel, magnetic tips, comfort grip', specs: { pieces: '8', material: 'Chrome Vanadium Steel', tips: 'Magnetic', grip: 'Bi-material', types: '4 Flat + 4 Phillips', warranty: '1 Year', case: 'Included', standard: 'ISO 2380' } },
    { id: 'p16', name: 'Havells 15W Panel LED Light (Round)', brand: 'Havells', category: 'Lights', price: 320, mrp: 480, rating: 4.6, reviews: 890, img: 'panel_havells.svg', color: '#fefce8', desc: 'Slim panel light, 6500K cool white, surface mount', specs: { wattage: '15W', lumens: '1500lm', color_temp: '6500K', life: '25,000 hrs', shape: 'Round', mount: 'Surface', body: 'Aluminum + PMMA', driver: 'In-built' } },
    { id: 'p17', name: 'Wipro Smart Plug 10A WiFi', brand: 'Wipro', category: 'Connectors', price: 599, mrp: 899, rating: 4.4, reviews: 670, img: 'smartplug_wipro.svg', color: '#dbeafe', desc: 'WiFi enabled, works with Alexa & Google, timer, scheduling', specs: { current: '10A', connectivity: 'WiFi 2.4GHz', assistant: 'Alexa & Google', app: 'Wipro Smart Home', timer: 'Yes', schedule: 'Yes', material: 'Fire-retardant PC', indicator: 'LED' } },
    { id: 'p18', name: 'Fluke 101 Digital Multimeter', brand: 'Fluke', category: 'Testing', price: 3200, mrp: 4500, rating: 4.9, reviews: 340, img: 'multimeter_fluke.svg', color: '#fef08a', desc: 'CAT III 600V safety, true-RMS, auto-range', specs: { voltage_dc: '600V', voltage_ac: '600V', current: '10A', resistance: '40MΩ', safety: 'CAT III 600V', display: '6000 count', battery: '2×AAA', accuracy: '±0.5%' } },
    { id: 'p19', name: 'Luminous 600VA UPS Inverter', brand: 'Luminous', category: 'Power', price: 2800, mrp: 3800, rating: 4.5, reviews: 1560, img: 'ups_luminous.svg', color: '#e0e7ff', desc: 'Sine wave output, intelligent battery management', specs: { capacity: '600VA / 480W', input: '140V-300V AC', output: '230V ± 5%', wave: 'Pure Sine Wave', battery: '12V DC', changeover: '10ms', protection: 'Overload + Short Circuit', display: 'LED Indicators' } },
    { id: 'p20', name: 'Finolex 4sqmm Blue Cable (90m)', brand: 'Finolex', category: 'Cables', price: 4200, mrp: 5500, rating: 4.8, reviews: 720, img: 'cable_finolex.svg', color: '#bfdbfe', desc: 'FR-LSH, 90m coil, electrolytic copper conductor', specs: { area: '4 sq mm', length: '90 Meters', conductor: 'Electrolytic Copper', insulation: 'FR-LSH PVC', voltage: '1100V', temp: '85°C max', standard: 'IS 694', flame: 'Self-extinguishing' } }
  ];

  // ---------- seed riders ----------
  const RIDERS = [
    { id: 'r1', name: 'Rajesh Kumar', phone: '+91 98765 43210', rating: 4.9, vehicle: 'TVS Jupiter', plate: 'DL 4S BA 4562', avatar: '🏍️', available: true, lat: 28.5505, lng: 77.2335 },
    { id: 'r2', name: 'Amit Singh', phone: '+91 98765 43211', rating: 4.7, vehicle: 'Honda Activa', plate: 'DL 3C AB 7891', avatar: '🏍️', available: true, lat: 28.5450, lng: 77.2400 },
    { id: 'r3', name: 'Suresh Yadav', phone: '+91 98765 43212', rating: 4.8, vehicle: 'Bajaj Pulsar', plate: 'DL 9S CD 2345', avatar: '🏍️', available: true, lat: 28.5480, lng: 77.2280 },
    { id: 'r4', name: 'Deepak Sharma', phone: '+91 98765 43213', rating: 4.6, vehicle: 'TVS XL', plate: 'DL 2C EF 6789', avatar: '🏍️', available: false, lat: 28.5520, lng: 77.2310 },
    { id: 'r5', name: 'Vikram Chauhan', phone: '+91 98765 43214', rating: 4.9, vehicle: 'Hero Splendor', plate: 'DL 7S GH 0123', avatar: '🏍️', available: true, lat: 28.5460, lng: 77.2360 }
  ];

  // ---------- CATEGORIES ----------
  const CATEGORIES = [
    { id: 'cat1', name: 'Connectors', icon: '🔌', count: 48, slug: 'Connectors' },
    { id: 'cat2', name: 'Switches', icon: '🔲', count: 124, slug: 'Switches' },
    { id: 'cat3', name: 'Cables', icon: '🔗', count: 86, slug: 'Cables' },
    { id: 'cat4', name: 'Breakers', icon: '⚡', count: 52, slug: 'Breakers' },
    { id: 'cat5', name: 'Lights', icon: '💡', count: 97, slug: 'Lights' },
    { id: 'cat6', name: 'Tools', icon: '🔧', count: 63, slug: 'Tools' },
    { id: 'cat7', name: 'Power', icon: '🔋', count: 41, slug: 'Power' },
    { id: 'cat8', name: 'Testing', icon: '📟', count: 29, slug: 'Testing' }
  ];

  // ---------- default admin user ----------
  function _initUsers() {
    if (!_get('vk_users')) {
      _set('vk_users', [
        { id: 'u0', name: 'Admin', email: 'admin@voltkart.com', phone: '+91 99999 00000', password: 'admin123', role: 'admin', address: 'Voltkart HQ, Saket, New Delhi', lat: 28.5245, lng: 77.2066, createdAt: Date.now() },
        { id: 'u1', name: 'Vikas Khanna', email: 'vikas@gmail.com', phone: '+91 98765 43210', password: 'vikas123', role: 'user', address: 'House 24, B-Block, M-Park, Greater Kailash-I, New Delhi - 110048', lat: 28.5494, lng: 77.2340, createdAt: Date.now() }
      ]);
    }
  }

  function _initRiders() {
    if (!_get('vk_riders')) _set('vk_riders', RIDERS);
  }

  function _initOrders() {
    if (!_get('vk_orders')) _set('vk_orders', []);
  }

  // ---------- SHOP SETTINGS ----------
  const DEFAULT_SHOP = { name: 'Voltkart Store', address: 'Shop 12, Saket Market, New Delhi - 110017', phone: '+91 99999 00000', lat: 28.5245, lng: 77.2066 };
  function _initShop() {
    if (!_get('vk_shop')) _set('vk_shop', DEFAULT_SHOP);
  }
  function getShopSettings() { return _get('vk_shop') || DEFAULT_SHOP; }
  function saveShopSettings(data) { _set('vk_shop', data); return true; }

  // ---------- INIT ----------
  function init() {
    _initUsers();
    _initRiders();
    _initOrders();
    _initShop();
  }

  // ---------- AUTH ----------
  function register(name, email, phone, password, address) {
    const users = _get('vk_users') || [];
    if (users.find(u => u.email === email)) return { ok: false, msg: 'Email already registered' };
    const user = { id: 'u' + Date.now(), name, email, phone, password, role: 'user', address: address || '', lat: 28.5494, lng: 77.2340, createdAt: Date.now() };
    users.push(user);
    _set('vk_users', users);
    _set('vk_session', { id: user.id, name: user.name, email: user.email, role: user.role });
    return { ok: true, user };
  }

  function login(email, password) {
    const users = _get('vk_users') || [];
    const u = users.find(u => u.email === email && u.password === password);
    if (!u) return { ok: false, msg: 'Invalid email or password' };
    _set('vk_session', { id: u.id, name: u.name, email: u.email, role: u.role });
    return { ok: true, user: u };
  }

  function logout() { localStorage.removeItem('vk_session'); }
  function session() { return _get('vk_session'); }
  function isLoggedIn() { return !!session(); }
  function isAdmin() { const s = session(); return s && s.role === 'admin'; }

  function getUser(id) { return (_get('vk_users') || []).find(u => u.id === id); }
  function updateUser(id, data) {
    const users = _get('vk_users') || [];
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    Object.assign(users[idx], data);
    _set('vk_users', users);
    if (session() && session().id === id) {
      _set('vk_session', { id: users[idx].id, name: users[idx].name, email: users[idx].email, role: users[idx].role });
    }
    return true;
  }

  // ---------- PRODUCTS ----------
  function getProducts(filters = {}) {
    let list = [...PRODUCTS];
    if (filters.category) list = list.filter(p => p.category === filters.category);
    if (filters.brand) list = list.filter(p => p.brand === filters.brand);
    if (filters.minPrice) list = list.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) list = list.filter(p => p.price <= filters.maxPrice);
    if (filters.minRating) list = list.filter(p => p.rating >= filters.minRating);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (filters.sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (filters.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }
  function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
  function getCategories() { return CATEGORIES; }

  // ---------- CART ----------
  function getCart() { return _get('vk_cart') || []; }
  function addToCart(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find(c => c.productId === productId);
    if (existing) { existing.qty += qty; }
    else { cart.push({ productId, qty }); }
    _set('vk_cart', cart);
    return cart;
  }
  function removeFromCart(productId) {
    let cart = getCart().filter(c => c.productId !== productId);
    _set('vk_cart', cart);
    return cart;
  }
  function updateCartQty(productId, qty) {
    const cart = getCart();
    const item = cart.find(c => c.productId === productId);
    if (item) { item.qty = Math.max(1, qty); }
    _set('vk_cart', cart);
    return cart;
  }
  function clearCart() { _set('vk_cart', []); }
  function cartTotal() {
    const cart = getCart();
    let subtotal = 0, savings = 0;
    cart.forEach(c => {
      const p = getProduct(c.productId);
      if (p) { subtotal += p.price * c.qty; savings += (p.mrp - p.price) * c.qty; }
    });
    const delivery = subtotal > 200 ? 0 : 50;
    const handling = 5;
    return { subtotal, savings, delivery, handling, total: subtotal + delivery + handling, items: cart.length };
  }

  // ---------- ORDERS ----------
  function getOrders() { return _get('vk_orders') || []; }
  function getOrder(id) { return getOrders().find(o => o.id === id); }
  function getUserOrders(userId) { return getOrders().filter(o => o.userId === userId); }

  function placeOrder() {
    const s = session();
    if (!s) return { ok: false, msg: 'Please login first' };
    const cart = getCart();
    if (!cart.length) return { ok: false, msg: 'Cart is empty' };
    const user = getUser(s.id);
    const totals = cartTotal();
    const items = cart.map(c => {
      const p = getProduct(c.productId);
      return { productId: c.productId, name: p.name, brand: p.brand, price: p.price, qty: c.qty, img: p.img };
    });
    const order = {
      id: uid(),
      userId: s.id,
      userName: user.name,
      userPhone: user.phone,
      userAddress: user.address,
      userLat: user.lat,
      userLng: user.lng,
      items,
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      handling: totals.handling,
      total: totals.total,
      savings: totals.savings,
      status: 'placed',
      riderId: null,
      riderName: null,
      timeline: [
        { status: 'Ordered', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), done: true }
      ],
      placedAt: Date.now(),
      estimatedDelivery: 10 * 60 * 1000,
      paymentMethod: 'COD'
    };
    const orders = getOrders();
    orders.push(order);
    _set('vk_orders', orders);
    clearCart();
    return { ok: true, order };
  }

  function confirmOrder(orderId) {
    const orders = getOrders();
    const o = orders.find(o => o.id === orderId);
    if (!o) return false;
    o.status = 'confirmed';
    o.timeline.push({ status: 'Confirmed', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), done: true });
    _set('vk_orders', orders);
    return true;
  }

  function packOrder(orderId) {
    const orders = getOrders();
    const o = orders.find(o => o.id === orderId);
    if (!o) return false;
    o.status = 'packed';
    o.timeline.push({ status: 'Packed', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), done: true });
    _set('vk_orders', orders);
    return true;
  }

  function assignRider(orderId, riderId) {
    const orders = getOrders();
    const o = orders.find(o => o.id === orderId);
    if (!o) return false;
    const riders = _get('vk_riders');
    const r = riders.find(r => r.id === riderId);
    if (!r) return false;
    o.riderId = riderId;
    o.riderName = r.name;
    o.status = 'on_the_way';
    o.timeline.push({ status: 'On the Way', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), done: true, active: true });
    r.available = false;
    _set('vk_orders', orders);
    _set('vk_riders', riders);
    return true;
  }

  function deliverOrder(orderId) {
    const orders = getOrders();
    const o = orders.find(o => o.id === orderId);
    if (!o) return false;
    o.status = 'delivered';
    o.timeline = o.timeline.map(t => ({ ...t, active: false }));
    o.timeline.push({ status: 'Delivered', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), done: true });
    // Free up rider
    if (o.riderId) {
      const riders = _get('vk_riders');
      const r = riders.find(r => r.id === o.riderId);
      if (r) r.available = true;
      _set('vk_riders', riders);
    }
    _set('vk_orders', orders);
    return true;
  }

  // ---------- RIDERS ----------
  function getRiders() { return _get('vk_riders') || RIDERS; }
  function getAvailableRiders() { return getRiders().filter(r => r.available); }
  function getRider(id) { return getRiders().find(r => r.id === id); }

  return {
    init, PRODUCTS, CATEGORIES,
    // auth
    register, login, logout, session, isLoggedIn, isAdmin, getUser, updateUser,
    // products
    getProducts, getProduct, getCategories,
    // cart
    getCart, addToCart, removeFromCart, updateCartQty, clearCart, cartTotal,
    // orders
    getOrders, getOrder, getUserOrders, placeOrder, confirmOrder, packOrder, assignRider, deliverOrder,
    // riders
    getRiders, getAvailableRiders, getRider,
    // shop
    getShopSettings, saveShopSettings
  };
})();

DB.init();
