// Mở form thêm địa chỉ
function openAddressForm() {
    const form = document.getElementById("addressForm");
    form.style.display = "flex";
    setTimeout(() => form.classList.add("active"), 10); // Đảm bảo hiệu ứng transition
}

// Đóng form thêm địa chỉ
function closeAddressForm() {
    const form = document.getElementById("addressForm");
    form.classList.remove("active");
    setTimeout(() => form.style.display = "none", 300); // Đợi hiệu ứng trước khi ẩn
}

// Thêm địa chỉ mới
function addNewAddress() {
    const fullname = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.getElementById("gender").value;
    const district = document.getElementById("district").value;
    const ward = document.getElementById("ward").value.trim();
    const address = document.getElementById("address").value.trim();
    const defaultAddress = document.getElementById("default").checked;

    if (!fullname || !phone || !ward || !address) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Tạo đối tượng địa chỉ mới
    const newAddress = {
        fullname: fullname,
        phone: phone,
        gender: gender,
        district: district,
        ward: ward,
        address: address,
        defaultAddress: defaultAddress
    };

    // Lấy danh sách địa chỉ từ localStorage
    let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    addresses.push(newAddress);

    // Lưu danh sách địa chỉ vào localStorage
    localStorage.setItem("addresses", JSON.stringify(addresses));

    // Hiển thị lại danh sách địa chỉ
    renderAddresses();

    // Đóng form và reset các giá trị
    closeAddressForm();
    document.getElementById("addressFormContent").reset();
}

// Hiển thị danh sách địa chỉ từ localStorage
function renderAddresses() {
    const addressContainer = document.querySelector(".address-options");
    addressContainer.innerHTML = ""; // Xóa các địa chỉ cũ

    // Lấy danh sách địa chỉ từ localStorage
    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];

    addresses.forEach((address) => {
        const addressLabel = document.createElement("label");
        addressLabel.innerHTML = `
            <input type="radio" name="delivery-address">
            <span class="name-phone">${address.fullname} ${address.phone}:</span>
            <span class="address-details">${address.address}, ${address.ward}, ${address.district}</span>
        `;
        addressContainer.appendChild(addressLabel);
    });
}

// Lưu địa chỉ đã chọn
function saveSelectedAddress() {
    const selectedAddress = document.querySelector('input[name="delivery-address"]:checked');
    if (selectedAddress) {
        const addressDetails = selectedAddress.nextElementSibling.nextElementSibling.innerText;
        localStorage.setItem("selectedAddress", addressDetails);
    }
}

// Tự động chọn địa chỉ mặc định khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    renderAddresses();

    const savedAddress = localStorage.getItem("selectedAddress");
    if (savedAddress) {
        const addresses = document.querySelectorAll('.address-options input[name="delivery-address"]');
        addresses.forEach((input) => {
            if (input.nextElementSibling.nextElementSibling.innerText === savedAddress) {
                input.checked = true;
            }
        });
    }
});

// Thêm sự kiện để lưu địa chỉ khi nhấn "Hoàn Thành"
document.querySelector('.complete-btn').addEventListener("click", saveSelectedAddress);
