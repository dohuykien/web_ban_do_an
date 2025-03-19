// Cart toggle
const cart = document.getElementById('cart-summary');
const overlay = document.querySelector('.overlay');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
let totalPrice = 0;
let cartItems = [];

// Event listener for each "Thêm vào giỏ" button
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            // If not logged in, show login modal (you need to implement the login modal separately)
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        } else {
            // If logged in, add product to cart
            const productElement = this.closest('.item');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseInt(productElement.getAttribute('data-price'));
            const productImage = productElement.getAttribute('data-image');

            // Add product to cart
            addToCart(productName, productPrice, productImage);
        }
    });
});

// Add item to cart
function addToCart(name, price, image) {
    cartItems.push({ name, price, image });
    totalPrice += price;
    renderCart();
    toggleCart(true);  // Show cart when an item is added
}

// Render cart items
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Clear the container
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" width="50">
                <span>${item.name}</span>
            </div>
            <span>${item.price.toLocaleString('vi-VN')}đ</span>
            <button class="remove-btn" data-index="${index}">Xóa</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update total price
    totalPriceElement.innerText = `${totalPrice.toLocaleString('vi-VN')}đ`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromCart(index);
        });
    });
}

// Remove item from cart
function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    totalPrice -= removedItem.price;
    renderCart();
}

// Toggle cart visibility
function toggleCart(show) {
    if (show) {
        cart.classList.add('active');
        overlay.classList.add('active');
    } else {
        cart.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Close cart on button click
document.querySelector('.close-btn').addEventListener('click', () => {
    toggleCart(false);
});

// Clicking on overlay should also close the cart
overlay.addEventListener('click', () => {
    toggleCart(false);
});
