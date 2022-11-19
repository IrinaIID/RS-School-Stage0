let burgerButton = document.querySelector('.burger-botton');
let allPopUp = document.querySelector('.all-popUp')
let popUpMobile = document.querySelector('.popUp-mobile');
let closePopUp = document.querySelector('#close-popUp-mobile');

burgerButton.addEventListener('click', function () {
    allPopUp.classList.add('all-popUp-active');
});

closePopUp.addEventListener('click', function () {
    allPopUp.classList.remove('all-popUp-active');
});


// закрытие при нажатиивне меню

window.addEventListener('click', function(e) {
    if (e.target == allPopUp) {
        allPopUp.classList.remove('all-popUp-active');
    }
});



let ulBurger = document.querySelector('.burger-ul'); 
Array.from(ulBurger.children).forEach(li => {
    li.addEventListener('click', e => {
        allPopUp.classList.remove('all-popUp-active');
    })
});



// travel-part3

const buttonLogin = document.querySelector('.login-button');
const buttonAccount = document.querySelector('.account-link-in-burger');
const allLoginPopUp = document.querySelector('.logIn-popUp-all');

// открытие logIn popUp
buttonLogin.addEventListener('click', function() {
    allLoginPopUp.classList.add('logIn-popUp-all-active');
});

buttonAccount.addEventListener('click', function() {
    allLoginPopUp.classList.add('logIn-popUp-all-active');
});

// закрытие при нажатие вне popUp LogIn
window.addEventListener('click', function(e) {
    if (e.target == allLoginPopUp) {
        allLoginPopUp.classList.remove('logIn-popUp-all-active');
    }
});

// alert при нажатии SingIn
const email = document.querySelector('.email-input');
const password = document.querySelector('.password-input');
const buttonSingIn = document.querySelector('.submit-singIn-botton');

buttonSingIn.addEventListener('click', function() {
    alert(`Email: ${email.value}   Password: ${password.value}`);
});

// смена на registr
const buttonRegister = document.querySelector('.registr-span');
const allAccountPopUp = document.querySelector('.account-popUp-all');

buttonRegister.addEventListener('click', function() {
    allLoginPopUp.classList.remove('logIn-popUp-all-active');
    allAccountPopUp.classList.add('account-popUp-all-active');
})

// закрытие при нажатие вне popUp Account 
window.addEventListener('click', function(e) {
    if (e.target == allAccountPopUp) {
        allAccountPopUp.classList.remove('account-popUp-all-active');
    }
});

// возврат к LogInPoup
const buttonReturnLogin = document.querySelector('.registr-login-span');

buttonReturnLogin.addEventListener('click', function() {
    allAccountPopUp.classList.remove('account-popUp-all-active');
    allLoginPopUp.classList.add('logIn-popUp-all-active');
});



// slider desktop

const trackSlides = document.querySelector('.all-slides');

const slide1 = document.querySelector('.slide1');
const slide2 = document.querySelector('.slide2');
const slide3 = document.querySelector('.slide3');

const dot1 = document.querySelector('.dot1');
const dot2 = document.querySelector('.dot2');
const dot3 = document.querySelector('.dot3');

let currentTrack = 0;

slide1.addEventListener('click', function() {
    trackSlides.style.transform = 'translate(560px)';
    currentTrack = 560;
    changeDesctopDots();
});

slide2.addEventListener('click', function() {
    trackSlides.style.transform = 'translate(0px)';
    currentTrack = 0;
    changeDesctopDots();
});

slide3.addEventListener('click', function() {
    trackSlides.style.transform = 'translate(-560px)';
    currentTrack = -560;
    changeDesctopDots();
});


// slider mobile

const trackMobileSlides = document.querySelector('.all-slides-mobile');
const nextArrow = document.querySelector('.arrow-next');
const prevAroow = document.querySelector('.aroow-prev');
const dotsArr = document.querySelectorAll('.dot');

let currentTransform = 0;

nextArrow.addEventListener('click', function() {
    currentTransform -= 390;
    if (currentTransform >= -780) {
        trackMobileSlides.style.transform = `translateX(${currentTransform}px)`;
    } else {
        trackMobileSlides.style.transform = 'translateX(0px)';
        currentTransform = 0;
    }
    changeColorDot()
});

prevAroow.addEventListener('click', function() {
    if (currentTransform == 0) {
        trackMobileSlides.style.transform = 'translateX(-780px)';
        currentTransform = -780;
    } else {
        currentTransform += 390;
        trackMobileSlides.style.transform = `translateX(${currentTransform}px)`;
    }
    changeColorDot()
});

// переключение точек для mobile and desctop

dot1.addEventListener('click', function() {
    trackMobileSlides.style.transform = 'translateX(0px)';
    trackSlides.style.transform = 'translate(560px)';
    currentTransform = 0;
    currentTrack = 560;
    changeColorDot();
    changeDesctopDots();
});

dot2.addEventListener('click', function() {
    trackMobileSlides.style.transform = 'translateX(-390px)';
    trackSlides.style.transform = 'translate(0px)';
    currentTransform = -390;
    currentTrack = 0;
    changeColorDot();
    changeDesctopDots();
});

dot3.addEventListener('click', function() {
    trackMobileSlides.style.transform = 'translateX(-780px)';
    trackSlides.style.transform = 'translate(-560px)';
    currentTransform = -780;
    currentTrack = -560;
    changeColorDot();
    changeDesctopDots();
});

const changeDesctopDots = () => {
    dotsArr.forEach((dot) => {
        dot.classList.remove('dot-active');
    });
    if (currentTrack === 560) {
        dot1.classList.add('dot-active');
    } else if (currentTrack === 0) {
        dot2.classList.add('dot-active');
    } else {
        dot3.classList.add('dot-active');
    }
};

const changeColorDot = () => {
    dotsArr.forEach((dot) => {
        dot.classList.remove('dot-active-mobile');
    });
    if (currentTransform === 0) {
        dot1.classList.add('dot-active-mobile');
    } else if (currentTransform === -390) {
        dot2.classList.add('dot-active-mobile');
    } else {
        dot3.classList.add('dot-active-mobile');
    }
};

console.log('1. Слайдер изображений в секции destinations +50\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +20')