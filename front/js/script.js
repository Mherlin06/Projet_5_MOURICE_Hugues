///// Display all products on the main page /////

const items = document.getElementById("items");
const urlApi = "http://localhost:3000/api/products/";

/** Call Api to get all products data and display them inside the DOM */
const getAllProducts = () => {
  fetch(urlApi)
    .then((response) => response.json())
    .then((dataProducts) => {
      dataProducts.forEach((product) => {
        createProductCard(product);
      });
    });
};

const createProductCard = (product) => {
  // Create Elements
  let itemAnchor = document.createElement("a");
  let itemArticle = document.createElement("article");
  let itemImg = document.createElement("img");
  let itemName = document.createElement("h3");
  let itemDescription = document.createElement("p");

  // Appends Elements
  items.appendChild(itemAnchor);
  itemAnchor.appendChild(itemArticle);
  itemArticle.appendChild(itemImg);
  itemArticle.appendChild(itemName);
  itemArticle.appendChild(itemDescription);

  // display product's values
  itemAnchor.setAttribute("href", "product.html?id=" + product._id);
  itemImg.setAttribute("src", product.imageUrl);
  itemImg.setAttribute("alt", product.altTxt);
  itemName.setAttribute("class", "productName");
  itemName.textContent = product.name;
  itemDescription.setAttribute("class", "productDescription");
  itemDescription.textContent = product.description;
};

getAllProducts();
