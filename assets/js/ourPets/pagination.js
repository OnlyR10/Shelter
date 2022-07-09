btnRight.addEventListener("click", moveRight);
btnDoubleRight.addEventListener("click", scrollToEnd);
cardsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".card")) {
        createPopUp(ourPetsPopUp, event.target.closest(".card"));
    }
});
cardsContainer.addEventListener("animationend", closeAnimation);

const positionMemory = [null];
let previousPosition = 1;
let currentPosition = 1;
let maxPosition = null;
let btnTarget = null;
const numberPetsAtScreenSize1280 = 8;
const numberPetsAtScreenSize768 = 6;
const numberPetsAtScreenSize320 = 3;

let petSet = [];
for (let i = 0; i < 6; i++) {
    petSet = petSet.concat(pets.map((elem) => elem));
}

if (document.documentElement.offsetWidth >= 1280) {
    maxPosition = petSet.length / numberPetsAtScreenSize1280;
} else if (document.documentElement.offsetWidth >= 768) {
    maxPosition = petSet.length / numberPetsAtScreenSize768;
} else {
    maxPosition = petSet.length / numberPetsAtScreenSize320;
}

cardsInitialState();
cardsInitialState(1);
cardsInitialState();

function cardsInitialState(position) {
    if (position) {
        shuffle(petSet);
        const selectedPets = [];

        if (document.documentElement.offsetWidth >= 1280) {
            createPetsContainer(numberPetsAtScreenSize1280);
        } else if (document.documentElement.offsetWidth >= 768) {
            createPetsContainer(numberPetsAtScreenSize768);
        } else {
            createPetsContainer(numberPetsAtScreenSize320);
        }

        function createPetsContainer(numOfCards) {
            selectedPets.push(petSet[0]);
            petSet.splice(0, 1);
            for (let i = 1; i < numOfCards; i++) {
                selectedPets.push(petSet.find((pet) => {
                    return selectedPets.every((elem) => elem !== pet);
                }));
                const repeatingPet = petSet.indexOf(selectedPets[i]);
                petSet.splice(repeatingPet, 1);
            }
            createCards(numOfCards, position, selectedPets);
        }
    } else {
        if (document.documentElement.offsetWidth >= 1280) {
            createCards(numberPetsAtScreenSize1280);
        } else if (document.documentElement.offsetWidth >= 768) {
            createCards(numberPetsAtScreenSize768);
        } else {
            createCards(numberPetsAtScreenSize320);
        }
    }
}

