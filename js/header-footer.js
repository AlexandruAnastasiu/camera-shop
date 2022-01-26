class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!--Navbar-->
        <nav class="navbar navbar-expand-md navbar-light m-0 p-0">
          <div class="nav-container container-fluid bg-dark px-4">
              <a href="/index.html" class="navbar-brand">
                  <span class="fw-bold text-secondary">
                      <img src="/img/logo.png" alt="logo" class="img-fluid" width="300px">
                  </span>
              </a>
              <!--Toggle button for mobile nav-->
              <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                  <i class="text-white fs-1 bi bi-list"></i></span>
              </button>
      
              <!--Navbar Links-->
              <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                  <ul class="navbar-nav container-fluid d-flex justify-content-end align-items-center fs-5">
                      <li class="nav-item">
                          <a class="nav-link text-white" href="/index.html#featured-products">SHOP</a>
                      </li>
                      <li class="nav-item text-white">
                          <a class="nav-link text-white" href="#contact">ABOUT</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link text-white" href="#contact">CONTACT</a>
                      </li>
                      <li class="nav-item">
                        <button class="btn btn-shopping-cart d-lg-none search-big-btn">
                          <i class="bi bi-search cart-logo fs-2"></i>
                        </button>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="cart.html">
                              <button class="btn btn-shopping-cart position-relative">
                                  <i class="bi bi-cart4 fs-2 cart-logo"></i>
                                  <p class="bg-danger text-white rounded-circle cart-pop px-2 d-none"></p>
                              </button>
                          </a>
                      </li>
                  </ul>
              </div>
          </div>
        </nav>
        <!--Searchbar-->
        <div id="search-bar" class="search-wrapper container-fluid d-none d-lg-block p-0 mx-5">
          <div class="search-input">
            <div class="form"> <input type="text" id="search" class="form-control form-input search-bar" placeholder="Search anything..."></div>
            <span class="search-logo"><i class="bi bi-search"></i></span>
            <div class="autocomplete-box d-none">
              <li id="default-suggestion" class="suggestion d-none"><a class="text-dark text-decoration-none" href="#"></a></li>
            </div>
          </div>
        </div>
        <!--Searchbar-->`
    };
};
customElements.define('custom-header', CustomHeader);

class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Footer -->
        <footer id="contact" class="bg-dark text-center text-white" style="background-image: url(/img/footer.jpg)">
            <!-- Grid container -->
            <div class="container p-4">
            <!-- Section: Social media -->
            <section class="mb-4">
                <!-- Facebook -->
                <a class="text-white m-1 mx-3 fs-3" href="#!" role="button"
                ><i class="bi bi-facebook"></i></a>
        
                <!-- Twitter -->
                <a class="text-white m-1 fs-3" href="#!" role="button"
                ><i class="bi bi-twitter"></i></a>
        
                <!-- Google -->
                <a class="text-white m-1 mx-3 fs-3" href="#!" role="button"
                ><i class="bi bi-google"></i></a>
        
                <!-- Instagram -->
                <a class="text-white m-1 mx-3 fs-3" href="#!" role="button"
                ><i class="bi bi-instagram"></i></a>
        
                <!-- Linkedin -->
                <a class="text-white m-1 mx-3 fs-3" href="#!" role="button"
                ><i class="bi bi-linkedin"></i></a>
        
                <!-- Github -->
                <a class="text-white m-1 mx-3 fs-3" href="https://github.com/AlexandruAnastasiu" role="button"
                ><i class="bi bi-github"></i></a>
            </section>
            <!-- Section: Social media -->
        
            <!-- Section: Form -->
            <section class="mb-4">
                <form action="">
                <!--Grid row-->
                <div class="row d-flex justify-content-center">
                    <!--Grid column-->
                    <div class="col-auto">
                    <p class="pt-2">
                        <strong>Sign up for our newsletter</strong>
                    </p>
                    </div>
                    <!--Grid column-->
        
                    <!--Grid column-->
                    <div class="col-md-5 col-12">
                    <!-- Email input -->
                    <div class="form-outline form-white mb-4">
                        <input type="email" id="form5Example21" class="form-control" />
                        <label class="form-label" for="form5Example21">Email address</label>
                    </div>
                    </div>
                    <!--Grid column-->
        
                    <!--Grid column-->
                    <div class="col-auto">
                    <!-- Submit button -->
                    <button type="submit" class="btn btn-outline-light mb-4">
                        Subscribe
                    </button>
                    </div>
                    <!--Grid column-->
                </div>
                <!--Grid row-->
                </form>
            </section>
            <!-- Section: Form -->
        
            <!-- Section: Links -->
            <section class="">
                <!--Grid row-->
                <div class="row">
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-start">
                    <h5 class="text-uppercase">Comenzi si Livrare</h5>
        
                    <ul class="list-unstyled mb-0 d-flex flex-column align-items-start">
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Cum comand</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Cum se livreaza</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Cum platesc</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Vanzari Corporate</a>
                    </li>
                    </ul>
                </div>
                <!--Grid column-->
        
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-start">
                    <h5 class="text-uppercase">Suport</h5>
        
                    <ul class="list-unstyled mb-0 d-flex flex-column align-items-start">
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Contact</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Suport Clienti</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Garantie</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Cariere</a>
                    </li>
                    </ul>
                </div>
                <!--Grid column-->
        
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-start">
                    <h5 class="text-uppercase">Service si garantii</h5>
        
                    <ul class="list-unstyled mb-0 d-flex flex-column align-items-start">
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Service si garantii</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Returnare</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">ANPC</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">ODR</a>
                    </li>
                    </ul>
                </div>
                <!--Grid column-->
        
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-start">
                    <h5 class="text-uppercase">Retro Memories Studio</h5>
        
                    <ul class="list-unstyled mb-0 d-flex flex-column align-items-start">
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Blog Retro Memories</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Concurs Retro Memories</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Termeni si conditii</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white text-decoration-none">Prelucrarea datelor</a>
                    </li>
                    </ul>
                </div>
                <!--Grid column-->
                </div>
            </section>
            </div>
            <div class="text-center p-3 bg-dark">
            © 2021 Copyright: Retro Memories
            </div>
        </footer>`
    };
};
customElements.define('custom-footer', CustomFooter);

