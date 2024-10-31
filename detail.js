// Fetch the selected product from local storage
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

var productImg = document.getElementById("product-img");
var productName = document.getElementById("product-name");
var productBrand = document.getElementById("product-brand");
var productPrice = document.getElementById("product-price");
var productType = document.getElementById("product-type");
var productDescription = document.getElementById("product-description");
var starRating = document.getElementById("star-rating");
var productLink = document.getElementById("product-link");
var websiteLink = document.getElementById("website-link");

if (selectedProduct) {
    productImg.src = selectedProduct.image_link || 'Image_not_available.png';
    productImg.alt = selectedProduct.name || 'Product Image';
    productImg.onerror = () => { productImg.src = 'Image_not_available.png'; }; // Fallback if image fails to load

    productName.textContent = selectedProduct.name || 'Product Name';
    productBrand.innerHTML = `<strong>Brand:</strong> ${selectedProduct.brand || 'N/A'}`;
    productPrice.innerHTML = `<strong>Price:</strong> $${selectedProduct.price || 'N/A'}`;
    productType.innerHTML = `<strong>Type:</strong> ${selectedProduct.product_type || 'N/A'}`;
    productDescription.innerHTML = `<strong>Description:</strong> ${selectedProduct.description || 'No description available.'}`;

    // Generate and display star rating
    const rating = selectedProduct.rating || Math.floor(Math.random() * 5) + 1;
    starRating.innerHTML = generateStarRating(rating);

    // Links to product and website
    productLink.href = selectedProduct.product_link || '#';
    websiteLink.href = selectedProduct.website_link || '#';
} else {
    console.error("No product data found.");
}

// Star rating 
function generateStarRating(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= rating ? '<span class="star filled">★</span>' : '<span class="star">☆</span>';
    }
    return starsHTML;
}

// Back button
document.getElementById("back-button").addEventListener("click", () => {
    window.history.back();
});

// Load wishlist lists into dropdown
function loadWishlistOptions() {
    const wishlistSelect = document.getElementById("wishlist-select");
    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};

    wishlistSelect.innerHTML = '<option value="" disabled selected>Select a wishlist</option>';
    for (const listName in wishlistData) {
        const option = document.createElement("option");
        option.value = listName;
        option.textContent = listName;
        wishlistSelect.appendChild(option);
    }
}


loadWishlistOptions();

// Add to wishlist
const wishlistButton = document.getElementById("add-to-wishlist");
wishlistButton.addEventListener("click", () => {
    const selectedList = document.getElementById("wishlist-select").value;
    if (!selectedList) {
        alert("Please select a wishlist.");
        return;
    }

    const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || {};
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!wishlistData[selectedList]) {
        alert("Selected wishlist does not exist.");
        return;
    }

    if (!wishlistData[selectedList].some(item => item.id === selectedProduct.id)) {
        wishlistData[selectedList].push(selectedProduct);
        localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
        alert(`Added to ${selectedList}!`);
    } else {
        alert("This product is already in the selected wishlist.");
    }
});
