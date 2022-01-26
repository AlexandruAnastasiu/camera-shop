let selectCountyElement = document.querySelector('#select-county');
let selectCityElement = document.querySelector('#select-city');
let inputs = document.querySelectorAll('[required]');
let nextBtn = document.querySelector('#wp-shipping-details').querySelector('.next');
let notesBtn = document.querySelector('.notes-btn');
let notes = document.querySelector('.notes');

let ShippingDetailsForm = {
    patterns : {
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        fname: /^[a-z\s-]{2,20}$/i, lname: /^[a-z\s-]{2,20}$/i,
        address: /[\w',-\\/.\s]/,
        phone: /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/igm
    },

    isFormValid : {email: false, fname: false, lname: false, county: false, city: false, address: false, phone: false},

    init() {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });

        fetch('/assets/judete.json')            //populam optiunile pentru judet din fisierul json
        .then(response => response.json())
        .then(countyFile => {
            ShippingDetailsForm.populateCounties(countyFile.judete);
            selectCountyElement.addEventListener('change', function(e) {
                let countyName = e.target.value;
                ShippingDetailsForm.populateCity(countyFile.judete.find(county => county.nume == countyName).localitati)
            });
        });

        inputs.forEach(input =>{
            if (input.tagName == 'SELECT') {
                input.addEventListener('change', (e) => {
                    this.validate(e.target);
                    selectCityElement.removeAttribute('disabled');
                    if (selectCityElement.contains(selectCityElement.querySelector('[value="default"]'))) {
                        selectCityElement.querySelector('[value="default"]').remove();
                        this.validate(selectCityElement);
                    }
                });
            } else {
                input.addEventListener('keyup', (e) => {
                    this.validate(e.target);
                });
            }
        });

        nextBtn.addEventListener('click', function() {
            ShippingDetailsForm.validateForm();
        });

        notesBtn.addEventListener('click', function() {
            if (notes.classList.contains('d-none')) {
                notes.classList.remove('d-none');
                document.querySelector('.shipping-notes-logo').classList.add('rotateIcon');
            } else {
                notes.classList.add('d-none');
                document.querySelector('.shipping-notes-logo').classList.remove('rotateIcon');
            }
        });
    },

    populateCounties(countyList) {
        countyList.forEach(county => {
            let option = document.createElement('option');
            option.value = county.nume;
            option.innerText = county.nume;
            selectCountyElement.appendChild(option);
        });
    },

    populateCity(cityList) {
        while (selectCityElement.lastChild) {     //elibereaza vechea lista de optiuni pentru select city 
            selectCityElement.lastChild.remove();
        };
        cityList.forEach(city => {                              //adauga noua lista de optiuni pentru select city
            let option = document.createElement('option');
            option.value = city.nume;
            option.innerText = city.nume;
            selectCityElement.appendChild(option);
        });
    },

    validate(field) {
        let fieldName = field.attributes.name.value;

        if (field.tagName == 'SELECT') {
            if (field.value != "default") {
                ShippingDetailsForm.isFormValid[fieldName] = true;
                this.showValid(fieldName);
            } else {
                ShippingDetailsForm.isFormValid[fieldName] = false;
                this.showInvalid(fieldName);
            }
        } else if (field.value.length == 0){
            this.deactivateValidity(fieldName);
            ShippingDetailsForm.isFormValid[fieldName] = false; 
        } else if(this.patterns[fieldName].test(field.value)){
            ShippingDetailsForm.isFormValid[fieldName] = true;
            this.showValid(fieldName);
        } else {
            ShippingDetailsForm.isFormValid[fieldName] = false;
            this.showInvalid(fieldName);
        };
    },

    showValid(name) {
        document.querySelector(`#${name}-valid`).classList.remove('d-none');
        document.querySelector(`#${name}-invalid`).classList.add('d-none');
    },

    showInvalid(name) {
        document.querySelector(`#${name}-valid`).classList.add('d-none');
        document.querySelector(`#${name}-invalid`).classList.remove('d-none');
    },
    deactivateValidity(name) {
        document.querySelector(`#${name}-valid`).classList.add('d-none');
        document.querySelector(`#${name}-invalid`).classList.add('d-none');
    },

    validateForm() {
        let progressBarEl = document.querySelector('#shipping-details');
        let formInvalidMessage = document.querySelector('#form-invalid');
        let objectValue = Object.values(this.isFormValid);

        inputs.forEach(input => this.validate(input));
        inputs.forEach(input => {
            if (input.value.length == 0 || input.value == "default") {
                this.showInvalid(input.attributes.name.value);
            }
        });

        if(objectValue.includes(false)) {
            progressBarEl.classList.remove('active');
            progressBarEl.classList.add('pending');
            formInvalidMessage.classList.remove('d-none');
            nextBtn.setAttribute('valid', false);
            formInvalidMessage.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        } else {
            progressBarEl.classList.remove('pending');
            progressBarEl.classList.add('active');
            formInvalidMessage.classList.add('d-none');
            nextBtn.setAttribute('valid', true);
        }
    }
};