let CartPreview = {
    update() {
        let productsInCart = JSON.parse(localStorage.getItem('products'));
        const cartPop = document.querySelector('.cart-pop');
        
        let total = 0;
        productsInCart.forEach(product => {
            total += Number(product.quantity);
        });

        cartPop.innerText = total;

        if(total > 0) {
            cartPop.classList.remove('d-none');
            cartPop.innerText = total;
        } else {
            cartPop.classList.add('d-none');
        };
    }
}

let autocompleteBox = document.querySelector('.autocomplete-box');
let menuBtn = document.querySelector('.navbar-toggler');

let SearchBar = {
    listOfSuggestions: [],

    init() {
        let searchBar = document.querySelector('#search-bar');
        let searchInput = document.querySelector('.search-bar');
        let searchBigBtn = document.querySelector('.search-big-btn');

        searchInput.addEventListener('keyup', function(e) {
            SearchBar.autocomplete(e.target.value);
        })

        searchBigBtn.addEventListener('click', function() {
            if (searchBar.classList.contains('d-none')) {
                searchBar.classList.remove('d-none');
            } else {
                searchBar.classList.add('d-none');
            }
        });

        document.addEventListener('click', function(e) {
            if (e.target.id == 'search') {
                SearchBar.autocomplete(e.target.value);
            } else {
                autocompleteBox.classList.add('d-none');
            }
        });

        menuBtn.addEventListener('click', function() {
            if (menuBtn.getAttribute('aria-expanded')) {
                searchBar.classList.add('d-none');
            }
        });

        this.listOfSuggestions = JSON.parse(localStorage.getItem('suggestions'));  
    },

    autocomplete(word) {
        let suggestionTemplate = document.querySelector('#default-suggestion');

        if (word.length > 0) {
            wordsArray = word.trim().split(" ");

            let displayedSuggestions = Array.from(this.listOfSuggestions)
                .filter(suggestion => {
                    let valid = false;
                    
                    wordsArray.forEach(token => {
                        if (suggestion.toLowerCase().includes(token.toLowerCase())) {
                            valid = true;
                        }
                    });
                    return valid;
                })

            while(!autocompleteBox.lastElementChild.hasAttribute('id')) {
                    autocompleteBox.lastElementChild.remove();
            };
    
            displayedSuggestions.forEach(suggestion => { 
                let newSuggestionElement = suggestionTemplate.cloneNode(true);
                if (suggestion.startsWith('Category:')) {
                    newSuggestionElement.querySelector('a').href = `/index.html#${suggestion.replace('Category: ', '').toLowerCase()}`;
                } else {
                    newSuggestionElement.querySelector('a').href = `/index.html?product=${suggestion}`;
                }
                newSuggestionElement.querySelector('a').innerText = suggestion;
                newSuggestionElement.removeAttribute('id');
                newSuggestionElement.classList.remove('d-none');
                autocompleteBox.appendChild(newSuggestionElement);
            });

            if (displayedSuggestions.length > 0) {
                autocompleteBox.classList.remove('d-none');
            } else {
                autocompleteBox.classList.add('d-none');
            }
            
        } else {
            while(!autocompleteBox.lastElementChild.hasAttribute('id')) {
                autocompleteBox.lastElementChild.remove();
            };
            autocompleteBox.classList.add('d-none');
        }
    }
}
