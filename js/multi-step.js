let agreeTerms = document.querySelector('#terms');
let finishBtn = document.querySelector('.finish-btn');

let MultiStepNavigation = {
    init() {
        document.querySelectorAll('.next').forEach(btn => btn.addEventListener('click', function(e) {
            if ((e.target.classList.contains('form-submit') && Object.values(ShippingDetailsForm.isFormValid).includes(false)) ||
                (e.target.classList.contains('payment-submit') && agreeTerms.checked == false)) {
                return;
            } else {
                MultiStepNavigation.navigateNext(e.target.parentNode.parentNode);
            }
        }));
        
        finishBtn.addEventListener('click', function() {
            location.href='/index.html';   
        });

        document.querySelectorAll('.previous').forEach(btn => btn.addEventListener('click', function(e) {
            MultiStepNavigation.navigatePrevious(e.target.parentNode.parentNode);
        }));

        this.updateEmptyCart();
    },
    navigateNext(current_page) {
        let next_page = current_page.nextElementSibling;

        current_page.classList.add('d-none');
        next_page.classList.remove('d-none');

        let progressBarEl = document.querySelector(`#${next_page.id.replace('wp-', '')}`);
        progressBarEl.classList.remove('pending');
        progressBarEl.classList.add('active');

        if (next_page.id == 'wp-finish') {
            finishMessage = document.querySelector('#polaroid-frame');
            finishMessage.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        } else {
            progressBarEl.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        };
    },

    navigatePrevious(current_page) {
        let previous_page = current_page.previousElementSibling;

        current_page.classList.add('d-none');
        previous_page.classList.remove('d-none');

        let progressBarEl = document.querySelector(`#${current_page.id.replace('wp-', '')}`);
        progressBarEl.classList.remove('active');
        progressBarEl.classList.add('pending');
        progressBarEl.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    },

    updateEmptyCart() {
        if (ShoppingCart.products.length == 0) {
            let firstNextBtn = document.querySelector('.next');
            let progressBarElements = Array.from(document.querySelector('#progressbar').children);
            
            firstNextBtn.classList.add('d-none');
            progressBarElements.forEach(element => {
                element.classList.remove('active');
                element.classList.remove('pending');
            });
        };
    }
};