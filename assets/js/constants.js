const veil = document.querySelector("#veil");
const mediaMobile = window.matchMedia('(max-width: 767px)');
const mediaTablet = window.matchMedia('(max-width: 1279px)');
const mediaDesktop = window.matchMedia('(min-width: 1280px)');


/* -----------Menu------------------ */
const header = document.querySelector(".header");
const logotype = document.querySelector(".logo");
const burgerMenu = document.querySelector(".burger-menu");
const navigation = document.querySelector(".nav-menu");

// Main
const startScreen = document.querySelector(".start-screen");
const startScreenContent = document.querySelector(".start-screen-content");
// Our Pets
const headerContainer = document.querySelector(".header-container");
const petsContainer = document.querySelector(".our-pets #pets-container");
/* -----------Menu------------------ */


/* -----------Pop-Up------------------ */
const popUpClose = document.querySelector(".pop-up__close");
const modalWindow = document.querySelector(".pop-up__modal-window");

// Main
const mainPopUp = document.querySelector("#pets-container .pop-up");
// Our Pets
const ourPetsPopUp = document.querySelector(".our-pets .pop-up");
/* -----------Pop-Up------------------ */


/* -----------Carousel------------------ */
const leftArrow = document.querySelector(".slider-arrow-left");
const rightArrow = document.querySelector(".slider-arrow-right");
const cardsContainer = document.querySelector(".cards-container");
/* -----------Carousel------------------ */


/* -----------Pagination------------------ */
const btnDoubleLeft = document.querySelector("#btnDoubleLeft");
const btnLeft = document.querySelector("#btnLeft");
const navigationNumber = document.querySelector(".navigation-number");
const btnRight = document.querySelector("#btnRight");
const btnDoubleRight = document.querySelector("#btnDoubleRight");
const pagination = document.querySelector(".pagination");
/* -----------Pagination------------------ */