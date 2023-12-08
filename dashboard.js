function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data)
        })
}


function displayProducts(products) {
    const productList = document.getElementById('productList')
    products.forEach(product => {
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


function addToCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart'))||[] 
      cartItems.push(productId)
    localStorage.setItem('cart', JSON.stringify(cartItems))
    updateCartItemCount()
}

function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart'))||[]
    const cartItemCount = document.getElementById('cartItemCount')
    cartItemCount.textContent = cartItems.length;
}

function logout() {
    window.location.href = 'index.html';
}

function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

window.onload = function() {
    fetchProducts();
    updateCartItemCount();
};
