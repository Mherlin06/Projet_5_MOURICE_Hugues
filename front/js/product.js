/** Display product informations */

/** Get current page url */
const currentUrl = new URL(window.location.href);

/** Get product ID from url */
const productId = currentUrl.searchParams.get("id");

/** Call the API & add product elements to the DOM */

const productUrl = "http://localhost:3000/api/products/" + productId;
const productImg = document.querySelector('.item__img');
const productTitle = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productColors = document.getElementById('colors');

const getProductById = () => {
    fetch(productUrl)
        .then (response => response.json())
        .then ( product => {
            productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
            productTitle.textContent = `${product.name}`;
            productPrice.textContent = `${product.price}`;
            productDescription.textContent = `${product.description}`;
            document.title = `${product.name}`;

            const colorsArray = product.colors;
            for ( let color of colorsArray){
                productColors.innerHTML += `<option value="${color}">${color}</option>`;
            }
        })
}

getProductById();
