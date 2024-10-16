import { makeURL } from "../utilities.js";
const url = makeURL('/api/latest-products');
// Fetch products from the API
fetch(url)
    .then(response => response.json())
    .then(data => {
        productCard(data); // Pass the data to the productCard function
    })
    .catch(error => console.error('Error fetching products:', error));

// Function to generate the product cards
function productCard(data) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = ''; // Clear existing content

    data.forEach(product => {
        let htmlCode = htmlTemplate(product);
        productsList.innerHTML += htmlCode; // Update HTML code
    });
}

// Function to create the HTML template for each product
function htmlTemplate(product) {
    let { title, img, price, description, category, _id } = product;

    if (title.length > 45) {
        title = title.slice(0,45) + '...';
    }
    if (description > 130) {
        description = description.slice(0,130) + '...';
    }

    const html = `
        <div class="product-card">
            <img src="${img}" alt="Product" class="product-img"/>
            <div class="product-details">
                <h3 class="product-title">${title}</h3>
                <p class="product-description">${description}</p>
                <div class="product-footer">
                    <span class="product-price">${price}</span>
                    <a href="../html/productDetails.html?id=${_id}" class="product-buy-btn">Buy Now</a>
                </div>
            </div>
        </div>
    `;

    return html;
}