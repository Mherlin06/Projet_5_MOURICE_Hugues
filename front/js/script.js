///// Display all products on the main page /////

const items = document.getElementById("items");
const urlApi = "http://localhost:3000/api/products/";

/** Call Api */
const getAllProducts = () => {
  fetch(urlApi)
    .then((response) => response.json())
    .then((dataProducts) => {
      dataProducts.forEach((product) => {
        createProductCard(product);
      });
    });
};

getAllProducts();

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
  itemName.textContent = product.name;
  itemDescription.textContent = product.description;
};
