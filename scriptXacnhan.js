// Hàm lấy dữ liệu giỏ hàng và hiển thị
function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
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
            <span class="order-label-product">${item.name}</span>
            <span class="order-label-price">${item.price.toLocaleString('vi-VN')}đ</span>
            <div class="order-label-quantity">${item.quantity}</div>
            <span class="order-value ">${itemTotal.toLocaleString('vi-VN')}đ</span>

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

function confirmOrder() {
    // Reset giỏ hàng
    localStorage.removeItem("cartItems");

    // Chuyển hướng đến trang xác nhận thanh toán
    window.location.href = "xacnhanthanhtoan";
}




function displayConfirmationInfo() {
    const selectedAddress = localStorage.getItem("deliveryAddress");
    const deliveryTime = localStorage.getItem("deliveryTime");

    // Kiểm tra xem các giá trị có tồn tại không
    if (!selectedAddress) {
        console.error("No delivery address found in localStorage.");
    } else {
        console.log("Delivery address:", selectedAddress); // Ghi log địa chỉ
    }

    if (!deliveryTime) {
        console.error("No delivery time found in localStorage.");
    } else {
        console.log("Delivery time:", deliveryTime); // Ghi log thời gian
    }

    // Nếu không có địa chỉ hoặc thời gian, dừng lại
    if (!selectedAddress || !deliveryTime) {
        return;
    }

    const addressParts = selectedAddress.split(", "); // Phân tách thông tin
    const fullname = addressParts[0]; // Tên người nhận
    const phone = addressParts[1]; // Số điện thoại
    const address = addressParts[2]; // Địa chỉ
    const district = addressParts[3]; // Quận

    // Cập nhật nội dung trong div confirmation
    document.querySelector(".confirmation p:nth-child(1)").innerText = `Hi ${fullname}`;
    document.querySelector(".confirmation li:nth-child(2)").innerText = `Tên: ${fullname}`;
    document.querySelector(".confirmation li:nth-child(3)").innerText = `Số điện thoại: ${phone}`;
    document.querySelector(".confirmation li:nth-child(4)").innerText = `Địa chỉ giao hàng: ${address}`;
    document.querySelector(".confirmation li:nth-child(5)").innerText = `Quận: ${district}`;
    document.querySelector(".confirmation li:nth-child(6)").innerText = `Thời gian giao hàng: ${deliveryTime}`;
}

document.addEventListener("DOMContentLoaded", displayConfirmationInfo);
