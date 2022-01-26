const productList = document.querySelector('#order-products');
const orderDate = document.querySelector('#order-date');
const orderId = document.querySelector('#order-id');
const orderTotal = document.querySelector('#order-total');
const orderShippingCost = document.querySelector('#order-shipping-cost');
const orderCourier= document.querySelector('#order-courier');
const orderDestination = document.querySelector('#order-destination');
const orderArrival = document.querySelector('#order-arrival-date');

window.onload = function() {
    SearchBar.init();
    OrderDetails.init();
};

let OrderDetails = {
    orderInfo: JSON.parse(localStorage.getItem('order')),

    init() {
        this.createProductDetailsElements(this.orderInfo);
    },
    
    createProductDetailsElements(orderInfo) {

        orderInfo.products.forEach(product => {
            const orderProductTemplate = document.querySelector('.ordered-item').cloneNode(true);
            const orderProductId = orderProductTemplate.querySelector('.item-id');
            const orderProductName = orderProductTemplate.querySelector('.item-name');
            const orderProductQty = orderProductTemplate.querySelector('.item-qty');
            const orderProductPrice = orderProductTemplate.querySelector('.item-price');
            const orderProductTotal = orderProductTemplate.querySelector('.item-total');

            orderDate.innerText = new Date().toLocaleDateString();
            orderId.innerText = Math.floor((Math.random() + 1) * 1000000);
            orderTotal.innerText = orderInfo.total;
            orderShippingCost.innerText = orderInfo.shipping;
            orderCourier.innerText = orderInfo.courier.replace(/Courier Delivery Service - |Collect Point - /gi, '');
            orderDestination.innerText = orderInfo.destination;
            orderArrival.innerText = orderInfo.arrival;

            orderProductId.setAttribute('id', product.id);
            orderProductId.innerText = product.id;
            orderProductName.innerText = product.title;
            orderProductQty.innerText = product.quantity;
            orderProductPrice.innerText = product.price;
            orderProductTotal.innerText = (product.quantity * product.price).toFixed(2);
            orderProductTemplate.classList.remove('d-none');
            productList.appendChild(orderProductTemplate);
        });
    }
}