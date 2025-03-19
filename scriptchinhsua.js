document.querySelector('.toggle-button').addEventListener('click', function() {
    const content = document.querySelector('.collapsible-content');
    const isHidden = content.style.display === 'none' || content.style.display === '';

    // Toggle display
    content.style.display = isHidden ? 'block' : 'none';

    // Toggle arrow direction
    this.textContent = isHidden ? '▲' : '▼';
});
    document.querySelectorAll('.quantity-control').forEach(control => {
        const quantityDisplay = control.querySelector('.quantity');
        let quantity = 0;

        control.querySelector('.increase').addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });

        control.querySelector('.decrease').addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
    });

// Hàm lấy dữ liệu giỏ hàng và hiển thị
function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log(cartItems);
    let cartContainer = document.getElementById("cart-items-container");
    let totalPrice = 0;

    cartContainer.innerHTML = ""; // Xóa nội dung cũ

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng trống</p>";
        document.getElementById("total-price").innerText = "0đ";
        return;
    }

    // Hiển thị các sản phẩm trong giỏ hàng
    cartItems.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('div'); // Tạo phần tử chứa thông tin sản phẩm
        cartContainer.classList.add('product-section');
        cartContainer.innerHTML += `
            <span class="package-name">${item.name}</span>
            <span class="package-price">${item.price.toLocaleString('vi-VN')}đ</span>
        `;
        cartItemsContainer.appendChild(itemElement); // Thêm sản phẩm vào container

    });

    // Hiển thị tổng giá trong mục tổng đơn hàng
    document.getElementById("total-price").innerText = `${totalPrice.toLocaleString()}đ`;
}

// Gọi hàm khi trang tải
document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
});