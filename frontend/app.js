let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 12499,
    image: "../images/headphones.png",
    category: "electronics",
    rating: 4.8,
    stock: 12,
    blurb: "Balanced audio performance with a comfort-focused design for daily use.",
  },
  {
    id: 2,
    name: "Digital Watch",
    price: 10999,
    image: "../images/watches.png",
    category: "accessories",
    rating: 4.6,
    stock: 8,
    blurb: "Lightweight daily timepiece with a clean profile and dependable utility.",
  },
  {
    id: 3,
    name: "Stylish Backpack",
    price: 11899,
    image: "../images/backpack.png",
    category: "fashion",
    rating: 4.7,
    stock: 5,
    blurb: "Practical storage capacity with a streamlined form for routine mobility.",
  },
  {
    id: 4,
    name: "Smartphone",
    price: 45999,
    image: "../images/power bank.png",
    category: "electronics",
    rating: 4.9,
    stock: 3,
    blurb: "Reliable smartphone performance with an efficient design for daily productivity.",
  },
  {
    id: 5,
    name: "Sneakers",
    price: 13999,
    image: "../images/headphones.png",
    category: "fashion",
    rating: 4.5,
    stock: 14,
    blurb: "Comfort-oriented sneakers engineered for stable and consistent daily movement.",
  },
];

function getFallbackProductData(id) {
  const defaults = {
    1: { rating: 4.8, stock: 12 },
    2: { rating: 4.6, stock: 8 },
    3: { rating: 4.7, stock: 5 },
    4: { rating: 4.9, stock: 3 },
    5: { rating: 4.5, stock: 14 },
  };

  return defaults[id] || { rating: 4.6, stock: 9 };
}

