window.addEventListener("resize", () => {
    if ((document.documentElement.offsetWidth > 767) && (header.classList.contains("header__burger-active"))) {
        menuClose();
    }
});

burgerMenu.addEventListener("click", () => {
    if (burgerMenu.classList.contains("burger-menu__burger-active")) {
        header.classList.add("header__menu-close");
        burgerMenu.classList.add("burger-menu__transform-right");
        burgerMenu.addEventListener("animationend", menuClose);
        return;
    }
    document.body.classList.add("body-hide");
    startScreenContent.style.marginTop = `${startScreenContent.getBoundingClientRect().top - parseInt(getComputedStyle(startScreen).paddingTop) + window.pageYOffset}px`;
    veil.classList.add("veil__darken");
    header.classList.add("header__burger-active");
    header.classList.add("header__menu-open");
    logotype.classList.add("logo__burger-active");
    navigation.classList.add("nav-menu__burger-active");
    burgerMenu.classList.add("burger-menu__burger-active");
    burgerMenu.classList.add("burger-menu__transform-left");

    window.addEventListener("click", toch);
});

function toch(event) {
    if (event.target === veil) {
        softCloseMenu();
    } else if (event.target.closest(".logo") && header.classList.contains("header__burger-active")) {
        softCloseMenu();
    } else if (event.target.closest(".nav-menu .nav-menu-active") && header.classList.contains("header__burger-active")) {
        softCloseMenu();
    } else if (event.target.closest(".nav-menu>a") && !event.target.closest(".nav-menu-active")) {
        menuClose();
    }
}

function menuClose() {
    document.body.classList.remove("body-hide");
    startScreenContent.style.marginTop = `0`;
    veil.classList.remove("veil__darken");
    header.classList.remove("header__menu-open");
    header.classList.remove("header__menu-close");
    header.classList.remove("header__burger-active");
    logotype.classList.remove("logo__burger-active");
    navigation.classList.remove("nav-menu__burger-active");
    burgerMenu.classList.remove("burger-menu__burger-active");
    burgerMenu.classList.remove("burger-menu__transform-left");
    burgerMenu.classList.remove("burger-menu__transform-right");

    window.removeEventListener("click", toch);
    burgerMenu.removeEventListener("animationend", menuClose);
}

function softCloseMenu() {
    header.classList.add("header__menu-close");
    burgerMenu.classList.add("burger-menu__transform-right");
    burgerMenu.addEventListener("animationend", menuClose);
}