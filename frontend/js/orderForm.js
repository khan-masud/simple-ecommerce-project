import { makeURL, urlParams } from "./utilities.js";
const form = document.getElementById("order-form");
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const number = e.target.number.value;
    const address = e.target.address.value;
    const {productID} = urlParams();
    const date = new Date();
    const today = date.toLocaleDateString();

    const data = {
        name, email, number, address, productID, date : today
    };

    const url = makeURL('/api/place-order');
    fetch(url, {
        method : "POST",
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        if (response.acknowledged) {
            alert('Your order is successfully placed. Thanks for shopping with us.');
            window.location.href = 'http://127.0.0.1:5500/frontend/html/index.html';
        }
    })
    
})