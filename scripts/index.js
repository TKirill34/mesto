const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__input_profile_name");
const jobInput = popup.querySelector(".popup__input_profile_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const toggleOpenPopup = () => {
	popup.classList.toggle('popup_opened');
}

const handleEditButtonClick = () => {
	nameInput.value = profileName.textContent;
	jobInput.value = profileProfession.textContent;
	toggleOpenPopup();
}

function handleFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileProfession.textContent = jobInput.value;
	toggleOpenPopup();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', toggleOpenPopup);