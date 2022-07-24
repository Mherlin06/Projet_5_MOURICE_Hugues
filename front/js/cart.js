/// Display informmations of selected products stored in the localStorage ///

const cartItems = document.getElementById('cart__items')

const urlApi = "http://localhost:3000/api/products/";

/** Get all products from localStorage */
const cartProducts = () => {
    return JSON.parse(localStorage.products)
}

/** Get cartProducts informations by calling the Api */
const displayCart = (basket) =>{

    basket.forEach(cartProduct => {
        
        fetch(urlApi + cartProduct.id)
        .then(response => response.json())
        .then(data => {
            cartProduct.price = data.price;
            cartProduct.imageUrl = data.imageUrl;
            cartProduct.name = data.name;
            cartProduct.altTxt = data.altTxt;
            
            /** Display all cartProducts informations on the cart.html page */
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
                                            </article>`
        });     
    });
}
displayCart(cartProducts());

/** display totalQuantity */
const totalQuantity = document.getElementById('totalQuantity');

const displayTotalQuantity = () => {
    let newQuantity = 0;

    cartProducts().forEach( product => {
        newQuantity += product.quantity;
    });
    totalQuantity.textContent = newQuantity;
}
displayTotalQuantity();

/** display totalPrice */
const totalPrice = document.getElementById('totalPrice')

const displayTotalPrice = () => {
    let newTotalPrice = 0;

    cartProducts().forEach( product => {
        fetch(urlApi + product.id)
        .then(response => response.json())
        .then(data => { 
            product.price = data.price;
            newTotalPrice += product.quantity * product.price;
            totalPrice.textContent = newTotalPrice;
        })
    });
}
displayTotalPrice();