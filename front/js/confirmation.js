/////////////////////////// Display Order ID ////////////////////

/** Get order id from URL */
const actualUrl = new URL(window.location.href);
const urlId = actualUrl.searchParams.get('id');

/** display the id */
const orderId = document.getElementById('orderId');
orderId.textContent = urlId;