function generatePlaceholderImage(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  const hash = Array.from(text).reduce((h, c) => h + c.charCodeAt(0), 0);
  const hue = hash % 360;

  ctx.fillStyle = `hsl(${hue} 60% 88%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#333";
  ctx.font = "28px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
}

function normalizeImagePath(path, name) {
  if (!path) return generatePlaceholderImage(name);

  const lowered = String(path).toLowerCase();

  if (lowered.includes("headphone")) return "../images/headphones.png";
  if (lowered.includes("watch")) return "../images/watches.png";
  if (lowered.includes("backpack")) return "../images/backpack.png";
  if (lowered.includes("power") || lowered.includes("phone")) {
    return "../images/power bank.png";
  }

  if (path.startsWith("../images/")) return path;
  if (path.startsWith("images/")) return `../${path}`;

  return path;
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function getLanguage() {
  return localStorage.getItem("siteLanguage") || "en";
}

function setLanguage(lang) {
  localStorage.setItem("siteLanguage", lang);
}

function getTheme() {
  return localStorage.getItem("siteTheme") || "light";
}

function setTheme(theme) {
  localStorage.setItem("siteTheme", theme);
}

const i18n = {
  en: {
    topline:
      "Professional ecommerce platform with transparent pricing, verified inventory, and dependable fulfillment.",
    toplineCta: "Explore catalog",
    heroEyebrow: "Organization-ready digital storefront",
    heroTitle:
      "Enterprise-grade ecommerce standards with a clear and conversion-focused experience.",
    heroSubAm:
      "A professional ecommerce interface built for clarity, speed, and control.",
    heroBody:
      "EthioMarket delivers structured product information, reliable availability signals, and a seamless purchase workflow from discovery to checkout.",
    heroPrimary: "Browse Products",
    heroSecondary: "Open Cart",
    metric1Value: "Fast",
    metric1Label: "decision-ready product data",
    metric2Value: "Clear",
    metric2Label: "pricing and stock visibility",
    metric3Value: "Smooth",
    metric3Label: "checkout and fulfillment flow",
    panelLabel: "Platform Highlights",
    panelTitle: "Designed to support informed and confident purchasing decisions.",
    panelBody:
      "The interface emphasizes clarity, responsiveness, and practical actions that reduce friction for both new and returning users.",
    panelItem1: "Dedicated product pages for each listed item",
    panelItem2: "Persistent mini-cart with live quantity updates",
    panelItem3: "Inline checkout validation for critical fields",
    panelCta: "Open Featured Product",
    featuredCta: "View All Products",
    authLoginEyebrow: "Welcome Back",
    authLoginTitle: "Sign in to continue with your account workspace.",
    authLoginBody:
      "Access active carts, review orders, and proceed through checkout efficiently.",
    authLoginPoint1: "Secure sign-in workflow",
    authLoginPoint2: "Persistent cart continuity",
    authLoginPoint3: "Direct checkout access",
    authLoginFormTitle: "Sign In",
    authLoginButton: "Sign In",
    authLoginLinkText: "Need an account?",
    authLoginLinkCta: "Create Account",
    authRegisterEyebrow: "Create Account",
    authRegisterTitle:
      "Create a profile for faster and more consistent checkout.",
    authRegisterBody:
      "Registration enables a structured purchase flow and easier order monitoring.",
    authRegisterPoint1: "Preserve selected products and cart state",
    authRegisterPoint2: "Track active and completed order history",
    authRegisterPoint3: "Access account-based support channels",
    authRegisterFormTitle: "Create Account",
    authRegisterButton: "Create Account",
    authRegisterLinkText: "Already registered?",
    authRegisterLinkCta: "Sign In",
  },
  am: {
    topline:
      "ዘመናዊ የመስመር ላይ ገበያ ልምድ፣ ግልጽ ዋጋ እና የተረጋገጠ የእቃ መረጃ ጋር።",
    toplineCta: "ካታሎጉን ይመልከቱ",
    heroEyebrow: "የተደራጀ ዲጂታል የንግድ መድረክ",
    heroTitle: "በዓለም አቀፍ ደረጃ የተዘጋጀ ግልጽ እና ተግባራዊ የግዢ ተሞክሮ።",
    heroSubAm: "በግልጽ አወቃቀር፣ በፍጥነት እና በታማኝ የመረጃ ድጋፍ የተገነባ ልምድ።",
    heroBody:
      "EthioMarket የእቃ መረጃን በግልጽ ያቀርባል፣ የአቅርቦት ሁኔታን ያሳያል እና ከመምረጥ እስከ ክፍያ ድረስ ሂደቱን ያቀላጥፋል።",
    heroPrimary: "ምርቶችን ይመልከቱ",
    heroSecondary: "ካርት ይክፈቱ",
    metric1Value: "ፈጣን",
    metric1Label: "ውሳኔ የሚያግዝ መረጃ",
    metric2Value: "ግልጽ",
    metric2Label: "ዋጋ እና አቅርቦት",
    metric3Value: "ለስላሳ",
    metric3Label: "የክፍያ እና አቅርቦት ሂደት",
    panelLabel: "ዋና ባህሪያት",
    panelTitle: "በእርግጠኝነት ለመግዛት የሚረዳ አወቃቀር።",
    panelBody:
      "ይህ ቅጥ ግልጽነትን፣ ተስማሚነትን እና አጋማሽ የግዢ እርምጃዎችን ያበረታታል።",
    panelItem1: "ለእያንዳንዱ ምርት የተለየ ገጽ",
    panelItem2: "ተንቀሳቃሽ ሚኒ-ካርት ዝርዝር",
    panelItem3: "በቅጽ ውስጥ የቀጥታ ማረጋገጫ",
    panelCta: "የተመረጠ ምርት ይክፈቱ",
    featuredCta: "ሁሉንም ምርቶች ይመልከቱ",
    authLoginEyebrow: "እንኳን ደህና መጡ",
    authLoginTitle: "ወደ መለያዎ ለመቀጠል ይግቡ።",
    authLoginBody: "ካርት፣ ትዕዛዝ እና ክፍያ ሂደትን በፍጥነት ይድረሱ።",
    authLoginPoint1: "ደህንነቱ የተጠበቀ የመግቢያ ሂደት",
    authLoginPoint2: "የካርት ሁኔታ መጠበቅ",
    authLoginPoint3: "የቀጥታ ክፍያ መድረሻ",
    authLoginFormTitle: "ግባ",
    authLoginButton: "ግባ",
    authLoginLinkText: "መለያ የለዎትም?",
    authLoginLinkCta: "አዲስ መለያ ፍጠር",
    authRegisterEyebrow: "መለያ ፍጠር",
    authRegisterTitle: "ፈጣን እና የተረጋጋ ክፍያ ለማግኘት መለያ ይፍጠሩ።",
    authRegisterBody: "ምዝገባ የተደራጀ የግዢ ሂደት እና ቀላል የትዕዛዝ ክትትል ያግዛል።",
    authRegisterPoint1: "የተመረጡ ምርቶችን እና ካርትን መጠበቅ",
    authRegisterPoint2: "ተግባራዊ እና የተጠናቀቁ ትዕዛዞችን መከታተል",
    authRegisterPoint3: "በመለያ ላይ የተመሰረተ ድጋፍ ማግኘት",
    authRegisterFormTitle: "አዲስ መለያ ፍጠር",
    authRegisterButton: "መለያ ፍጠር",
    authRegisterLinkText: "ቀድሞ ተመዝግበዋል?",
    authRegisterLinkCta: "ግባ",
  },
};

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll("[data-cart-count]");

  badges.forEach((badge) => {
    badge.textContent = String(count);
    badge.style.display = count > 0 ? "inline-flex" : "none";
  });
}

function renderMiniCartPreview() {
  let panel = document.getElementById("mini-cart-preview");
  if (!panel) {
    panel = document.createElement("aside");
    panel.id = "mini-cart-preview";
    panel.className = "mini-cart-preview";
    panel.innerHTML = `
      <button class="mini-cart-toggle" type="button">Cart</button>
      <div class="mini-cart-panel" aria-hidden="true">
        <h4>Cart Preview</h4>
        <div class="mini-cart-items"></div>
        <a href="/frontend/cart.html" class="btn">Open Cart</a>
      </div>
    `;
    document.body.appendChild(panel);

    const toggle = panel.querySelector(".mini-cart-toggle");
    const content = panel.querySelector(".mini-cart-panel");
    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      content.setAttribute("aria-hidden", String(!isOpen));
    });
  }

  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const toggle = panel.querySelector(".mini-cart-toggle");
  const itemsEl = panel.querySelector(".mini-cart-items");

  toggle.textContent = `Cart (${count})`;

  if (cart.length === 0) {
    itemsEl.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  itemsEl.innerHTML = cart
    .slice(0, 3)
    .map(
      (item) =>
        `<div class="mini-cart-item"><span>${item.name}</span><strong>x${item.qty}</strong></div>`
    )
    .join("");
}

function applyTheme() {
  const theme = getTheme();
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

function ensureNavbarTools(navbar) {
  let tools = navbar.querySelector(".navbar-tools");
  if (tools) return tools;

  tools = document.createElement("div");
  tools.className = "navbar-tools";
  navbar.appendChild(tools);
  return tools;
}

function ensureThemeToggle() {
  const navbar = document.querySelector(".navbar");
  if (!navbar || document.getElementById("theme-toggle")) return;
  const tools = ensureNavbarTools(navbar);

  const button = document.createElement("button");
  button.id = "theme-toggle";
  button.className = "theme-toggle";
  button.type = "button";

  button.addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme();
  });

  tools.appendChild(button);
  applyTheme();
}

function applyLanguage() {
  const lang = getLanguage();
  const dict = i18n[lang] || i18n.en;
  const nodes = document.querySelectorAll("[data-i18n]");

  nodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dict[key]) node.textContent = dict[key];
  });

  const switcher = document.getElementById("lang-switch");
  if (switcher) switcher.value = lang;
}

function ensureLanguageSwitcher() {
  const navbar = document.querySelector(".navbar");
  if (!navbar || document.getElementById("lang-switch")) return;
  const tools = ensureNavbarTools(navbar);

  const container = document.createElement("div");
  container.className = "lang-switcher";
  container.innerHTML = `
    <label for="lang-switch">Language</label>
    <select id="lang-switch">
      <option value="en">EN</option>
      <option value="am">AM</option>
    </select>
  `;
  tools.appendChild(container);

  const select = container.querySelector("#lang-switch");
  select.value = getLanguage();
  select.addEventListener("change", (e) => {
    setLanguage(e.target.value);
    applyLanguage();
  });
}

function ensureSiteFooter() {
  if (document.querySelector(".site-footer")) return;

  const footer = document.createElement("footer");
  footer.className = "site-footer auto-footer";
  footer.innerHTML = `
    <div>
      <h4>EthioMarket</h4>
      <p>Professional ecommerce experience with global UI standards.</p>
    </div>
    <div>
      <p>Email: support@ethiomarket.et</p>
      <p>Phone: +251 11 000 0000</p>
    </div>
  `;

  document.body.appendChild(footer);
}

function addToCart(id) {
  const cart = getCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    alert("Product not found");
    return;
  }

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  alert("Product added to cart!");
}

function getStockLabel(product) {
  if (product.stock <= 3) return `Only ${product.stock} left`;
  if (product.stock <= 8) return `${product.stock} in stock`;
  return "Ready to ship";
}

function getStockClass(product) {
  if (product.stock <= 3) return "is-low";
  if (product.stock <= 8) return "is-medium";
  return "is-high";
}

function getProductUrl(id) {
  return `/frontend/product-${id}.html`;
}

function formatCategory(category) {
  if (!category) return "Featured";

  return category.charAt(0).toUpperCase() + category.slice(1);
}

function ensureQuickViewModal() {
  if (document.getElementById("quick-view-modal")) return;

  const modal = document.createElement("div");
  modal.id = "quick-view-modal";
  modal.className = "quick-view-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="quick-view-backdrop" onclick="closeQuickView()"></div>
    <div class="quick-view-dialog" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <button class="quick-view-close" type="button" aria-label="Close quick view" onclick="closeQuickView()">X</button>
      <div id="quick-view-content"></div>
    </div>
  `;

  document.body.appendChild(modal);
}

