const paymentSubmit = document.querySelector('.payment-submit');
const agree = document.querySelector('#terms');
const invalidAgree = document.querySelector('#terms-invalid');
const summary = document.querySelector('#summary');
const cartPop = document.querySelector('.cart-pop');
const paymentMethods = document.querySelectorAll('[name="payment"]');
const orderTotal = document.querySelector('#total');
const orderShipping = document.querySelector('#shipping');
const orderExpectedDate = document.querySelector('.expected-delivery-date');

let PaymentForm = {
    init() {
        paymentSubmit.addEventListener('click', function() {
            if (agreeTerms.checked == false) {
                invalidAgree.classList.remove('d-none');
                agreeTerms.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            } else {
                const orderCounty = document.querySelector('#select-county').value;
                const orderCity = document.querySelector('#select-city').value;
                const orderCourier = Array.from(document.querySelectorAll('[name="delivery"]')).find(method => method.checked == true);
                const orderCourierName = orderCourier.nextElementSibling.innerText;

                let orderDetails = {total: `${orderTotal.innerText}`, shipping: `${orderShipping.innerText}`,
                                    courier: `${orderCourierName}`, destination: `${orderCounty}, ${orderCity}`,
                                    arrival: `${orderExpectedDate.innerText}`, products: ShoppingCart.products};
                                    
                localStorage.setItem('order', JSON.stringify(orderDetails));

                invalidAgree.classList.add('d-none');
                summary.classList.add('d-none');
                localStorage.removeItem('products');
                cartPop.classList.add('d-none');
            }
        });
        
        agree.addEventListener('click', function() {
            invalidAgree.classList.add('d-none');
        });

        paymentMethods.forEach(method => method.addEventListener('change', function() {
            ShoppingCart.updateTotal();
        }));
    }
}