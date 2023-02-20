const initialCards = [
	{
		name: 'Карачаево-Черкесия',
		link: 'https://images.unsplash.com/photo-1588584922681-745a2223f72c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
	},
	{
		name: 'Гора Эльбрус',
		link: 'https://images.unsplash.com/photo-1638989420853-a6437f7a0d2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80'
	},
	{
		name: 'Домбай',
		link: 'https://images.unsplash.com/photo-1617911478446-c7f1dd96966e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
	},
	{
		name: 'Пирамиды Гизы',
		link: 'https://images.unsplash.com/photo-1544815521-80841127c00f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1809&q=80'
	},
	{
		name: 'Статуя Свободы',
		link: 'https://images.unsplash.com/photo-1618494273308-8b6c35ca8a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
	},
	{
		name: 'Япония',
		link: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1506&q=80'
	}
];
const editProfileButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const formProfile = popupProfile.querySelector(".popup__form-profile");
const profileNameInput = popupProfile.querySelector(".popup__input_profile_name");
const profileJobInput = popupProfile.querySelector(".popup__input_profile_profession");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form_add-card");
const addCardNameInput = popupAddCard.querySelector(".popup__input_add-name");
const addCardLinkInput = popupAddCard.querySelector(".popup__input_add-foto");
const popupImages = document.querySelector('.popup-image');
const imagesCard = popupImages.querySelector('.popup-image__foto');
const imagesCardName = popupImages.querySelector('.popup-image__name');
const closeButtons = document.querySelectorAll('.popup__close');
const elementCards = document.querySelector('.elements');
const elementTemplate = document.getElementById('element').content;

function openPopup(popup) {
	popup.classList.add('popup_opened');
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup));
});

const handleEditButtonClick = () => {
	profileNameInput.value = profileName.textContent;
	profileJobInput.value = profileJob.textContent;
	openPopup(popupProfile);
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = profileNameInput.value;
	profileJob.textContent = profileJobInput.value;
	closePopup(popupProfile);
}

const handleOpenImageCard = (evt) => {
	evt.preventDefault();
	openPopup(popupImages);
	imagesCard.src = evt.target.closest('.element__foto').src;
	imagesCard.alt = evt.target.closest('.element').textContent;
	imagesCardName.textContent = evt.target.closest('.element').textContent;
}

const handleDeleteCard = (evt) => {
	evt.target.closest('.element').remove();
};

const handleAddButtonClick = () => {
	openPopup(popupAddCard);
}

const addNewCard = (item, container) => {
	const newAddCardElement = createCard(item);
	container.prepend(newAddCardElement);
}

function handleAddNewCardFormSubmit(evt) {
	evt.preventDefault();
	addNewCard((item = {
		name: addCardNameInput.value,
		link: addCardLinkInput.value
	}),
		elementCards)
	evt.target.reset();
	closePopup(popupAddCard);
};

const createCard = (item) => {
	const newCardElement = elementTemplate.cloneNode(true);
	const newElementImage = newCardElement.querySelector('.element__foto');
	newElementImage.src = item.link;
	newElementImage.alt = item.name;
	const newElementNameImage = newCardElement.querySelector('.element__name');
	newElementNameImage.textContent = item.name;
	const trushButton = newCardElement.querySelector('.element__trash');
	trushButton.addEventListener('click', handleDeleteCard);
	const likeButton = newCardElement.querySelector('.element__item');
	likeButton.addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__item_active');
	});
	newElementImage.addEventListener('click', handleOpenImageCard);
	return newCardElement;
}

initialCards.forEach(function (element) {
	const newCardElement = createCard(element)
	elementCards.append(newCardElement)
})

addCardButton.addEventListener('click', handleAddButtonClick);
popupAddCard.addEventListener('submit', handleAddNewCardFormSubmit)
editProfileButton.addEventListener('click', handleEditButtonClick);
formProfile.addEventListener('submit', handleProfileFormSubmit);