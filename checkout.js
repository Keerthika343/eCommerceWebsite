function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart'))|| [];
    const cartItemCount = {}
    for (let i = 0; i < cartItems.length; i++) {
        let productId = cartItems[i];
        if (cartItemCount[productId]) {
            cartItemCount[productId]++;
            console.log(cartItemCount)
        } else {
            cartItemCount[productId] = 1
        }
    }
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''
    let totalPrice = 0;

    cartItems.forEach(productId => {
        // Fetch product details using product ID from the API
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                <img src="${product.image}" alt="image of the product">
                <h3>${product.title}</h3>
                    <div>
                        <button onclick="decreaseQuantity(${product.id})">-</button>
                        <span id="count">${cartItemCount[productId]}</span>
                        <button onclick="increaseQuantity(${product.id})">+</button>
                        <button onclick="removeItem(${product.id})">Remove</button>
                    </div>
                    <div>$${(product.price * cartItemCount[productId])}</div>
                `;
                cartItemsContainer.appendChild(cartItem)

                totalPrice += product.price * cartItemCount[productId]
                document.getElementById('totalPrice').textContent = `$${totalPrice}`
            })

    })
}

function increaseQuantity(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || []
    cartItems.push(productId)
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems()
    
}

function decreaseQuantity(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.indexOf(productId);
    if (index !== -1) {
        cartItems.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems()
    }
}

function removeItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.indexOf(productId);
    if (index !== -1) {
        cartItems.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems()
    }
}

function checkout() {
    const orderPlacedMessage = document.getElementById('orderPlacedMessage');
    orderPlacedMessage.style.display = 'block';
    localStorage.removeItem('cart');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

function logout() {
    window.location.href = 'index.html';
}
function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

window.onload = function () {
    displayCartItems()
}



