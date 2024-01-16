//Navigation bar Code
function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
}

//Navigation Bar Scroll Code
function redirect(target) {
    window.location.href = "../index.html"+target;
}

//Automatic Swiping
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper
    var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            autoplay: {
            delay: 3000, // 3 seconds
            disableOnInteraction: false,
            },
        });
});