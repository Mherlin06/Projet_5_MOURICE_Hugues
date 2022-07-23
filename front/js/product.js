//////Display product informations /////

/** Get current page url */
const currentUrl = new URL(window.location.href);

/** Get product ID from url */
const productId = currentUrl.searchParams.get("id");

/** Call the API & add product's infos to the DOM */
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


/** Get elements from localStorage */
let getLocalStorageProducts = () => {
    let storedProducts = JSON.parse(localStorage.getItem('products'));
    storedProducts == null ? storedProducts = [] : {};
    return storedProducts;
}

/** add selectedProduct to localStorage */
    const addToLocalStorage = (productToStore) =>{
        localStorage.setItem('products', JSON.stringify(productToStore))
    }

/** Update localStorage with selected product */
const addToCartBtn = document.getElementById('addToCart');

addToCartBtn.addEventListener('click', e => {

    const itemQuantity = parseInt(document.getElementById('quantity').value);
    const itemColor = document.getElementById('colors').value;
    // console.log('quantité selectionnée: ' + itemQuantity);
    // console.log('couleur selectionnée : ' + itemColor);
    // console.log('id du produit selectionné :' + productId);

    if (itemColor === ""){
        alert('Veuillez selectionner une couleur pour votre Kanap')
    }
    else if (itemQuantity === 0){
        alert('Veuillez choisir une quantité de Kanap à ajouter au panier')
    }
    else if(itemQuantity > 100){
        alert('La quantité selectionnée ne peux dépasser 100')
    }
    else{
        /** Create an object from the selected product */
        const selectedProduct = {
            id : productId,
            color: itemColor,
            quantity: itemQuantity
        }

        /** Create an Array of every products from localStorage */
        let storedProducts = getLocalStorageProducts();

        /** Find if selectedProduct is in storedProducts & add it if not*/
        let selectedProductIsPresent = storedProducts.findIndex(item => item.productId === productId && item.itemColor === itemColor);

        if(selectedProductIsPresent >= 0){
            storedProducts[selectedProductIsPresent].quantity += itemQuantity;
        }
        else{
            storedProducts.push(selectedProduct)
        }
        console.log(storedProducts);
        
        addToLocalStorage(storedProducts);

        alert('Produit(s) ajouté(s) au panier');
    }
});

