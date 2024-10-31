window.addEventListener('scroll', function() {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function toggleMenu() {
    const menu = document.querySelector('.menu-items');
    menu.classList.toggle('show');
}

function searchBrand() {
    const brand = document.getElementById('brand_input').value;
    if (brand) {
        // Redirect to catalog.html with the brand query
        window.location.href = `catalog.html?brand=${encodeURIComponent(brand)}`;
    } else {
        alert('Please enter a brand name');
    }
}