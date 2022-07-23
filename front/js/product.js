//////Display product informations /////

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

///// Add chosen product to localStorage /////

const addToCartBtn = document.getElementById('addToCart');

/** Get elements from localStorage */
const storedProducts = () => {
    const storedProducts = localStorage.getItem('products');
    (!storedProducts) ? {} : JSON.parse(storedProducts); 
}

/** Compare & add selected product to elements from localStorage */
const addSelectedproduct = (selectedProduct) => {
   
    for (let products of storedProducts){
        if(products.id === selectedProduct.id && products.color === selectedProduct.color){
            products.quantity += selectedProduct.quantity;
        }
        else{
            localStorage.setItem('products', JSON.stringify(selectedProduct))
        }
    };
}


/** Update localStorage with selected product */
addToCartBtn.addEventListener('click', e => {

    const itemQuantity = parseInt(document.getElementById('quantity').value);
    const itemColor = document.getElementById('colors').value;
    console.log('quantité selectionnée: ' + itemQuantity)
    console.log('couleur selectionnée : ' + itemColor)

    if (itemColor === ""){
        alert('Veuillez selectionner une couleur')
    }
    else if(itemQuantity > 100){
        alert('La quantité selectionnée ne peux dépasser 100')
    }
    else if (itemQuantity > 0 && itemQuantity <= 100 && itemColor !==""){

        /** Create object of the selected product */
        const selectedProduct = {
            id : productId,
            color: itemColor,
            quantity: itemQuantity
        }

        addSelectedproduct(selectedProduct);

        console.log(localStorage.getItem('products'));
        alert('Produit(s) ajouté(s) au panier');
    }
})

