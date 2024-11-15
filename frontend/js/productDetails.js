import { makeURL, urlParams } from '../js/utilities.js'

function loadData() {
    const params = urlParams();
    const url = makeURL(`/api/single-product/${params.id}`);

    fetch(url)
    .then(response => response.json())
    .then(response => productDetails(response))
}

const productDetails = (response) => {
    const { _id, title, price, img, description, category, productID } = response;
     const htmlCode = `
            <div class="product-left">
                <img src="${img}" alt="rtre">
            </div>
            <div class="product-right">
                <h2>${title}</h2>
                <p>${description}</p>
                <p><span class="heading">Category : </span>${category}</p>
                <p><span class="heading">Price : </span>৳${price}</p>
                <a href="orderForm.html?productID=${productID}"><div class="links">Buy Now</div></a>
            </div>
     `;

     const productDetails = document.getElementById('product-section');
     productDetails.innerHTML = '';
     productDetails.innerHTML = htmlCode;
}

loadData();