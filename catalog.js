// Search product
document.getElementById("search_button").addEventListener("click", buttonClicked);

function buttonClicked() {
    const brand = document.getElementById("brand_input").value.trim();
    const minPrice = parseFloat(document.getElementById("min_price").value);
    const maxPrice = parseFloat(document.getElementById("max_price").value);

    if (!brand) {
        alert('Please enter a brand name');
        return;
    }

    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products from the API');
            }
            return response.json();
        })
        .then(data => {
            // Filter products price
            const filteredProducts = data.filter(product => {
                const price = parseFloat(product.price);
                if (isNaN(price)) return false; 
                return (
                    (isNaN(minPrice) || price >= minPrice) &&
                    (isNaN(maxPrice) || price <= maxPrice)
                );
            });
            renderProducts(filteredProducts);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching products.');
        });
}

// catalog
function renderProducts(products) {
    const place = document.getElementById("place");
    place.innerHTML = ''; 

    if (products.length === 0) {
        place.innerHTML = "<p>No products found for this brand and price range.</p>";
        place.style.display = 'block';
        return;
    }

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        var imageLink = product.image_link || 'Image_not_available.png';
        var rating = product.rating || Math.floor(Math.random() * 5) + 1;
        var stars = generateStarRating(rating);

        productItem.innerHTML = `
            <img src="${imageLink}" alt="${product.name || 'Product Image'}" onerror="this.src='Image_not_available.png';" />
            <p><strong>${product.name}</strong></p>
            <p>Type: ${product.product_type || 'N/A'}</p>
            <p>Price: $${product.price || 'N/A'}</p>
            <div class="stars">${stars}</div>
            <button class="details-button" onclick='viewDetails(${JSON.stringify(product)})'>View Details</button>
        `;

        place.appendChild(productItem);
    });

    place.style.display = 'flex';
}

// Generate star rating 
function generateStarRating(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= rating ? '<span class="star filled">★</span>' : '<span class="star">☆</span>';
    }
    return starsHTML;
}

// Save product to local storage and navigate to detail page
function viewDetails(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'detail.html';
}

window.addEventListener('scroll', function () {
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

// Load products based on brand name from URL parameters
function loadProductsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');
    if (brand) {
        document.getElementById("brand_input").value = brand; 
        buttonClicked(); 
    }
}

window.onload = loadProductsFromURL; 
