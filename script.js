// 数字递增动画
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 动画持续2秒
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 监听滚动，实现渐入效果
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            }
        }
    });
});

// 为所有需要动画的元素添加观察器
document.querySelectorAll('.counter, .fade-in').forEach(el => {
    observer.observe(el);
});

// 二维码功能
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('qrModal');
    const btn = document.getElementById('showQRCode');
    const span = document.getElementsByClassName('close')[0];
    const pageUrl = document.getElementById('pageUrl');
    
    // 获取当前页面完整URL
    const currentUrl = window.location.href;
    
    // 生成二维码
    const qrcode = new QRCode(document.getElementById('qrcode'), {
        text: currentUrl,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    
    // 显示当前URL
    pageUrl.value = currentUrl;
    
    // 如果是本地文件系统，显示提示
    if (currentUrl.startsWith('file://')) {
        const warning = document.createElement('p');
        warning.style.color = 'red';
        warning.textContent = '请注意：需要将网站部署到服务器才能使用二维码功能';
        document.querySelector('.modal-content').insertBefore(warning, document.getElementById('qrcode'));
    }
    
    // 点击按钮打开模态框
    btn.onclick = function() {
        modal.style.display = 'block';
    }
    
    // 点击 × 关闭模态框
    span.onclick = function() {
        modal.style.display = 'none';
    }
    
    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // 点击复制链接
    pageUrl.onclick = function() {
        this.select();
        document.execCommand('copy');
        alert('链接已复制到剪贴板！');
    }

    // 防止微信二维码点击事件冒泡
    const wechatQR = document.querySelector('.wechat-qr');
    if (wechatQR) {
        wechatQR.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}); 