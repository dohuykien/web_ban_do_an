function toggleContent(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');
    const allContents = document.querySelectorAll('.faq-content'); // Lấy tất cả các phần nội dung

    // Đóng tất cả các phần nội dung khác
    allContents.forEach((item) => {
        if (item !== content) {
            item.style.maxHeight = null; // Đặt chiều cao tối đa là null
            item.previousElementSibling.querySelector('.toggle-icon').textContent = "+"; // Đổi biểu tượng thành "+"
        }
    });

    // Mở hoặc thu gọn phần nội dung hiện tại
    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Thu gọn lại
        icon.textContent = "+"; // Đổi biểu tượng thành "+"
    } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Mở rộng ra với chiều cao tự động
        icon.textContent = "-"; // Đổi biểu tượng thành "-"
    }
}