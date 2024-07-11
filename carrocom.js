const products = [
    { id: 1, name: 'Producto 1', detail: 'Detalle del producto 1', price: 10, stock: 5 },
    { id: 2, name: 'Producto 2', detail: 'Detalle del producto 2', price: 20, stock: 3 },
    { id: 3, name: 'Producto 3', detail: 'Detalle del producto 3', price: 15, stock: 0 },
    { id: 1, name: 'Producto 4', detail: 'Detalle del producto 4', price: 10, stock: 5 },
    { id: 2, name: 'Producto 5', detail: 'Detalle del producto 5', price: 20, stock: 1 }
    
];

let cart = [];

function displayProducts() {
    const productsDiv = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.detail}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: <span id="stock-${product.id}">${product.stock}</span></p>
            <button onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
        }
        product.stock--;
        updateDisplay();
    }
}

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex > -1) {
        const cartItem = cart[cartItemIndex];
        const product = products.find(p => p.id === productId);
        product.stock++;
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart.splice(cartItemIndex, 1);
        }
        updateDisplay();
    }
}

function emptyCart() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        product.stock += item.quantity;
    });
    cart = [];
    updateDisplay();
}

function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.classList.toggle('hidden');
}

function updateDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h4>${item.name}</h4>
            <p>Precio: $${item.price}</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Total: $${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Eliminar uno</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-amount').textContent = totalAmount;

    products.forEach(product => {
        const stockSpan = document.getElementById(`stock-${product.id}`);
        stockSpan.textContent = product.stock;
        const button = stockSpan.nextElementSibling;
        button.disabled = product.stock === 0;
        button.textContent = product.stock === 0 ? 'Agotado' : 'Agregar al carrito';
    });
}

window.onload = displayProducts;