let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    image: "../images/headphones.png",
  },
  {
    id: 2,
    name: "Digital Watch",
    price: 29.99,
    image: "../images/watches.png",
  },
  {
    id: 3,
    name: "Stylish Backpack",
    price: 39.99,
    image: "../images/backpack.png",
  },
  {
    id: 4,
    name: "Smartphone",
    price: 199.99,
    image: "../images/power%20bank.png" /* using existing PNG as placeholder */,
  },
  {
    id: 5,
    name: "Sneakers",
    price: 59.99,
    image:
      "../images/headphones.png" /* placeholder until sneakers PNG provided */,
  },
];

// Display featured products on homepage
function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return; // Skip if not on the homepage

  products.slice(0, 3).forEach((p) => {
    const imgSrc = p.image || generatePlaceholderImage(p.name);
    const card = `
            <div class="product-card">
                <img src="${imgSrc}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price} Birr</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    container.innerHTML += card;
  });
}

// Add to cart (stores items in localStorage)
function addToCart(id) {
  const cart = getCart();
  const product =
    products.find((p) => p.id === id) || allProducts.find((p) => p.id === id);
  if (!product) return alert("Product not found");

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  alert("Product added to cart!");
}

// Sample product data (replace with backend later)
const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    image: "../images/headphones.png",
  },
  {
    id: 2,
    name: "Digital Watch",
    price: 29.99,
    image: "../images/watches.png",
  },
  {
    id: 3,
    name: "Stylish Backpack",
    price: 39.99,
    image: "../images/backpack.png",
  },
  {
    id: 4,
    name: "Smartphone",
    price: 199.99,
    image: "../images/power%20bank.png",
  },
  {
    id: 5,
    name: "Sneakers",
    price: 59.99,
    image:
      "../images/headphones.png" /* placeholder until sneakers PNG provided */,
  },
];

// Function to load all products
// Note: loadAllProducts (with search/filter support) is defined further down. We
// keep that implementation and remove this simpler duplicate to avoid conflicts.

// Wait until DOM loads, then try to render the UI
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedProducts();
  loadAllProducts();
  // Try to load cart if on cart page
  loadCart();
});
function loadAllProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");

  function renderProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

    container.innerHTML = "";

    const filtered = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.forEach((p) => {
      const card = `
                <div class="product-card">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price} Birr</p>
                    <button onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            `;
      container.innerHTML += card;
    });

    if (filtered.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
    }
  }

  // Render products on page load
  renderProducts();

  // Update products when search or category changes (guard in case inputs are missing)
  if (searchInput) searchInput.addEventListener("input", renderProducts);
  if (categoryFilter) categoryFilter.addEventListener("change", renderProducts);
}

// Load products if on products.html
loadAllProducts();

// removed stray `card` template that referenced undefined `p`
function loadSingleProduct() {
  const container = document.getElementById("product-detail-container");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  const product = products.find((p) => p.id === productId);

  if (!product) {
    container.innerHTML = "<p>Product not found</p>";
    return;
  }

  container.innerHTML = `
        <div class="product-detail-card">
        <img src="${
          product.image || generatePlaceholderImage(product.name)
        }" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>This is a high-quality product you will love.</p>
                <p class="price">${product.price} Birr</p>
                <button class="btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Load product page
loadSingleProduct();
// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(id) {
  const cart = getCart();
  const product = products.find((p) => p.id === id);

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  alert("Product added to cart!");
}
function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!cartItems || !totalEl) return;

  const cart = getCart();
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.innerText = "0";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.qty;

    const imgSrc = item.image || generatePlaceholderImage(item.name);

    cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${imgSrc}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.price} Birr × ${item.qty}</p>
          </div>
          <div class="cart-item-actions">
            <button onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      `;
  });

  totalEl.innerText = total.toFixed(2);
}
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);
  loadCart();
}
function loadCheckout() {
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");
  if (!summaryItems || !summaryTotal) return;

  const cart = getCart();
  let total = 0;
  summaryItems.innerHTML = "";

  cart.forEach((item) => {
    total += item.price * item.qty;

    summaryItems.innerHTML += `
            <div class="summary-item">
                <span>${item.name} × ${item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)} Birr</span>
            </div>
        `;
  });

  summaryTotal.innerText = total.toFixed(2);
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  loadCheckout();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const order = {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      phone: document.getElementById("phone").value,
      cart: getCart(),
      date: new Date().toISOString(),
    };

    // Generate a simple PNG data URL placeholder for products without images
    function generatePlaceholderImage(text) {
      // Create a small canvas-based placeholder with the product name
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

    console.log("Order placed:", order);

    alert("Order placed successfully!");

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to home
    window.location.href = "index.html";
  });
});
const wrapper = document.querySelector(".wrapper");
const signUpLink = document.querySelector(".signUp-link");
const signInLink = document.querySelector(".signIn-link");

if (wrapper && signUpLink && signInLink) {
  signUpLink.addEventListener("click", () => {
    wrapper.classList.add("animate-signIn");
    wrapper.classList.remove("animate-signUp");
  });

  signInLink.addEventListener("click", () => {
    wrapper.classList.add("animate-signUp");
    wrapper.classList.remove("animate-signIn");
  });
}
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

document.addEventListener("DOMContentLoaded", () => {
  // REGISTER
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
      window.location.href = "login.html";
    });
  }

  // LOGIN
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

      window.location.href = "index.html";
    });
  }
});
// Fetch products from API (if available) and re-render
fetch("http://localhost:5000/api/products")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    displayProducts();
  })
  .catch((err) => console.error(err));

function displayProducts() {
  // Re-render current views after updating `products` data
  loadFeaturedProducts();
  loadAllProducts();
}

function isLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

document.addEventListener("DOMContentLoaded", () => {
  // 🔐 Protect checkout page and load checkout summary when applicable
  if (window.location.pathname.endsWith("checkout.html")) {
    if (!isLoggedIn()) {
      alert("Please login to continue checkout");
      window.location.href = "login.html";
      return;
    }

    // Load checkout summary if allowed
    loadCheckout();
  }
});
