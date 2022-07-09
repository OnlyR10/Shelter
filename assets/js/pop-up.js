function createPopUp(popUp, card) {
    document.body.classList.add("body-hide");
    veil.classList.add("veil__darken");
    popUp.classList.add("pop-up_active");

    const cardName = card.querySelector(".card-name").textContent;
    const desiredCard = pets.find((elem) => elem.name === cardName);

    const image = document.createElement("img");
    image.setAttribute("src", desiredCard.img);
    image.setAttribute("alt", cardName);
    image.classList.add("modal-window__pets-img");
    modalWindow.append(image);

    const modalWindowContent = document.createElement("div");
    modalWindowContent.classList.add("modal-window__content");

    const content = document.createElement("div");
    content.classList.add("content");

    const contentTitle = document.createElement("h3");
    contentTitle.classList.add("content_title");

    const contentSubtitle = document.createElement("h4");
    contentSubtitle.classList.add("content_subtitle");

    const contentText = document.createElement("p");
    contentText.classList.add("content_text");

    const contentList = document.createElement("ul");
    contentList.classList.add("content_lists");

    contentTitle.textContent = cardName;
    contentSubtitle.textContent = `${desiredCard.type} - ${desiredCard.breed}`;
    contentText.textContent = desiredCard.description;

    const keysOfObject = Object.keys(desiredCard);

    for (i = 0; i < keysOfObject.length; i++) {
        switch (keysOfObject[i]) {
            case "name":
            case "img":
            case "type":
            case "breed":
            case "description":
                break;
            default:
                const list = document.createElement("li");
                list.innerHTML = `<b>${keysOfObject[i][0].toLocaleUpperCase() + keysOfObject[i].slice(1)}:</b> ${desiredCard[keysOfObject[i]]}`;
                contentList.append(list);
        }
    }

    content.append(contentTitle);
    content.append(contentSubtitle);
    content.append(contentText);
    content.append(contentList);
    modalWindowContent.append(content);
    modalWindow.append(modalWindowContent);
    popUp.classList.remove("hidden");

    window.addEventListener("click", closePopap);


    function closePopap(event) {
        if (event.target === veil || event.target.closest(".pop-up__close") || event.target === popUp) {
            window.removeEventListener("click", closePopap);
            document.body.classList.remove("body-hide");
            veil.classList.remove("veil__darken");
            popUp.classList.remove("pop-up_active");
            modalWindow.innerHTML = "";
            popUp.classList.add("hidden");
        }
    }
}