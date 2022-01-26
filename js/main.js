let camerasList = document.querySelector('.cameras-items');
let filmsList = document.querySelector('#films-items');
let floatingCart = document.querySelector('.cart-floating-preview');
let floatingCartLogo = document.querySelector('.floating-cart-logo');
let floatingCartBody = document.querySelector('.floating-cart-body');
let categories = document.querySelectorAll('.category');
let cartProducts = [];
let featuredProducts = [];
let productSuggestions = [];

window.onload = function() {
    window.addEventListener('scroll', function(e) {
        let ftproducts = document.querySelector('custom-header');
        let position = ftproducts.getBoundingClientRect();

        if(position.top < window.innerHeight && position.bottom >= 0) {
            floatingCart.classList.add('d-none');
        } else {
            FloatingCart.updateFloatingCart();
        }
   });

    if(!localStorage.getItem('products')) {      //Daca nu avem arrayul de produse pentru shopping cart pe local storage, il creeaza la incarcarea paginii
        localStorage.setItem('products', JSON.stringify(cartProducts));
    };

    categories.forEach(category => productSuggestions.push("Category: " + category.querySelector('.category-name').innerText));
    
    fetch('/assets/products.json')              //Populam featured products cu datele din fisierul json salvat local
        .then(response => response.json())
        .then(listOfProducts => {
            Store.createFeaturedProducts(listOfProducts).forEach(product => {
                Store.insertProductIntoCategory(product)
            });
        })
        .then(function() {
            localStorage.setItem('suggestions', JSON.stringify(productSuggestions));
            SearchBar.init();
            Store.displaySuggestedItem();
        });
    
    FloatingCart.init();
    CartPreview.update();
}

let Store = {
    createFeaturedProducts(products) {
        products.forEach(product => {
            //Item Model
            let itemElement = document.querySelector('#item').cloneNode(true);
            itemElement.classList.remove('d-none');

            //Creating and Updating Item Identifier
            const identifier = Math.floor((Math.random() + 1) * 1000000);
            itemElement.setAttribute('id', `item-${identifier}`);

            //Updating item properties
            itemElement.classList.add(`${product.category}`);
            itemElement.querySelector('.item-img').src = product.img;
            itemElement.querySelector('.item-title').innerText = product.title;

            //Rating
            this.generateRating(itemElement, product.rating);
            //Price
            itemElement.querySelector('.item-price').innerText = product.price;

            //Add to cart button
            itemElement.querySelector('.btn-add-cart').addEventListener('click', function(){
                cartProducts = JSON.parse(localStorage.getItem('products'));     

                if(cartProducts.some(p => p.id === product.id)) {
                    cartProducts.find(element => element.id === product.id).quantity++;
                } else {
                    cartProducts.push(product);
                }

                localStorage.setItem('products', JSON.stringify(cartProducts));  
                CartPreview.update();
                floatingCart.classList.remove('d-none');
                floatingCart.classList.add('animatedEnter');
                FloatingCart.updateFloatingCart();
            });
            productSuggestions.push(product.title);
            featuredProducts.push(itemElement); //se adauga produsul creat in lista de featured products
        });
        return featuredProducts;    //se returneaza lista de featured products
    },
    insertProductIntoCategory(product) {    //se injecteaza produsul in categoria specifica in functie de clasa
        let camerasCarousels = document.querySelector('#cameras-inner');
        let lastCameraCarousel = camerasCarousels.lastElementChild;
        let filmsCarousels = document.querySelector('#films-inner');
        let lastFilmCarousel = filmsCarousels.lastElementChild;

        if(product.classList.contains('camera')) {
            if (lastCameraCarousel.lastElementChild.childElementCount == 4) {
                let newCarouselTemplate = document.querySelector('.carousel-item-cameras').cloneNode(true);
                let newCarouselItems = newCarouselTemplate.firstElementChild;
                newCarouselTemplate.classList.remove('active');

                while(newCarouselItems.firstElementChild) {
                    newCarouselItems.firstElementChild.remove();
                };

                newCarouselItems.appendChild(product);
                camerasCarousels.appendChild(newCarouselTemplate);
                
            } else {
                lastCameraCarousel.lastElementChild.appendChild(product);
            }
        };

        if(product.classList.contains('film')) {
            if (lastFilmCarousel.lastElementChild.childElementCount == 3) {
                let newCarouselTemplate = document.querySelector('.carousel-item-films').cloneNode(true);
                let newCarouselItems = newCarouselTemplate.firstElementChild;
                newCarouselTemplate.classList.remove('active');

                while(newCarouselItems.firstElementChild) {
                    newCarouselItems.firstElementChild.remove();
                };

                newCarouselItems.appendChild(product);
                filmsCarousels.appendChild(newCarouselTemplate);
                
            } else {
                lastFilmCarousel.lastElementChild.appendChild(product);
            }
        };
    },

    generateRating(item, rating) {  //se genereaza ratingul vizual
        let fullStars = Math.floor(rating); //cate stelute pline trebuie sa ai 
        let halfStar = (rating % 1) * 10 >= 5 ? true : false;    //avem sau nu jumatatea de steluta
        let ratings = item.querySelector('.item-rating');
        let stars = ratings.querySelectorAll('i');
        item.querySelector('.item-rating-number').innerText = `(${rating})`;

        for(let i = 0; i < fullStars; i++) {
            let star = ratings.children[i];
            star.classList.remove('bi-star');
            star.classList.add('bi-star-fill');
            star.classList.remove('text-muted');
            star.classList.add('text-warning');
            star.setAttribute('integrity', 'full');
        };
        for(let i = 0; i < stars.length; i ++) {
            if(!stars[i].hasAttribute('integrity') && halfStar) {
                stars[i].classList.remove('bi-star');
                stars[i].classList.add('bi-star-half');
                stars[i].classList.remove('text-muted');
                stars[i].classList.add('text-warning');
                break;
            };
        };
    },

    displaySuggestedItem() {
        let currentUrl = new URL(window.location.href);
        if (window.location.href.includes('?')) {
            let blanket = document.querySelector('.blanket');
            let suggestedItemTitle = currentUrl.searchParams.get('product');
            let suggestedItem = Array.from(document.querySelectorAll('.item')).find(product => product.querySelector('.item-title').innerText == suggestedItemTitle);
            let carouselPage = suggestedItem.parentNode.parentNode;
            let parentCarousel = carouselPage.parentNode.parentNode;
            let carouselIndex = Array.from(parentCarousel.querySelectorAll('.carousel-item')).indexOf(carouselPage);
            let bootstrapCarousel = new bootstrap.Carousel(parentCarousel);

            bootstrapCarousel.to(carouselIndex);
            suggestedItem.classList.add('selected');
            blanket.classList.remove('d-none');

            suggestedItem.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            setTimeout(function(){
                suggestedItem.classList.remove('selected');
                blanket.classList.add('d-none');
            }, 2000);
            
        }
    }
};

