// Biến tên miền cần import
const TARGET_DOMAIN = 'https://www.data5s.org/';

// Lấy scope từ attribute của thẻ script (nếu có)
const currentScript = document.currentScript;
const scriptScope = currentScript ? currentScript.getAttribute('data-scope') : null;

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có cấu hình phạm vi không (ưu tiên biến global, sau đó đến attribute)
    // Nếu không có thì mặc định là document (toàn trang)
    const scopeSelector = window.DOMAIN_IMPORT_SCOPE || scriptScope;
    // Hỗ trợ nhiều selector (ví dụ: '.post-body, .localButtonWrap') hoặc mặc định là document
    const roots = scopeSelector ? document.querySelectorAll(scopeSelector) : [document];

    if (roots.length === 0) return;

    roots.forEach(root => {
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
});