function openQuickView(id) {
  ensureQuickViewModal();

  const product = products.find((item) => item.id === id);
  const modal = document.getElementById("quick-view-modal");
  const content = document.getElementById("quick-view-content");

  if (!product || !modal || !content) return;

  content.innerHTML = `
    <article class="quick-view-card">
      <img src="${normalizeImagePath(product.image, product.name)}" alt="${product.name}">
      <div class="quick-view-copy">
        <p class="badge">${formatCategory(product.category)}</p>
        <h2 id="quick-view-title">${product.name}</h2>
        <p>${product.blurb || "A practical pick for everyday use."}</p>
        <div class="product-meta">
          <span class="rating-chip">Rated ${product.rating.toFixed(1)}/5</span>
          <span class="stock-chip ${getStockClass(product)}">${getStockLabel(product)}</span>
        </div>
        <p class="price">${product.price} Birr</p>
        <div class="product-button-row">
          <a class="text-link" href="${getProductUrl(product.id)}">Full details</a>
          <button class="btn" type="button" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </article>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeQuickView() {
  const modal = document.getElementById("quick-view-modal");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function bindNavToggle() {
  const toggles = document.querySelectorAll(".nav-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const navbar = toggle.closest(".navbar");
      if (!navbar) return;

      const isOpen = navbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <span class="badge">${formatCategory(product.category)}</span>
      <a class="product-link" href="${getProductUrl(product.id)}">
        <img src="${normalizeImagePath(product.image, product.name)}" alt="${product.name}">
        <h3>${product.name}</h3>
      </a>
      <p class="product-blurb">${product.blurb || "Curated for a clean, fast shopping experience."}</p>
      <div class="product-meta">
        <span class="rating-chip">Rated ${product.rating.toFixed(1)}/5</span>
        <span class="stock-chip ${getStockClass(product)}">${getStockLabel(product)}</span>
      </div>
      <p class="price">${product.price} Birr</p>
      <div class="product-button-row">
        <button class="ghost-btn" type="button" onclick="openQuickView(${product.id})">Quick View</button>
        <button class="btn" type="button" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </article>
  `;
}

