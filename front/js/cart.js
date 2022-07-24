/// Display informmations of selected products stored in the localStorage ///

/** Get all products from localStorage */
const cartProducts = () => {
    return JSON.parse(localStorage.products)
}

const cart__items = document.getElementById('cart__items')

const urlApi = "http://localhost:3000/api/products/";

/** Get cartProducts informations by calling the Api */
cartProducts().forEach(cartProduct => {

    fetch(urlApi + cartProduct.id)
        .then(response => response.json())
        .then(data => {
            cartProduct.price = data.price;
            cartProduct.imageUrl = data.imageUrl;
            cartProduct.name = data.name;
            cartProduct.altTxt = data.altTxt;

            /** Display all cartProducts informations on the cart.html page */
            cart__items.innerHTML += `<article class="cart__item" data-id="${cartProduct.id}" data-color="${cartProduct.color}">
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
