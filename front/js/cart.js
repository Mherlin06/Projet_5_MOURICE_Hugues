//////////// Display informmations of selected products stored in the localStorage ///////////////

const urlApi = "http://localhost:3000/api/products/";
let localStorageProducts;
const cartItems = document.getElementById('cart__items');


/** Get all products from localStorage */
const updateLocalStorage = () =>{
    localStorageProducts = JSON.parse(localStorage.products)
}

/** Display Products informations by calling the Api */
const displayCart = () =>{

    localStorageProducts.forEach(cartProduct => {
        
        fetch(urlApi + cartProduct.id)
        .then(response => response.json())
        .then(data => {
            cartProduct.price = data.price;
            cartProduct.imageUrl = data.imageUrl;
            cartProduct.name = data.name;
            cartProduct.altTxt = data.altTxt;
            
            /** Display all Products informations on the cart.html page */
            cartItems.innerHTML += `<article class="cart__item" data-id="${cartProduct.id}" data-color="${cartProduct.color}">
                                        <div class="cart__item__img">
                                            <img src="${cartProduct.imageUrl}" alt="${cartProduct.altTxt}">
                                        </div>
                                        <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2>${cartProduct.name}</h2>
                                                <p>${cartProduct.color}</p>
                                                <p>${cartProduct.price} €</p>
                                            </div>
                                            <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                    <p>Qté : ${cartProduct.quantity}</p>
                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartProduct.quantity}">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                    <p class="deleteItem">Supprimer</p>
                                                </div>
                                            </div>
                                            </div>
                                            </article>`;

            /** Add eventListener onclick on delete btns */
            let deleteItemBtn = document.getElementsByClassName('deleteItem')

            Object.values(deleteItemBtn).forEach( btn => btn.addEventListener('click', function(){

                /** Get the id & the color of the product that will be deleted */
                const productArticle = btn.closest('article');
                const articleId = productArticle.dataset.id;
                const articleColor = productArticle.dataset.color;

                deleteProduct(articleId, articleColor)
            }));

            /** Add eventListener onchange on quantity input */
            let quantityInput = document.getElementsByClassName('itemQuantity');

            Object.values(quantityInput).forEach( input => input.addEventListener('change', function(){

                /** Get Id, Color & quantity value of the product that will have its quantity changed */
                const productArticle = input.closest('article');
                const articleId = productArticle.dataset.id;
                const articleColor = productArticle.dataset.color;
                const articleQuantity = input.value;

                changeQuantity(articleId, articleColor, articleQuantity);
            }));
        });
    });
}

/** display totalQuantity */
const totalQuantity = document.getElementById('totalQuantity');

const displayTotalQuantity = () => {
    let newQuantity = 0;

    localStorageProducts.forEach( product => {
        newQuantity += product.quantity;
    });
    totalQuantity.textContent = newQuantity;
}

/** display totalPrice */
const totalPrice = document.getElementById('totalPrice');

const displayTotalPrice = () => {
    let newTotalPrice = 0;

    localStorageProducts.forEach( product => {
        fetch(urlApi + product.id)
        .then(response => response.json())
        .then(data => { 
            product.price = data.price;
            newTotalPrice += product.quantity * product.price;
            totalPrice.textContent = newTotalPrice;
        })
    });
}

/** General function that initialize the cart page */
const updateCart = () => {
    updateLocalStorage();
    displayCart();
    displayTotalQuantity();
    displayTotalPrice();
}
updateCart();

///////////// Delete products from the cart /////////////////// /** Bugs who need to be fixed !! same id but different color deleted !!  */

const deleteProduct = (productId, productColor) => {

    /** Delete the unneeded product from the cart list */
    let newLocalStorageProducts = localStorageProducts.filter(item => (item.id !== productId && item.color !== productColor));
    
    /** Store the new list of products & update the page */
    localStorage.products = JSON.stringify(newLocalStorageProducts);
    cartItems.innerHTML = ``;

    updateCart();
    window.location.href='#cartAndFormContainer';
}

//////////////// Change product's quantity inside the cart ////////////////////

const changeQuantity = (productId, productColor, productQuantity) => {

    if(productQuantity <= 0 ){
        alert('Désolé! Vous ne pouvez pas avoir un nombre de produit négatif ou nul')
    }
    else if(productQuantity > 100){
        alert('Désolé! Vous ne pouvez pas sélectionner plus de 100 fois le même produit')
    }
    else{
        /** Get the product we modify from localeStorage & change its quantity*/
        let productToModify = localStorageProducts.find(item => item.id === productId && item.color === productColor);
        productToModify.quantity = productQuantity;

        /** Store the modify localeStorage & update the page */
        localStorage.products = JSON.stringify(localStorageProducts);
        cartItems.innerHTML = ``;

        updateCart();
    }
}


/////////////// Form Control ////////////////////

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const adress = document.getElementById('adress');
const city = document.getElementById('city');
const email = document.getElementById('email');

const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const adressErrorMsg = document.getElementById('adressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');

let firstNameValue, lastNameValue, adressValue, cityValue, emailValue;

/** First Name validation */
firstName.addEventListener('input', e => {
    if(e.target.value.length == 0){
        firstNameValue = null;
        firstNameErrorMsg.textContent ='';
    }
    else if(e.target.value.length < 2 || e.target.value.length > 30){
        firstNameErrorMsg.textContent = 'Veuillez renseigner un prénom comprenant entre 2 et 30 caractères';
        firstNameValue = null;
    }

    /** firstname - only letters - between 2 & 30 characters */
    if(e.target.value.match(/^[a-z A-Z]{2,30}$/)){
        firstNameErrorMsg.textContent = '';
        firstNameValue = e.target.value;
    }

    /** Handle wrong characters */
    if(!e.target.value.match(/^[a-z A-Z]{2,30}$/) && 
        e.target.value.length >= 2 && 
        e.target.value.length <= 30){
            firstNameValue = null;
            firstNameErrorMsg.textContent = 'Le prénom ne doit pas contenir de chiffres, ni de caractères spéciaux ou d\'accents ';
        }
});

/** Last Name validation */