function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  container.innerHTML = "";

  products.slice(0, 3).forEach((p) => {
    container.innerHTML += renderProductCard(p);
  });
}

function ensureCategoryOptions() {
  const categoryFilter = document.getElementById("category-filter");
  if (!categoryFilter) return;

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  const existing = new Set(
    Array.from(categoryFilter.options).map((option) => option.value)
  );

  categories.forEach((category) => {
    if (!existing.has(category)) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    }
  });
}

function loadAllProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");

  ensureCategoryOptions();

  const renderProducts = () => {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

    const filtered = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    container.innerHTML = "";

    filtered.forEach((p) => {
      container.innerHTML += renderProductCard(p);
    });

    if (filtered.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
    }
  };

  renderProducts();

  if (searchInput) {
    searchInput.oninput = renderProducts;
  }

  if (categoryFilter) {
    categoryFilter.onchange = renderProducts;
  }
}

function loadSingleProduct() {
  const container = document.getElementById("product-detail-container");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const queryProductId = Number.parseInt(params.get("id"), 10);
  const pageProductId = Number.parseInt(
    container.getAttribute("data-product-id"),
    10
  );
  const productId = Number.isNaN(pageProductId) ? queryProductId : pageProductId;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  const currentIndex = products.findIndex((p) => p.id === product.id);
  const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  const previousLink = previousProduct
    ? `<a href="${getProductUrl(previousProduct.id)}">Previous: ${previousProduct.name}</a>`
    : '<span class="disabled">No previous product</span>';

  const nextLink = nextProduct
    ? `<a href="${getProductUrl(nextProduct.id)}">Next: ${nextProduct.name}</a>`
    : '<span class="disabled">No next product</span>';

  container.innerHTML = `
    <div class="detail-hero detail-${product.category || "electronics"}">
      <p>${formatCategory(product.category)}</p>
      <h3>${product.name}</h3>
      <p>${product.blurb || "Designed for everyday reliability and value."}</p>
    </div>
    <div class="product-detail-card">
      <img src="${normalizeImagePath(product.image, product.name)}" alt="${product.name}">
      <div class="product-info">
        <p class="badge">${formatCategory(product.category)}</p>
        <h2>${product.name}</h2>
        <p>${product.blurb || "This is a high-quality product you will love."}</p>
        <div class="product-meta">
          <span class="rating-chip">Rated ${product.rating.toFixed(1)}/5</span>
          <span class="stock-chip ${getStockClass(product)}">${getStockLabel(product)}</span>
        </div>
        <p class="price">${product.price} Birr</p>
        <div class="product-button-row">
          <button class="ghost-btn" type="button" onclick="openQuickView(${product.id})">Quick View</button>
          <button class="btn" type="button" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
        <div class="detail-nav">
          ${previousLink}
          ${nextLink}
        </div>
      </div>
    </div>
  `;
}

