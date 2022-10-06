//////////// Display informmations of selected products stored in the localStorage ///////////////

const urlApi = "http://localhost:3000/api/products/";
let localStorageProducts;

const cartItems = document.getElementById("cart__items");

/** Get all products from localStorage */
const updateLocalStorage = () => {
  if (typeof localStorage.products == "undefined") {
    let initlocalStorage = [];
    localStorage.products = JSON.stringify(initlocalStorage);
  }
  localStorageProducts = JSON.parse(localStorage.products);
};

/** Display Products informations by calling the Api */
const displayCart = () => {
  localStorageProducts.forEach((cartProduct) => {
    fetch(urlApi + cartProduct.id)
      .then((response) => response.json())
      .then((data) => {
        cartProduct.price = data.price;
        cartProduct.imageUrl = data.imageUrl;
        cartProduct.name = data.name;
        cartProduct.altTxt = data.altTxt;

        /** Display all Products informations on the cart.html page */
        cartItems.innerHTML = localStorageProducts.map(
          (cartProduct) =>
            `<article class="cart__item" data-id="${cartProduct.id}" data-color="${cartProduct.color}">
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
        );
        
        /** Add eventListener onclick on delete btns */
        let deleteItemBtn = document.getElementsByClassName("deleteItem");

        Object.values(deleteItemBtn).forEach((btn) =>
          btn.addEventListener("click", function () {
            /** Get the id & the color of the product that will be deleted */
            const productArticle = btn.closest("article");
            const articleId = productArticle.dataset.id;
            const articleColor = productArticle.dataset.color;
            deleteProduct(articleId, articleColor);
          })
        );

        /** Add eventListener onchange on quantity input */
        let quantityInput = document.getElementsByClassName("itemQuantity");

        Object.values(quantityInput).forEach((input) =>
          input.addEventListener("change", function () {
            /** Get Id, Color & quantity value of the product that will have its quantity changed */
            const productArticle = input.closest("article");
            const articleId = productArticle.dataset.id;
            const articleColor = productArticle.dataset.color;
            const articleQuantity = input.value;

            // Check if articleQuantity is a whole number
            if (articleQuantity / parseInt(articleQuantity) === 1) {
              changeQuantity(articleId, articleColor, articleQuantity);
            } else {
              alert("Veuillez choisir un nombre entier de kanap.");
            }
          })
        );
      });
  });
};

/** display totalQuantity */
const totalQuantity = document.getElementById("totalQuantity");

const displayTotalQuantity = () => {
  let newQuantity = 0;

  localStorageProducts.forEach((product) => {
    newQuantity += parseInt(product.quantity);
  });
  totalQuantity.textContent = newQuantity;
};

/** display totalPrice */
const totalPrice = document.getElementById("totalPrice");

const displayTotalPrice = () => {
  let newTotalPrice = 0;

  if (localStorageProducts.length == 0) {
    totalPrice.textContent = 0;
  } else {
    localStorageProducts.forEach((product) => {
      fetch(urlApi + product.id)
        .then((response) => response.json())
        .then((data) => {
          product.price = data.price;
          newTotalPrice += product.quantity * product.price;
          totalPrice.textContent = newTotalPrice;
        });
    });
  }
};

/** General function that initialize the cart page */
const updateCart = () => {
  updateLocalStorage();
  displayCart();
  displayTotalQuantity();
  displayTotalPrice();
};
updateCart();

///////////// Delete products from the cart ///////////////////

const deleteProduct = (productId, productColor) => {
  let newLocalStorageProducts = [];

  if (localStorageProducts.length == 1) {
    /** if last product then clean the cart page */
    cartItems.innerHTML = "";
  } else {
    /** Delete the unneeded product from the cart list */
    newLocalStorageProducts = localStorageProducts.filter(
      (item) => item.id != productId || item.color != productColor
    );
  }

  /** Store the new list of products & update the cart*/
  localStorage.products = JSON.stringify(newLocalStorageProducts);
  updateCart();
  window.location.href = "#cartAndFormContainer";
};

//////////////// Change product's quantity inside the cart ////////////////////

const changeQuantity = (productId, productColor, productQuantity) => {
  if (productQuantity <= 0) {
    alert(
      "Désolé! Vous ne pouvez pas avoir un nombre de produit négatif ou nul"
    );
  } else if (productQuantity > 100) {
    alert(
      "Désolé! Vous ne pouvez pas sélectionner plus de 100 fois le même produit"
    );
  } else {
    /** Get the product we modify from localeStorage & change its quantity*/
    let productToModify = localStorageProducts.find(
      (item) => item.id === productId && item.color === productColor
    );
    productToModify.quantity = productQuantity;

    /** Store the modify localeStorage & update the page */
    localStorage.products = JSON.stringify(localStorageProducts);

    updateCart();
  }
};

///////////////////////// Form Control /////////////////////////////////////

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

let firstNameValue, lastNameValue, addressValue, cityValue, emailValue;

/** First Name validation */
firstName.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    firstNameValue = null;
    firstNameErrorMsg.textContent = "";
  } else if (e.target.value.length < 2 || e.target.value.length > 30) {
    firstNameErrorMsg.textContent =
      "Veuillez renseigner un prénom comprenant entre 2 et 30 caractères";
    firstNameValue = null;
  } else if (e.target.value.match(/^[a-zA-Z\ç\à\é\è\ê\ï\-\ë\s]{2,30}$/)) {
    /** firstname - only letters - between 2 & 30 characters */
    firstNameErrorMsg.textContent = "";
    firstNameValue = e.target.value;
  } else {
    /** Handle wrong characters */
    firstNameValue = null;
    firstNameErrorMsg.textContent =
      "Le prénom ne doit pas contenir de chiffres, ni de caractères spéciaux";
  }
});

/** Last Name validation */
lastName.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    lastNameValue = null;
    lastNameErrorMsg.textContent = "";
  } else if (e.target.value.length < 2 || e.target.value.length > 30) {
    lastNameErrorMsg.textContent =
      "Veuillez renseigner un nom comprenant entre 2 et 30 caractères";
    lastNameValue = null;
  } else if (e.target.value.match(/^[a-zA-Z\ç\à\é\è\ê\ï\-\ë\'\s]{2,30}$/)) {
    /** lastname - only letters - between 2 & 30 characters */
    lastNameErrorMsg.textContent = "";
    lastNameValue = e.target.value;
  } else {
    /** Handle wrong characters */
    lastNameValue = null;
    lastNameErrorMsg.textContent =
      "Le nom ne doit pas contenir de chiffres, ni de caractères spéciaux";
  }
});

/** Address validation */
address.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    addressValue = null;
    addressErrorMsg.textContent = "";
  } else if (e.target.value.length < 3 || e.target.value.length > 80) {
    addressErrorMsg.textContent =
      "Veuillez renseigner une adresse comprenant entre 3 et 80 caractères";
    addressValue = null;
  } else if (e.target.value.match(/^[0-9]{1,4} [a-zA-Z\ç\à\é\è\ê\ï\-\ë\'\s]{3,80}$/)) {
    /** adress - first street number - then only letters - between 2 & 80 characters */
    addressErrorMsg.textContent = "";
    addressValue = e.target.value;
  } else {
    /** Handle wrong characters */
    addressValue = null;
    addressErrorMsg.textContent =
      "Veuillez entrer une adresse valide (N° - rue - complément) sans caractères spéciaux";
  }
});

/** City validation */
city.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    cityValue = null;
    cityErrorMsg.textContent = "";
  } else if (e.target.value.length < 2 || e.target.value.length > 30) {
    cityErrorMsg.textContent =
      "Veuillez renseigner une ville comprenant entre 2 et 30 caractères";
    cityValue = null;
  } else if (e.target.value.match(/^[a-zA-Z\ç\à\é\è\ê\ï\-\ë\'\s]{2,30}$/)) {
    /** city - only letters - between 2 & 30 characters */
    cityErrorMsg.textContent = "";
    cityValue = e.target.value;
  } else {
    /** Handle wrong characters */
    cityValue = null;
    cityErrorMsg.textContent =
      "La ville ne doit pas contenir de chiffres, ni de caractères spéciaux";
  }
});

/** Email validation */
email.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    emailValue = null;
    emailErrorMsg.textContent = "";
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    /** valid mail = word + @ + word + . + word */
    emailErrorMsg.textContent = "";
    emailValue = e.target.value;
  } else {
    /** Handle wrong mail */
    emailValue = null;
    emailErrorMsg.textContent =
      "Veuillez renseigner un email valide (ex: nom@mail.com)";
  }
});

//////////////////////////////// Post order //////////////////////////////////////

/** set the object that will be sent to API */
const setOrderData = () => {
  if (
    firstNameValue &&
    lastNameValue &&
    addressValue &&
    cityValue &&
    emailValue
  ) {
    let orderProducts = [];
    localStorageProducts.forEach((product) => orderProducts.push(product.id));

    const orderData = {
      contact: {
        firstName: firstNameValue,
        lastName: lastNameValue,
        address: addressValue,
        city: cityValue,
        email: emailValue,
      },
      products: orderProducts,
    };

    postOrderData(orderData);
  } else {
    alert(
      "Veuillez vérifier les informations renseignées. Un ou plusieurs champs sont incorrectes."
    );
  }
};

/** Send the order infos to the Api & link to confirmation page */
const postOrderData = (orderData) => {
  let stringifyData = JSON.stringify(orderData);

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: stringifyData,
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.clear();
      window.location.href = "./confirmation.html?id=" + data.orderId;
    });
};

/** set the click listener to order button */
const order = document.getElementById("order");

order.addEventListener("click", (e) => {
  e.preventDefault();

  if (localStorageProducts.length == 0) {
    alert("Votre panier est vide");
  } else {
    setOrderData();
  }
});