let FloatingCart = {
    init() {
        floatingCartLogo.addEventListener('click', function(e) {
            floatingCartLogo.classList.add('d-none');
            floatingCartBody.classList.remove('d-none');
            floatingCart.classList.add('animatedEnter');
        });
        
        document.querySelector('.close-floating-cart').addEventListener('click', function() {
            floatingCartLogo.classList.remove('d-none');
            floatingCartBody.classList.add('d-none');
            floatingCart.classList.remove('animatedEnter');
        });

        document.addEventListener('click', function(e) {
            let targetElement = e.target; // clicked element
            let addBtns = Array.from(document.querySelectorAll('.btn-add-cart'));
            
            try {
                do {
                    if (floatingCartBody.contains(targetElement) || targetElement == floatingCartLogo || addBtns.includes(targetElement) || targetElement.tagName.toLowerCase() == 'i') {
                        return;                 // This is a click inside. Do nothing, just return.
                    }
                    // Go up the DOM
                    targetElement = targetElement.parentNode;
                } while (targetElement);
            } catch (e) {
                
            }

            floatingCartBody.classList.add('d-none');
            floatingCartLogo.classList.remove('d-none');
        });
    },

    updateFloatingCart() {
        let previewItemList = document.querySelector('.floating-cart-item-list');
        let modelItemPreview = document.querySelector('#floating-cart-item-model');
        cartProducts = JSON.parse(localStorage.getItem('products')); 

        if(cartProducts.length == 0) {
            floatingCart.classList.add('d-none');
        } else {
            floatingCart.classList.remove('d-none');
        };

        while(previewItemList.firstChild) {
            if(!previewItemList.lastElementChild.hasAttribute('id')){
                previewItemList.removeChild(previewItemList.lastChild);
            } else {
                break;
            };
        };
        
        cartProducts.forEach(item => {
            let floatingCartItem = modelItemPreview.cloneNode(true);
            floatingCartItem.removeAttribute('id');
            floatingCartItem.classList.remove('d-none');

            floatingCartItem.querySelector('.floating-cart-item-img').src = item.img;
            floatingCartItem.querySelector('.floating-cart-item-title').innerText = item.title;
            floatingCartItem.querySelector('.preview-quantity').innerText = item.quantity;
            floatingCartItem.querySelector('.preview-unit-price').innerText = item.price;
            floatingCartItem.querySelector('.preview-total-price').innerText = (item.price * item.quantity).toFixed(2);
            floatingCartItem.querySelector('.delete-preview-item').addEventListener('click', function() {
                FloatingCart.deleteCartItem(floatingCartItem, item);
            });
            
            previewItemList.appendChild(floatingCartItem);
        });
        this.updateFloatingCartQuantity()
    },

    deleteCartItem(element, product) {
        let cartProducts = JSON.parse(localStorage.getItem('products')); 
        element.remove();
        cartProducts.splice(cartProducts.indexOf(cartProducts.find(el => el.id === product.id)), 1);
        localStorage.setItem('products', JSON.stringify(cartProducts));
        this.updateFloatingCart();
        CartPreview.update();
    },

    updateFloatingCartQuantity() {
        let quantity = document.querySelector('.floating-cart-number');
        let quantityNotification = document.querySelector('.floating-cart-notification');
        let totalQuantity = 0;
        JSON.parse(localStorage.getItem('products')).forEach(product => totalQuantity += Number(product.quantity));
        quantity.innerText = totalQuantity;
        quantityNotification.innerText = totalQuantity;
        this.updateSubtotal();
    },

    updateSubtotal() {
        let cartProducts = JSON.parse(localStorage.getItem('products')); 
        let subtotal=0;
        cartProducts.forEach(product => subtotal += product.price * product.quantity);
        document.querySelector('.floating-cart-subtotal').innerText = subtotal.toFixed(2);
    }
}