function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!cartItems || !totalEl) return;

  const cart = getCart();
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "0";
    return;
  }

  cartItems.innerHTML = "";

  cart.forEach((item) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${normalizeImagePath(item.image, item.name)}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.price} Birr x ${item.qty}</p>
        </div>
        <div class="cart-item-actions">
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
}

function removeFromCart(id) {
  const updated = getCart().filter((item) => item.id !== id);
  saveCart(updated);
  loadCart();
}

function loadCheckout() {
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");
  if (!summaryItems || !summaryTotal) return;

  const cart = getCart();
  let total = 0;

  summaryItems.innerHTML = "";

  if (cart.length === 0) {
    summaryItems.innerHTML = "<p>Your cart is empty.</p>";
    summaryTotal.textContent = "0";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.qty;

    summaryItems.innerHTML += `
      <div class="summary-item">
        <span>${item.name} x ${item.qty}</span>
        <span>${(item.price * item.qty).toFixed(2)} Birr</span>
      </div>
    `;
  });

  summaryTotal.textContent = total.toFixed(2);
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function isLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

function bindAuthForms() {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;

      const users = getUsers();
      const exists = users.find((u) => u.email === email);

      if (exists) {
        alert("Email already registered");
        return;
      }

      users.push({ name, email, password });
      saveUsers(users);

      alert("Account created successfully!");
      window.location.href = "/frontend/login.html";
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const users = getUsers();
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "/frontend/index.html";
    });
  }
}

function bindCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;
  const steps = document.querySelectorAll(".checkout-step");

  const setStep = (step) => {
    steps.forEach((el) => {
      const current = Number(el.getAttribute("data-step"));
      el.classList.toggle("is-active", current === step);
      el.classList.toggle("is-complete", current < step);
    });
  };

  const addError = (id, message) => {
    const input = document.getElementById(id);
    if (!input) return;
    const errorId = `${id}-error`;
    let errorEl = document.getElementById(errorId);
    if (!errorEl) {
      errorEl = document.createElement("p");
      errorEl.id = errorId;
      errorEl.className = "field-error";
      input.insertAdjacentElement("afterend", errorEl);
    }
    errorEl.textContent = message;
  };

  const clearErrors = () => {
    document.querySelectorAll(".field-error").forEach((el) => el.remove());
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearErrors();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();

    let valid = true;

    if (name.length < 3) {
      addError("name", "Please enter a valid full name.");
      valid = false;
    }

    if (address.length < 6) {
      addError("address", "Please enter a complete delivery address.");
      valid = false;
    }

    if (!/^\+?[0-9\s-]{8,15}$/.test(phone)) {
      addError("phone", "Please enter a valid phone number.");
      valid = false;
    }

    if (!valid) {
      setStep(1);
      return;
    }

    setStep(2);

    const order = {
      name,
      address,
      phone,
      cart: getCart(),
      date: new Date().toISOString(),
    };

    console.log("Order placed:", order);
    alert("Order placed successfully!");
    setStep(3);

    localStorage.removeItem("cart");
    window.location.href = "/frontend/index.html";
  });

  form.addEventListener("input", () => {
    const nameOk = document.getElementById("name").value.trim().length >= 3;
    const addressOk = document.getElementById("address").value.trim().length >= 6;
    const phoneOk = /^\+?[0-9\s-]{8,15}$/.test(
      document.getElementById("phone").value.trim()
    );

    if (nameOk && addressOk && phoneOk) {
      setStep(2);
    } else {
      setStep(1);
    }
  });
}

function updateFromApi() {
  fetch("/api/products")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products from API");
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) return;

      products = data.map((p) => ({
        ...getFallbackProductData(p.id),
        id: p.id,
        name: p.name,
        price: Number(p.price) || 0,
        image: normalizeImagePath(p.image, p.name),
        category: p.category || "general",
        rating: Number(p.rating) || getFallbackProductData(p.id).rating,
        stock: Number(p.stock) || getFallbackProductData(p.id).stock,
        blurb: p.description || "A polished product choice with a better buying experience.",
      }));

      loadFeaturedProducts();
      loadAllProducts();
      loadSingleProduct();
      loadCart();
      loadCheckout();
    })
    .catch(() => {
      // Fallback to local products silently when backend is unavailable.
    });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("checkout.html") && !isLoggedIn()) {
    alert("Please login to continue checkout");
    window.location.href = "/frontend/login.html";
    return;
  }

  loadFeaturedProducts();
  loadAllProducts();
  loadSingleProduct();
  loadCart();
  loadCheckout();
  updateCartBadge();
  renderMiniCartPreview();
  ensureSiteFooter();
  ensureThemeToggle();
  applyTheme();
  ensureLanguageSwitcher();
  applyLanguage();
  ensureQuickViewModal();
  bindNavToggle();
  bindAuthForms();
  bindCheckoutForm();

  updateFromApi();
});

window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
