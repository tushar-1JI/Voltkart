/* ============================================================
   VOLTKART — Shared UI Logic (app.js)
   Color rotation, header/footer injection, toast, helpers
   ============================================================ */

// 7-day color rotation
const COLORS = [
  { name:'Sunday',    hex:'#ef4444', rgb:'239,68,68' },
  { name:'Monday',    hex:'#eab308', rgb:'234,179,8' },
  { name:'Tuesday',   hex:'#06b6d4', rgb:'6,182,212' },
  { name:'Wednesday', hex:'#ec4899', rgb:'236,72,153' },
  { name:'Thursday',  hex:'#22c55e', rgb:'34,197,94' },
  { name:'Friday',    hex:'#f97316', rgb:'249,115,22' },
  { name:'Saturday',  hex:'#a855f7', rgb:'168,85,247' }
];

function applyDayColor(){
  const c = COLORS[new Date().getDay()];
  const r = document.documentElement;
  r.style.setProperty('--accent', c.hex);
  r.style.setProperty('--accent-20', `rgba(${c.rgb},.2)`);
  r.style.setProperty('--accent-40', `rgba(${c.rgb},.4)`);
  return c;
}

function getCartCount(){
  return (DB.getCart()||[]).reduce((s,i)=>s+i.qty,0);
}

// Product emoji based on category
function prodEmoji(p){
  const m = {Switches:'🔲',Lights:'💡',Cables:'🔗',Breakers:'⚡',Connectors:'🔌',Tools:'🔧',Power:'🔋',Testing:'📟'};
  return m[p.category]||'📦';
}

function stars(r){
  const full = Math.floor(r);
  let s = '★'.repeat(full);
  if(r - full >= 0.5) s += '½';
  return s;
}

function discount(p){ return Math.round((1 - p.price/p.mrp)*100); }

// Toast notification
function showToast(msg){
  let t = document.getElementById('appToast');
  if(!t){t=document.createElement('div');t.id='appToast';t.className='toast';document.body.appendChild(t);}
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

// Render header
function renderHeader(activePage){
  const s = DB.session();
  const cc = getCartCount();
  const dayColor = applyDayColor();
  const html = `
  <header class="header">
    <div class="container">
      <a href="index.html" class="logo">⚡ VOLTKART</a>
      <div class="header-search"><input type="text" placeholder="Search electrical hardware..." id="headerSearch" onkeydown="if(event.key==='Enter')doSearch()"></div>
      <div class="header-right">
        <span class="day-pill">🎨 ${dayColor.name}</span>
        <a href="listing.html" class="header-btn">📱 Shop</a>
        ${s ? `<a href="profile.html" class="header-btn">👤 ${s.name.split(' ')[0]}</a>` : `<a href="login.html" class="header-btn">🔐 Login</a>`}
        ${s && s.role==='admin' ? `<a href="admin.html" class="header-btn" style="color:var(--accent)">⚙️ Admin</a>` : ''}
        <a href="cart.html" class="header-btn">🛒 Cart${cc ? `<span class="cart-badge">${cc}</span>`:''}</a>
      </div>
    </div>
  </header>
  <div class="marquee"><div class="marquee-inner"><span>⚡ 10 MINUTE DELIVERY GUARANTEE &nbsp;•&nbsp; 💰 CASH ON DELIVERY AVAILABLE &nbsp;•&nbsp; 🔒 100% GENUINE PRODUCTS &nbsp;•&nbsp; 🚚 FREE DELIVERY OVER ₹200 &nbsp;•&nbsp;</span><span>⚡ 10 MINUTE DELIVERY GUARANTEE &nbsp;•&nbsp; 💰 CASH ON DELIVERY AVAILABLE &nbsp;•&nbsp; 🔒 100% GENUINE PRODUCTS &nbsp;•&nbsp; 🚚 FREE DELIVERY OVER ₹200 &nbsp;•&nbsp;</span></div></div>`;
  document.getElementById('app-header').innerHTML = html;
}

function doSearch(){
  const q = document.getElementById('headerSearch').value.trim();
  if(q) window.location.href = 'listing.html?search=' + encodeURIComponent(q);
}

// Render footer
function renderFooter(){
  document.getElementById('app-footer').innerHTML = `
  <footer class="footer"><div class="container">
    <div class="footer-grid">
      <div class="footer-brand"><a href="index.html" class="logo">⚡ VOLTKART</a><p>India's first lightning-fast electrical hardware delivery platform. Powering your home and projects in 10 minutes.</p></div>
      <div><h4>Categories</h4><ul><li><a href="listing.html?cat=Connectors">Connectors & Plugs</a></li><li><a href="listing.html?cat=Switches">Modular Switches</a></li><li><a href="listing.html?cat=Breakers">Circuit Breakers</a></li><li><a href="listing.html?cat=Tools">Industrial Tools</a></li></ul></div>
      <div><h4>Company</h4><ul><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Partner with us</a></li><li><a href="#">Privacy Policy</a></li></ul></div>
      <div><h4>Support</h4><ul><li><a href="#">Help Center</a></li><li><a href="tracking.html">Track Order</a></li><li><a href="#">Returns</a></li><li><a href="#">Contact Us</a></li></ul></div>
    </div>
    <div class="footer-bottom"><span>© 2024 Voltkart Technologies. All rights reserved. Made with ⚡ for India</span><div class="social-links"><a href="#">📘</a><a href="#">🐦</a><a href="#">📸</a><a href="#">▶️</a></div></div>
  </div></footer>
  <div class="mobile-nav"><div class="container">
    <a href="index.html"><span class="icon">🏠</span>Home</a>
    <a href="listing.html"><span class="icon">🔍</span>Search</a>
    <a href="cart.html"><span class="icon">🛒</span>Cart</a>
    <a href="${DB.isLoggedIn()?'profile.html':'login.html'}"><span class="icon">👤</span>Account</a>
  </div></div>`;
}

// Init on every page
function initPage(active){
  applyDayColor();
  renderHeader(active);
  renderFooter();
}

// Product card HTML
function productCardHTML(p){
  return `<div class="prod-card" onclick="window.location='product.html?id=${p.id}'">
    <span class="prod-badge">⚡ 10 MINS</span>
    <div class="prod-img">${prodEmoji(p)}</div>
    <div class="prod-info">
      <div class="prod-brand">${p.brand}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews.toLocaleString()})</div>
      <div class="prod-price"><span class="now">₹${p.price}</span><span class="was">₹${p.mrp}</span><span class="off">${discount(p)}% off</span></div>
      <button class="btn btn-accent btn-sm" onclick="event.stopPropagation();addToCartBtn('${p.id}')">🛒 Add to Cart</button>
    </div>
  </div>`;
}

function addToCartBtn(pid){
  if(!DB.isLoggedIn()){showToast('Please login first!');setTimeout(()=>window.location='login.html',1000);return;}
  DB.addToCart(pid);
  showToast('✅ Added to cart!');
  renderHeader();
}
