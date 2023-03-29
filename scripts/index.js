import initialCards from './cards.js';
import Card from './Card.js';
import { validationOptions, FormValidator } from './FormValidator.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const popupProfile = document.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.popup__form-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const profileNameInput = popupProfile.querySelector('.popup__input_profile_name');
const profileJobInput = popupProfile.querySelector('.popup__input_profile_profession');

const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form_add-card');
const addCardNameInput = popupAddCard.querySelector('.popup__input_add-name');
const addCardLinkInput = popupAddCard.querySelector('.popup__input_add-foto');

const elementCards = document.querySelector('.elements');
const forms = document.querySelectorAll('.popup__form');

initialCards.forEach((item) => {
	const card = createCard(item.name, item.link, '#template-element', openPopup);
	elementCards.append(card);
});

function openPopup(popup) {
	popup.classList.add('popup_opened');
	popup.addEventListener('click', closePopupOverlay);
	window.addEventListener('keydown', closePopupEscape);
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	popup.removeEventListener('click', closePopupOverlay);
	window.removeEventListener('keydown', closePopupEscape);
};

closeButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup));
});

const closePopupOverlay = (evt) => {
	if (evt.target === evt.currentTarget) {
		const popupOpened = document.querySelector('.popup_opened');
		closePopup(popupOpened);
	}
};

function closePopupEscape(evt) {
	if (evt.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		closePopup(popupOpened);
	}
};

editProfileButton.addEventListener('click', () => {
	openPopup(popupProfile);
	profileNameInput.value = profileName.textContent;
	profileJobInput.value = profileJob.textContent;
});

function handleProfileFormSubmit(evt) {
	evt.preventDefault()
	profileName.textContent = profileNameInput.value;
	profileJob.textContent = profileJobInput.value;
	closePopup(popupProfile);
};

forms.forEach((formElement) => {
	const validator = new FormValidator(validationOptions, formElement);
	validator.enableValidation();
});

function createCard(name, link, template, func) {
	const card = new Card(name, link, template, func);
	return card.generateCard();
};

function addNewCard(evt) {
	evt.preventDefault();
	const newCard = createCard(addCardNameInput.value, addCardLinkInput.value, '#template-element', openPopup);
	const formValidator = new FormValidator(validationOptions, formAddCard);
	formValidator.disableSubmitButton();
	elementCards.prepend(newCard);
	formAddCard.reset();
	closePopup(popupAddCard);
};

addCardButton.addEventListener('click', () => {
	openPopup(popupAddCard);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addNewCard);