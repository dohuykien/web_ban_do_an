// Lấy các phần tử HTML cần thiết
const carouselInner = document.querySelector('.carousel-inner');
const images = document.querySelectorAll('.carousel-inner img');
const nextButton = document.querySelector('.arrow-right');
const prevButton = document.querySelector('.arrow-left');

// Số lượng ảnh hiển thị mỗi lần (8 ảnh: 4 trên, 4 dưới)
const imagesPerBatch = 8;

// Tổng số ảnh
const totalImages = images.length;

// Tính tổng số lô ảnh cần hiển thị
const totalBatches = Math.ceil(totalImages / imagesPerBatch);

// Chỉ số lô ảnh hiện tại (0 là lô đầu tiên)
let currentBatch = 0;

// Hàm cập nhật hiển thị ảnh
function updateCarousel() {
    // Tính toán chỉ số bắt đầu và kết thúc của lô ảnh hiện tại
    const start = currentBatch * imagesPerBatch;
    const end = start + imagesPerBatch;

    // Ẩn tất cả ảnh
    images.forEach((img, index) => {
        img.classList.remove('active'); // Gỡ class active khỏi tất cả ảnh
        img.style.display = 'none'; // Ẩn ảnh

        // Hiển thị chỉ các ảnh thuộc batch hiện tại
        if (index >= start && index < end) {
            img.classList.add('active'); // Thêm class active
            img.style.display = 'block'; // Hiển thị ảnh
        }
    });

    // Cập nhật trạng thái của các nút
    prevButton.disabled = currentBatch === 0;
    nextButton.disabled = currentBatch === totalBatches - 1;
}

// Thêm sự kiện click cho nút "Next"
nextButton.addEventListener('click', () => {
    if (currentBatch < totalBatches - 1) {
        currentBatch++; // Tăng batch hiện tại
        updateCarousel(); // Cập nhật lại carousel
    }
});

// Thêm sự kiện click cho nút "Prev"
prevButton.addEventListener('click', () => {
    if (currentBatch > 0) {
        currentBatch--; // Giảm batch hiện tại
        updateCarousel(); // Cập nhật lại carousel
    }
});

// Khởi động carousel với lô ảnh đầu tiên
updateCarousel();


var registerModal = document.getElementById("registerModal");
var loginModal = document.getElementById("loginModal");

// Get buttons that open the modals
var btnRegister = document.querySelector(".right-menu a:nth-child(1)"); // Đăng ký button
var btnLogin = document.querySelector(".right-menu a:nth-child(3)"); // Đăng nhập button

// Get the <span> element that closes the modals
var closeRegister = document.getElementById("closeRegister");
var closeLogin = document.getElementById("closeLogin");

// Show register modal
btnRegister.onclick = function() {
    registerModal.style.display = "block";
    loginModal.style.display = "none"; // Close login modal if open
}

// Show login modal
btnLogin.onclick = function() {
    loginModal.style.display = "block";
    registerModal.style.display = "none"; // Close register modal if open
}

// Close the register modal
closeRegister.onclick = function() {
    registerModal.style.display = "none";
}

// Close the login modal
closeLogin.onclick = function() {
    loginModal.style.display = "none";
}

// Show login form from register modal
document.getElementById("showLogin").onclick = function() {
    registerModal.style.display = "none";
    loginModal.style.display = "block";
}

// Show register form from login modal
document.getElementById("showRegister").onclick = function() {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}
