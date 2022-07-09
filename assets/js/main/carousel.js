leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);
cardsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".card")) {
        createPopUp(mainPopUp, event.target.closest(".card"));
    }
});
cardsContainer.addEventListener("animationend", closeAnimation);

const maxCardInContainer = 3;
let btnState = null;
cardsInitialState("center");
cardsInitialState("left");
cardsInitialState("right");


function cardsInitialState(turn) {
    const petSet = pets.map((elem) => elem);
    shuffle(petSet);
    const selectedPets = [];
    const centralContainer = Array.from(cardsContainer.querySelectorAll(".cards-container-center .card"));
    const leftContainer = Array.from(cardsContainer.querySelectorAll(".cards-container-left .card"));

    if (leftContainer.length) {
        createRightPetsContainer(maxCardInContainer);
    } else if (centralContainer.length) {
        createLeftPetsContainer(maxCardInContainer);
    } else {
        createCentralPetsContainer(maxCardInContainer);
    }

    function createRightPetsContainer(numOfCards) {
        const leftoverPetFilter = petSet.filter((pet) => {
            return (leftContainer.some((elem) => {
                return elem.querySelector(".card-name").textContent === pet.name;
            }));
        });
        createCards(numOfCards, turn, leftoverPetFilter);
    }

    function createLeftPetsContainer(numOfCards) {
        const leftoverPetFilter = petSet.filter((pet) => {
            return (centralContainer.every((elem) => {
                return elem.querySelector(".card-name").textContent !== pet.name;
            }));
        });
        shuffle(leftoverPetFilter);
        for (let i = 0; i < numOfCards; i++) {
            selectedPets.push(leftoverPetFilter[i]);
        }
        createCards(numOfCards, turn, selectedPets);
    }

    function createCentralPetsContainer(numOfCards) {
        for (let i = 0; i < numOfCards; i++) {
            selectedPets.push(petSet[i]);
        }
        createCards(numOfCards, turn, selectedPets);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function moveLeft(event) {
    cardsContainer.classList.add("left-arrow__transform");
    leftArrow.removeEventListener("click", moveLeft);
    rightArrow.removeEventListener("click", moveRight);
    btnState = "left";
}

function moveRight(event) {
    cardsContainer.classList.add("right-arrow__transform");
    leftArrow.removeEventListener("click", moveLeft);
    rightArrow.removeEventListener("click", moveRight);
    btnState = "right";
}

function createCards(maxCards, turn, pets) {
    const container = document.createElement("div");
    container.classList.add(`cards-container-${turn}`);

    for (let i = 0; i < maxCards; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.setAttribute("src", pets[i].img);
        image.setAttribute("alt", pets[i].name);
        image.setAttribute("width", 270);
        image.setAttribute("height", 270);
        image.classList.add("pets-img");

        const cardName = document.createElement("p");
        cardName.classList.add("card-name");
        cardName.textContent = `${pets[i].name}`;

        const btnCard = document.createElement("a");
        btnCard.classList.add("btn-card");
        btnCard.textContent = `Learn more`;

        card.append(image);
        card.append(cardName);
        card.append(btnCard);
        container.append(card);
    }

    if (turn === "left") {
        cardsContainer.prepend(container);
    } else {
        cardsContainer.append(container);
    }
}

function closeAnimation() {
    if (btnState === "left") {
        cardsContainer.querySelector(".cards-container-center").remove();
        cardsContainer.querySelector(".cards-container-right").remove();
        const leftContainer = cardsContainer.querySelector(".cards-container-left");
        leftContainer.classList.add("cards-container-center");
        leftContainer.classList.remove("cards-container-left");

    } else if (btnState === "right") {
        cardsContainer.querySelector(".cards-container-center").remove();
        cardsContainer.querySelector(".cards-container-left").remove();
        const rightContainer = cardsContainer.querySelector(".cards-container-right");
        rightContainer.classList.add("cards-container-center");
        rightContainer.classList.remove("cards-container-right");
    }

    cardsInitialState("left");
    cardsInitialState("right");

    cardsContainer.classList.remove("left-arrow__transform");
    cardsContainer.classList.remove("right-arrow__transform");
    leftArrow.addEventListener("click", moveLeft);
    rightArrow.addEventListener("click", moveRight);
}