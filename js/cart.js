window.onload = function() {
    ShoppingCart.init();
    CartPreview.update();
    MultiStepNavigation.init();
    ShippingDetailsForm.init();
    PaymentForm.init();
    SearchBar.init();
};

let ShoppingCart = {
    subtotalValue: 0,
    products: JSON.parse(localStorage.getItem('products')),

    init() {
        this.products.forEach(product => {
            ShoppingCart.createItem(product);
        });

        this.updateTotal();
    },

    createItem(product) {
        let itemTotal = (product.price * product.quantity)
        let item = document.querySelector('.item').cloneNode(true);
        let itemDeleteModal = item.querySelector('.delete-modal');
        item.classList.remove('d-none');

        item.querySelector('.item-image').src = product.img;
        item.querySelector('.item-title').innerText = product.title;
        item.querySelector('.item-description').innerText = product.description;
        item.querySelector('.unit-price').innerText = product.price;
        item.querySelector('.quantity-input').value = product.quantity;
        item.querySelector('.item-total').innerText = itemTotal.toFixed(2);

        itemDeleteModal.setAttribute('id', `delete-modal-${product.id}`);
        itemDeleteModal.setAttribute('aria-labelledby',`delete-modal-${product.id}-Label`);
        item.querySelector('.modal-title').setAttribute('id', `delete-modal-${product.id}-Label`);
        item.querySelector('.modal-title-item').innerText = product.title;
        item.querySelector('.delete-product').setAttribute('data-bs-target', `#delete-modal-${product.id}`);

        item.querySelectorAll('.sign-btn').forEach(btn => {
            btn.addEventListener('click', function() {ShoppingCart.updateProductQuantity(btn, item, product)})
        });

        item.querySelector('.confirm-delete').addEventListener('click', function(e) {
            ShoppingCart.deleteItem(item, product);
        });

        this.subtotalValue += itemTotal;
        document.querySelector('.item-list').appendChild(item);
        this.updateTotal();
    },

    updateProductQuantity(button, currentItemElement, currentProduct) {
        const price = currentItemElement.querySelector('.unit-price');
        const quantity = currentItemElement.querySelector('.quantity-input');
        const total = currentItemElement.querySelector('.item-total');
        const totalBefore = quantity.value * Number(price.textContent);

        if(button.classList.contains('plus')) {
            if(quantity.value < 100) {
                quantity.value++;
            };
        } else {
            if (quantity.value > 1) {
                quantity.value--;
            };
        };

        const totalPrice = quantity.value * price.textContent;
        total.textContent = totalPrice.toFixed(2);

        this.subtotalValue = (this.subtotalValue - totalBefore + totalPrice).toFixed(2);
        this.updateTotal();

        this.products.find(element => element.id === currentProduct.id).quantity = quantity.value;
        localStorage.setItem('products', JSON.stringify(this.products));

        CartPreview.update();
    },

    updateTotal() {
        const shipping = document.querySelector('#shipping');
        const shippingFee = document.querySelectorAll('.shipping-fee');
        const totalElement = document.querySelector('#total');
        const subtotalElement = document.querySelector('#subtotal');
        const defaultMessage = document.querySelector('.default-message');
        const paymentCost = Number(Array.from(paymentMethods).find(option => option.checked == true).value);

        let totalAmount = 0;

        if(this.subtotalValue <= 0) {
            shipping.classList.remove('text-success');
            defaultMessage.classList.remove('d-none');
            shipping.innerText = '$0';
            shippingFee.forEach(s => s.innerText = '$0.0');
        } else if(this.subtotalValue <= 100) {
            totalAmount = Number(this.subtotalValue) + 15;
            shipping.classList.remove('text-success');
            defaultMessage.classList.add('d-none');
            shipping.innerText = '$15';
            shippingFee.forEach(s => s.innerText = '$15')
        } else {
            totalAmount = Number(this.subtotalValue);
            shipping.classList.add('text-success');
            defaultMessage.classList.add('d-none');
            shipping.innerText = 'FREE';
            shippingFee.forEach(s => {
                s.innerText = 'FREE';
                s.classList.add('text-success');
            });
        };
        subtotalElement.textContent = Number(this.subtotalValue).toFixed(2).replace('-0', '0');
        totalElement.textContent = Number(totalAmount + paymentCost).toFixed(2);
        
        this.updateCartQuantity();
        this.updateExpectedDeliveryDate();
    },

    deleteItem(item, product) {
        const itemSubtotal = item.querySelector('.item-total').textContent;

        item.remove();
        ShoppingCart.subtotalValue = (ShoppingCart.subtotalValue - Number(itemSubtotal)).toFixed(2);
        this.products.splice(this.products.indexOf(product),1);
        localStorage.setItem('products', JSON.stringify(this.products));

        ShoppingCart.updateTotal();
        CartPreview.update();
        ShoppingCart.updateCartQuantity();
        MultiStepNavigation.updateEmptyCart();
    },

    updateCartQuantity() {
        const numberOfItems = document.querySelector('.cart-items-number');
        let totalNr = 0;

        document.querySelectorAll('.quantity-input').forEach(q => {
            totalNr += parseInt(q.value);
        });
        
        numberOfItems.innerText = totalNr - 1;
    },

    updateExpectedDeliveryDate() {
        const deliveryDateElement = document.querySelector('.expected-delivery-date');
        const shippingDetailsExpectedDate = document.querySelectorAll('.delivery-date');
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthDay = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let d = new Date();
        let calculatedDate;

        if(d.getDay() > 0 && d.getDay() <= 4) {     //If Monday, Tuesday, Wednesday, Thursday -> Delivery day: Next Day
            d.setHours(d.getHours() + 24);          //
        } else if(d.getDay() == 0) {                //If Sunday -> Delivery day: Tuesday
            d.setHours(d.getHours() + 48);          
        } else {                                    //If Friday -> Delivery day: Monday               
            d.setHours(d.getHours() + 72);          //If Saturday -> Delivery day: Tuesday
        }

        let weekD = weekday[d.getDay()];
        let day = d.getDate();
        let month = monthDay[d.getMonth()];
        let year = d.getFullYear();

        if(this.subtotalValue <= 0) {
            calculatedDate = 'No Shipping Date';
        } else {
            calculatedDate = weekD + ": " + day + "-" + month + "-" + year;
        }
        deliveryDateElement.innerText = calculatedDate;
        shippingDetailsExpectedDate.forEach(date => date.innerText = calculatedDate);
    }
};
