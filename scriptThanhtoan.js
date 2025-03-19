
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
            <div class="product-info">
                <img src="${item.image}" alt="${item.name}">
                <span class="product-name">${item.name}</span>
            </div>
            <span class="product-price">${item.price.toLocaleString('vi-VN')}đ</span>
            <div class="product-quantity">${item.quantity}</div>
            <span class="product-total">${itemTotal.toLocaleString('vi-VN')}đ</span>
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


document.addEventListener("DOMContentLoaded", function () {
    // Tải địa chỉ từ localStorage
    const savedAddress = localStorage.getItem("selectedAddress");
    if (savedAddress) {
        document.getElementById("address-display").innerText = savedAddress;
    } else {
        document.getElementById("address-display").innerText = "Bạn vui lòng nhập địa chỉ để chúng tôi giao hàng cho bạn.";
    }

    // Gọi hàm loadCartItems để hiển thị sản phẩm trong giỏ hàng
    loadCartItems();
});



function saveDeliveryInfo() {
    // Lấy thông tin địa chỉ đã chọn
    const selectedAddress = localStorage.getItem("selectedAddress");
    // Lấy thời gian giao hàng từ select box
    const deliveryTime = document.getElementById('deliveryTime').value;

    // Lưu thông tin vào localStorage
    if (selectedAddress) {
        localStorage.setItem("deliveryAddress", selectedAddress);
    } else {
        console.error("No delivery address found in localStorage.");
    }

    if (deliveryTime) {
        localStorage.setItem("deliveryTime", deliveryTime);
    } else {
        console.error("No delivery time selected.");
    }
}

// Thêm sự kiện cho nút "Tiếp theo"
document.querySelector('.next-button').addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
    saveDeliveryInfo(); // Gọi hàm lưu thông tin
    window.location.href = "{{ url_for('xac_nhan') }}"; // Chuyển đến trang xác nhận
});

