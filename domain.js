// Biến tên miền cần import
const TARGET_DOMAIN = 'https://www.data5s.org/';

document.addEventListener('DOMContentLoaded', function() {
    // Chọn tất cả các thẻ a có đường dẫn tương đối (bắt đầu bằng /)
    const links = document.querySelectorAll('a[href^="/"]');
    
    links.forEach(link => {
        const relativePath = link.getAttribute('href');
        // Sử dụng URL constructor để nối domain và path an toàn (tự động xử lý dấu / thừa)
        const absoluteUrl = new URL(relativePath, TARGET_DOMAIN).href;
        link.setAttribute('href', absoluteUrl);
    });
});
