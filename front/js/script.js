/** Display all products on the main page by
 * Calling the API &
 * Setting DOM Elements for each product inside 'items' element
*/

const items = document.getElementById('items');
const url = "http://localhost:3000/api/products/";

/** Call Api */

const getProducts = () => {
    fetch(url)
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

getProducts();