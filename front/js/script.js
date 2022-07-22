///// Display all products on the main page /////


const items = document.getElementById('items');
const urlApi = "http://localhost:3000/api/products/";

/** Call Api */
const getAllProducts = () => {
    fetch(urlApi)
        .then( response => response.json())
        .then( products => {
            for ( let product of products){
                items.innerHTML += `<a href="./product.html?id=${product._id}">
                                        <article>
                                            <img src=${product.imageUrl} alt=${product.altTxt}>
                                            <h3 class="productName">${product.name}</h3>
                                            <p class="productDescription">${product.description}</p>
                                        </article>
                                    </a>`
            }
        })
}

getAllProducts();