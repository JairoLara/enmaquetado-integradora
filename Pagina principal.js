const products = [
    { id: 1, name: 'Producto 1', detail: 'Detalle del producto 1', price: 25, stock: 5 },
    { id: 2, name: 'Producto 2', detail: 'Detalle del producto 2', price: 25, stock: 3 },
    { id: 3, name: 'Producto 3', detail: 'Detalle del producto 3', price: 25, stock: 0 },
    { id: 4, name: 'Producto 4', detail: 'Detalle del producto 4', price: 25, stock: 5 }
];

let newProducts = [
    { id: 5, name: 'Nuevo Producto 1', detail: 'Detalle del nuevo producto 1', price: 60, stock: 2 },
    { id: 6, name: 'Nuevo Producto 2', detail: 'Detalle del nuevo producto 2', price: 120, stock: 4 },
    { id: 7, name: 'Nuevo Producto 3', detail: 'Detalle del nuevo producto 3', price: 150, stock: 1 }
];

let cart = [];

function displayProducts() {
    const productsDiv = document.getElementById('products');
    products.forEach(product => {
        const productDiv = createProductElement(product);
        productsDiv.appendChild(productDiv);
    });
}

function displayNewProducts() {
    const productsDiv2 = document.getElementById('products2');
    newProducts.forEach(product => {
        const productDiv = createProductElement(product);
        productsDiv2.appendChild(productDiv);
    });
}

function createProductElement(product) {
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
    return productDiv;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId) || newProducts.find(p => p.id === productId);
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
        let product = products.find(p => p.id === productId) || newProducts.find(p => p.id === productId);
        
        if (product) {
            product.stock++;
            
            // Verificar si el stock del producto estaba en cero antes de incrementarlo
            if (product.stock === 1) {
                const stockSpan = document.getElementById(`stock-${product.id}`);
                const button = stockSpan.nextElementSibling;
                button.disabled = false;
                button.textContent = 'Agregar al carrito';
            }
            
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                cart.splice(cartItemIndex, 1);
            }
            
            // Actualizar el display después de modificar el carrito y el stock
            updateDisplay();
        }
    }
}

function emptyCart() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id) || newProducts.find(p => p.id === item.id);
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
            <button onclick="removeFromCart(${item.id})">-</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-amount').textContent = totalAmount;

    // Actualización del stock y estado de los botones de "Agregar al carrito" para productos originales
    products.forEach(product => {
        const stockSpan = document.getElementById(`stock-${product.id}`);
        if (stockSpan) {
            stockSpan.textContent = product.stock;
            const button = stockSpan.nextElementSibling;
            button.disabled = product.stock === 0;
            button.textContent = product.stock === 0 ? 'Agotado' : 'Agregar al carrito';
        }
    });

    // Actualización del stock y estado de los botones de "Agregar al carrito" para nuevos productos
    newProducts.forEach(product => {
        const stockSpan = document.getElementById(`stock-${product.id}`);
        if (stockSpan) {
            stockSpan.textContent = product.stock;
            const button = stockSpan.nextElementSibling;
            button.disabled = product.stock === 0;
            button.textContent = product.stock === 0 ? 'Agotado' : 'Agregar al carrito';
        }
    });
}

// Llama a las funciones para mostrar los productos al cargar la página
window.onload = function() {
    displayProducts();
    displayNewProducts();
};

// catalogo //
function toggleCatalogo() {
    const catalogoOptions = document.getElementById('catalogo-options');
    catalogoOptions.classList.toggle('hidden');
}

function selectOption(option) {
    // Aquí puedes manejar la lógica cuando se selecciona una opción
    console.log('Opción seleccionada:', option);
    // Por ejemplo, puedes redirigir a una página de productos específica
    // o ejecutar otras funciones relacionadas con la opción seleccionada.
}