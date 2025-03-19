// Các biến chứa phần tử giỏ hàng, lớp phủ, và các phần tử hiển thị giỏ hàng
const cart = document.getElementById('cart-summary'); // Phần tử giỏ hàng để hiển thị các sản phẩm trong giỏ
const overlay = document.querySelector('.overlay'); // Lớp phủ để hiển thị giỏ hàng lên trên
const cartItemsContainer = document.getElementById('cart-items'); // Nơi chứa danh sách sản phẩm trong giỏ
const totalPriceElement = document.getElementById('total-price'); // Phần tử hiển thị tổng giá
const cartCountElement = document.getElementById('cart-count'); // Phần tử đếm số lượng sản phẩm trong giỏ
let cartItems = []; // Mảng chứa các sản phẩm trong giỏ
let totalPrice = 0; // Tổng giá trị của giỏ hàng

// Khi tải trang, tải giỏ hàng từ Local Storage (nếu có)
window.onload = function() {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    const savedTotalPrice = localStorage.getItem('totalPrice');

    if (savedCart && savedTotalPrice) {
        cartItems = savedCart;
        totalPrice = parseFloat(savedTotalPrice);
        updateCart(); // Đảm bảo giao diện giỏ hàng được cập nhật với dữ liệu đã lưu
    } else {
        renderCart(); // Hoặc có thể gọi renderCart nếu không có dữ liệu
    }
};


// Thêm sự kiện click cho mỗi biểu tượng sản phẩm để thêm vào giỏ hàng
document.querySelectorAll('.iconproduct').forEach(productIcon => {
    productIcon.addEventListener('click', function () {
        const productElement = productIcon.closest('.item'); // Lấy phần tử cha chứa thông tin sản phẩm
        const productName = productElement.getAttribute('data-name'); // Lấy tên sản phẩm
        const productPrice = parseInt(productElement.getAttribute('data-price')); // Lấy giá sản phẩm
        const productImage = productElement.getAttribute('data-image'); // Lấy hình ảnh sản phẩm

        if (productName && productPrice && productImage) { // Nếu đầy đủ thông tin sản phẩm, thêm vào giỏ hàng
            addToCart(productName, productPrice, productImage);
        }
    });
});

// Hàm thêm sản phẩm vào giỏ hàng và cập nhật tổng giá trị
function addToCart(name, price, image) {
    const existingItemIndex = cartItems.findIndex(item => item.name === name); // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1; // Tăng số lượng nếu sản phẩm đã có
        totalPrice += price; // Cộng giá sản phẩm vào tổng giá trị
    } else {
        cartItems.push({ name, price, image, quantity: 1 }); // Thêm sản phẩm mới nếu chưa có
        totalPrice += price; // Cộng giá sản phẩm vào tổng giá trị
    }

    updateCart(); // Cập nhật giao diện giỏ hàng
    toggleCart(true); // Hiển thị giỏ hàng
}


// Hàm hiển thị giỏ hàng và các sản phẩm bên trong
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Xóa danh sách hiện tại

    // Tạo bảng cho giỏ hàng
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
                <th>Xóa</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');

    cartItems.forEach((item, index) => { // Duyệt qua từng sản phẩm trong giỏ hàng
        const itemRow = document.createElement('tr'); // Tạo hàng cho sản phẩm
        itemRow.innerHTML = `
            <td class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" width="50">
                <span>${item.name}</span>
            </td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-index="${index}">
            </td>
            <td>${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
            <td>
                <button class="remove-btn" data-index="${index}">Xóa</button>
            </td>
        `;
        tbody.appendChild(itemRow); // Thêm hàng sản phẩm vào bảng
    });

    cartItemsContainer.appendChild(table); // Thêm bảng vào container giỏ hàng
    totalPriceElement.innerText = `${totalPrice.toLocaleString('vi-VN')}đ`; // Cập nhật tổng giá trị giỏ hàng

    // Thêm sự kiện xóa sản phẩm cho các nút "Xóa"
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index')); // Lấy chỉ mục sản phẩm
            removeFromCart(index); // Gọi hàm xóa sản phẩm
        });
    });

    // Cập nhật số lượng sản phẩm nếu có thay đổi
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', function () {
            const index = parseInt(this.getAttribute('data-index'));
            const newQuantity = parseInt(this.value);
            updateQuantity(index, newQuantity); // Cập nhật số lượng sản phẩm
        });
    });
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(index, quantity) {
    const item = cartItems[index];
    totalPrice -= item.price * item.quantity; // Trừ tổng giá trị cũ
    item.quantity = quantity; // Cập nhật số lượng
    totalPrice += item.price * item.quantity; // Cộng tổng giá trị mới
    updateCart(); // Cập nhật giao diện giỏ hàng
}

// Hàm xóa sản phẩm khỏi giỏ hàng và cập nhật tổng giá trị
function removeFromCart(index) {
    const removedItem = cartItems[index]; // Lấy sản phẩm để xóa
    if (removedItem.quantity > 1) {
        removedItem.quantity -= 1; // Giảm số lượng nếu vẫn còn
        totalPrice -= removedItem.price; // Trừ giá sản phẩm khỏi tổng giá trị
    } else {
        cartItems.splice(index, 1); // Xóa sản phẩm khỏi mảng nếu số lượng = 1
        totalPrice -= removedItem.price; // Trừ giá sản phẩm khỏi tổng giá trị
    }
    updateCart(); // Cập nhật giao diện giỏ hàng
}


// Hàm cập nhật số lượng sản phẩm hiển thị trên biểu tượng giỏ hàng
function updateCartCount() {
    const itemCount = cartItems.length; // Số lượng sản phẩm trong giỏ hàng
    cartCountElement.innerText = itemCount; // Hiển thị số lượng sản phẩm
    cartCountElement.style.display = itemCount > 0 ? 'inline-block' : 'none'; // Ẩn nếu không có sản phẩm
}

// Hàm cập nhật giao diện và lưu giỏ hàng vào Local Storage
function updateCart() {
    renderCart();
    updateCartCount();

    // Lưu giỏ hàng và tổng giá trị vào Local Storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);
}

// Hàm bật/tắt hiển thị giỏ hàng và lớp phủ
function toggleCart(show) {
    cart.classList.toggle('active', show); // Thêm/xóa lớp "active" vào giỏ hàng
    overlay.classList.toggle('active', show); // Thêm/xóa lớp "active" vào lớp phủ
}

// Sự kiện đóng giỏ hàng khi nhấn nút đóng
document.querySelector('.close-btn').addEventListener('click', () => {
    toggleCart(false); // Tắt hiển thị giỏ hàng
});

// Sự kiện đóng giỏ hàng khi nhấn vào lớp phủ
overlay.addEventListener('click', () => {
    toggleCart(false); // Tắt hiển thị giỏ hàng
});

// Sự kiện mở giỏ hàng khi nhấn vào biểu tượng giỏ hàng
document.querySelector('.cart').addEventListener('click', () => {
    toggleCart(true); // Hiển thị giỏ hàng
});






