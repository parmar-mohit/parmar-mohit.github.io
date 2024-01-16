//Navigation bar Code
function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
}

//Navigation Bar Scroll Code
function redirect(target) {
    window.location.href = "../index.html"+target;
}