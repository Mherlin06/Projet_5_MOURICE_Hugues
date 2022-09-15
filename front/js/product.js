//////Display product informations /////

/** Get current page url */
const currentUrl = new URL(window.location.href);

/** Get product ID from url */
const productId = currentUrl.searchParams.get("id");

/** Call the API & add product's infos to the DOM */
const productUrl = "http://localhost:3000/api/products/" + productId;
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColors = document.getElementById("colors");

const getProductById = () => {
  fetch(productUrl)
    .then((response) => response.json())
    .then((product) => {
      productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
      productTitle.textContent = `${product.name}`;
      productPrice.textContent = `${product.price}`;
      productDescription.textContent = `${product.description}`;
      document.title = `${product.name}`;

      // Create Color's option
      let colorsArray = product.colors;

      colorsArray.forEach((color) => {
        let colorOption = document.createElement("option");
        colorOption.textContent = color;
        colorOption.setAttribute("value", color);
        productColors.appendChild(colorOption);
      });
    });
};

getProductById();

///// Add chosen product to localStorage /////

/** Get elements from localStorage */
let getLocalStorageProducts = () => {
  let storedProducts = JSON.parse(localStorage.products);
  storedProducts == null ? (storedProducts = []) : {};
  return storedProducts;
};

/** add selectedProduct to localStorage */
const addToLocalStorage = (productToStore) => {
  localStorage.setItem("products", JSON.stringify(productToStore));
};

/** Update localStorage with selected product */
const addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("click", () => {
  const itemQuantity = parseInt(document.getElementById("quantity").value);
  const itemColor = document.getElementById("colors").value;

  if (itemColor === "") {
    alert("Veuillez selectionner une couleur pour votre Kanap");
  } else if (itemQuantity <= 0) {
    alert("La quantité de Kanap à ajouter au panier ne peut être nulle ou négative");
  } else if (itemQuantity > 100) {
    alert("La quantité selectionnée ne peux dépasser 100");
  } else if (Number.isInteger(itemQuantity) == false ) {
    alert("La quantité choisie doit être un nombre entier");
  } else {
    /** Create an object from the selected product */
    const selectedProduct = {
      id: productId,
      color: itemColor,
      quantity: itemQuantity,
    };

    /** Create an Array of every products from localStorage */
    let storedProducts = getLocalStorageProducts();

    /** Find if selectedProduct is in storedProducts & add it if not*/
    let selectedProductIsPresent = storedProducts.find(
      (item) => item.id === productId && item.color === itemColor
    );

    if (selectedProductIsPresent) {
      selectedProductIsPresent.quantity += itemQuantity;
    } else {
      storedProducts.push(selectedProduct);
    }

    addToLocalStorage(storedProducts);

    document.location.href = "cart.html";
  }
});
