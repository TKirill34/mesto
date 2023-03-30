import initialCards from './cards.js';
import Card from './Card.js';
import { validationOptions, FormValidator } from './FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close');

const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = popupProfile.querySelector('.popup__form-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const inputProfileName = popupProfile.querySelector('.popup__input_profile_name');
const inputProfileJob = popupProfile.querySelector('.popup__input_profile_profession');

const popupAddCard = document.querySelector('.popup_type_add');
const formAddCard = popupAddCard.querySelector('.popup__form_add-card');
const inputNameFormCard = popupAddCard.querySelector('.popup__input_add-name');
const inputLinkFormCard = popupAddCard.querySelector('.popup__input_add-foto');

export const popupImage = document.querySelector('.popup_type_image');
export const imageCard = popupImage.querySelector('.popup__image-foto');
export const imageCardName = popupImage.querySelector('.popup__image-name');

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

buttonsClose.forEach((button) => {
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

buttonEditProfile.addEventListener('click', () => {
	openPopup(popupProfile);
	inputProfileName.value = profileName.textContent;
	inputProfileJob.value = profileJob.textContent;
	formValidatorProfileForm.hiddenAllErrors();
});

function handleProfileFormSubmit(evt) {
	evt.preventDefault()
	profileName.textContent = inputProfileName.value;
	profileJob.textContent = inputProfileJob.value;
	closePopup(popupProfile);
};

formProfile.addEventListener('submit', handleProfileFormSubmit);

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
	const newCard = createCard(inputNameFormCard.value, inputLinkFormCard.value, '#template-element', openPopup);
	formValidatorAddForm.disableButton();
	elementCards.prepend(newCard);
	formAddCard.reset();
	closePopup(popupAddCard);
};

buttonAddCard.addEventListener('click', () => {
	openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', addNewCard);

const formValidatorProfileForm = new FormValidator(validationOptions, formProfile);
formValidatorProfileForm.enableValidation();

const formValidatorAddForm = new FormValidator(validationOptions, formAddCard);
formValidatorAddForm.enableValidation();