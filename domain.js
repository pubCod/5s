const TARGET_DOMAIN = 'https://www.data5s.org/';

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có cấu hình phạm vi không. Nếu không có thì mặc định là document (toàn trang)
    const scopeSelector = window.DOMAIN_IMPORT_SCOPE;
    const root = scopeSelector ? document.querySelector(scopeSelector) : document;

    if (!root) return;

    // Chọn tất cả các thẻ a có đường dẫn tương đối (bắt đầu bằng /) trong phạm vi root
    const links = root.querySelectorAll('a[href^="/"]');
    
    links.forEach(link => {
        const relativePath = link.getAttribute('href');
        // Sử dụng URL constructor để nối domain và path an toàn (tự động xử lý dấu / thừa)
        const absoluteUrl = new URL(relativePath, TARGET_DOMAIN).href;
        link.setAttribute('href', absoluteUrl);
        link.setAttribute('target', '_blank');
    });
});
