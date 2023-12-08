
// Global variables for cart and selected products
let cartItems = [];
let selectedProducts = [];

// Fetch products from the API and display on the dashboard
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            selectedProducts = data;
            displayProducts();
        })
        .catch(error => console.log(error));
}

// Display products on the dashboard
function displayProducts() {
    const productList = document.getElementById('productList');

    selectedProducts.forEach(product => {
        const productElement = document.createElement('div')
        productElement.classList.add('product')
        productElement.innerHTML = `
            <img src="${product.image}" alt="image of the product">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Buy</button>`
        productList.appendChild(productElement)
    })
}

// Add product to the cart
function addToCart(productId) {
    const productToAdd = selectedProducts.find(product => product.id === productId);
    if (productToAdd) {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ ...productToAdd, quantity: 1 });
        }
        updateCartItemCount();
    }
}

// Update cart item count in the navbar
function updateCartItemCount() {
    const cartItemCount = document.getElementById('cartItemCount');
    if (cartItemCount) {
        cartItemCount.textContent = cartItems.length;
    }
}

// Open user logout popup
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Logout user and redirect to homepage
function logout() {
    // Perform logout actions here
    window.location.href = 'index.html'; // Redirect to homepage after logout
}

// Load products on page load
window.onload = function() {
    fetchProducts();
};


// Global variable for cart items


// Function to load cart items and display on the checkout page
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>${item.title}</div>
            <div>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <div>$${item.price * item.quantity}</div>
            <button onclick="removeItem(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    loadCartItems();
}

// Function to decrease quantity
function decreaseQuantity(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        loadCartItems();
    }
}

// Function to increase quantity
function increaseQuantity(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity++;
        loadCartItems();
    }
}

// Function to simulate checkout
function checkout() {
    // Perform checkout actions here
    document.getElementById('orderPlacedMessage').style.display = 'block';
    cartItems = []; // Empty the cart after checkout
    loadCartItems(); // Update the cart display
    setTimeout(() => {
        document.getElementById('orderPlacedMessage').style.display = 'none';
        window.location.href = 'dashboard.html'; // Redirect to Dashboard after checkout
    }, 2000); // Redirect after 2 seconds (simulating a delay for message display)
}

// Load cart items on page load
window.onload = function() {
    // Mock data for cart items
    
    loadCartItems();
};

