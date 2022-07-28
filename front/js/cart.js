/// Display informmations of selected products stored in the localStorage ///

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

            /** Add eventListener onclick on every delete btns */
            let deleteItemBtn = document.getElementsByClassName('deleteItem')

            Object.values(deleteItemBtn).forEach( btn => btn.addEventListener('click', function(){

                /** Get the id & the color of the product that will be deleted */
                const productArticle = btn.closest('article');
                const articleId = productArticle.dataset.id;
                const articleColor = productArticle.dataset.color;

                deleteProduct(articleId, articleColor)
            }
            ))
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
    displayTotalPrice();
    displayTotalQuantity();
}
updateCart();

//// Delete products from the cart //// 

const deleteProduct = (productId, productColor) => {

    /** Delete the unneeded product from the cart list */
    let newLocalStorageProducts = localStorageProducts.filter(item => (item.id !== productId && item.color !== productColor));
    
    /** Store the new list of products & update the page */
    localStorage.products = JSON.stringify(newLocalStorageProducts);
    cartItems.innerHTML = ``;

    updateCart();
}


//// Change product's quantity inside the cart ////