function createCards(numOfCards, position, pets) {
    const container = document.createElement("div");

    if (position) {
        positionMemory[position] = container;
        container.classList.add(`cards-container-${position}`);
    } else {
        container.classList.add(`cards-container-empty`);
    }

    for (let i = 0; i < numOfCards; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        if (position) {
            image.setAttribute("src", pets[i].img);
            image.setAttribute("alt", pets[i].name);
        }
        image.setAttribute("width", 270);
        image.setAttribute("height", 270);
        image.classList.add("pets-img");

        const cardName = document.createElement("p");
        cardName.classList.add("card-name");
        if (position) {
            cardName.textContent = `${pets[i].name}`;
        }

        const btnCard = document.createElement("a");
        btnCard.classList.add("btn-card");
        btnCard.textContent = `Learn more`;

        card.append(image);
        card.append(cardName);
        card.append(btnCard);
        container.append(card);
    }

    if (previousPosition > currentPosition) {
        cardsContainer.prepend(container);
    } else {
        cardsContainer.append(container);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function scrollToStart() {
    if (currentPosition === 1) {
        return;
    }
    removeClickArrows();
    previousPosition = currentPosition;
    currentPosition = 1;
    navigationNumber.textContent = currentPosition;
    btnTarget = "left";
    document.querySelector(".cards-container > :first-child").remove();
    if (positionMemory[currentPosition]) {
        cardsContainer.prepend(positionMemory[currentPosition]);
    } else {
        cardsInitialState(currentPosition);
    }
    cardsContainer.classList.add("scroll-left__transform");
}

function moveLeft() {
    if (currentPosition === 1) {
        return;
    }
    removeClickArrows();
    previousPosition = currentPosition;
    currentPosition -= 1;
    navigationNumber.textContent = currentPosition;
    btnTarget = "left";
    document.querySelector(".cards-container > :first-child").remove();
    if (positionMemory[currentPosition]) {
        cardsContainer.prepend(positionMemory[currentPosition]);
    } else {
        cardsInitialState(currentPosition);
    }
    cardsContainer.classList.add("scroll-left__transform");
}

function moveRight() {
    if (currentPosition === maxPosition) {
        return;
    }
    removeClickArrows();
    previousPosition = currentPosition;
    currentPosition += 1;
    navigationNumber.textContent = currentPosition;
    btnTarget = "right";
    document.querySelector(".cards-container > :last-child").remove();
    if (positionMemory[currentPosition]) {
        cardsContainer.append(positionMemory[currentPosition]);
    } else {
        cardsInitialState(currentPosition);
    }
    cardsContainer.classList.add("scroll-right__transform");
}

function scrollToEnd() {
    if (currentPosition === maxPosition) {
        return;
    }
    removeClickArrows();
    previousPosition = currentPosition;
    currentPosition = maxPosition;
    navigationNumber.textContent = currentPosition;
    btnTarget = "right";
    document.querySelector(".cards-container > :last-child").remove();
    if (positionMemory[currentPosition]) {
        cardsContainer.append(positionMemory[currentPosition]);
    } else {
        cardsInitialState(currentPosition);
    }
    cardsContainer.classList.add("scroll-right__transform");
}

function closeAnimation() {
    switch (btnTarget) {
        case "left":
            document.querySelector(".cards-container > :last-child").remove();
            cardsInitialState();
            break;
        case "right":
            document.querySelector(".cards-container > :first-child").remove();
            cardsInitialState();
            break;
    }

    if (currentPosition === maxPosition) {
        arrowsAddInactiveState(btnRight, btnDoubleRight);
        arrowsRemoveNormalState(btnRight, btnDoubleRight)
        if (previousPosition === 1) {
            arrowsRemoveInactiveState(btnLeft, btnDoubleLeft);
            arrowsAddNormalState(btnLeft, btnDoubleLeft);
        }
    } else if (currentPosition === 1) {
        arrowsAddInactiveState(btnLeft, btnDoubleLeft);
        arrowsRemoveNormalState(btnLeft, btnDoubleLeft);
        if (previousPosition === maxPosition) {
            arrowsRemoveInactiveState(btnRight, btnDoubleRight);
            arrowsAddNormalState(btnRight, btnDoubleRight);
        }
    } else {
        arrowsRemoveInactiveState(btnLeft, btnDoubleLeft);
        arrowsRemoveInactiveState(btnRight, btnDoubleRight);
        arrowsAddNormalState(btnLeft, btnDoubleLeft);
        arrowsAddNormalState(btnRight, btnDoubleRight);
    }

    btnDoubleLeft.addEventListener("click", scrollToStart);
    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    btnDoubleRight.addEventListener("click", scrollToEnd);
    cardsContainer.classList.remove("scroll-left__transform");
    cardsContainer.classList.remove("scroll-right__transform");
}

function removeClickArrows() {
    btnDoubleLeft.removeEventListener("click", scrollToStart);
    btnLeft.removeEventListener("click", moveLeft);
    btnRight.removeEventListener("click", moveRight);
    btnDoubleRight.removeEventListener("click", scrollToEnd);
}

function arrowsAddNormalState(arrow, dblArrow) {
    arrow.classList.add("navigation-arrows-normal");
    dblArrow.classList.add("navigation-arrows-normal");
}

function arrowsRemoveNormalState(arrow, dblArrow) {
    arrow.classList.remove("navigation-arrows-normal");
    dblArrow.classList.remove("navigation-arrows-normal");
}

function arrowsAddInactiveState(arrow, dblArrow) {
    arrow.classList.add("navigation-arrows-inactive");
    dblArrow.classList.add("navigation-arrows-inactive");
}

function arrowsRemoveInactiveState(arrow, dblArrow) {
    arrow.classList.remove("navigation-arrows-inactive");
    dblArrow.classList.remove("navigation-arrows-inactive");
}