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
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const closeProfileButton = popupProfile.querySelector(".popup__close-profile");
const formProfile = popupProfile.querySelector(".popup__form-profile");
const nameInput = popupProfile.querySelector(".popup__input_profile_name");
const jobInput = popupProfile.querySelector(".popup__input_profile_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
const closeButtonAddCard = popupAddCard.querySelector(".popup__close_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form_add-card");
const nameAdd = popupAddCard.querySelector(".popup__input_add-name");
const linkAdd = popupAddCard.querySelector(".popup__input_add-foto");
const popupImages = document.querySelector('.popup-image');
const images = popupImages.querySelector('.popup-image__foto');
const imagesName = popupImages.querySelector('.popup-image__name');
const closePopupImages = popupImages.querySelector('.popup__close-image');
const elementCards = document.querySelector('.elements');
const elementTemplate = document.getElementById('element').content;

const toggleOpenPopup = () => {
	popupProfile.classList.toggle('popup_opened');
}

const openPopupAdd = () => {
	popupAddCard.classList.toggle('popup_opened');
}

const closePopupImage = () => {
	popupImages.classList.remove('popup_opened');
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

const handleDelete = (evt) => {
	evt.target.closest('.element').remove();
};

const openFoto = (evt) => {
	evt.preventDefault();
	popupImages.classList.add('popup_opened');
	images.src = evt.target.closest('.element__foto').src;
	imagesName.textContent = evt.target.closest('.element').textContent;
}

initialCards.forEach(function (element) {
	const cardElements = elementTemplate.cloneNode(true);
	cardElements.querySelector('.element__foto').src = element.link;
	cardElements.querySelector('.element__name').textContent = element.name;

	const trushButton = cardElements.querySelector('.element__trash');
	trushButton.addEventListener('click', handleDelete);

	cardElements.querySelector('.element__item').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__item_active');
	});

	const foto = cardElements.querySelector('.element__foto');
	foto.addEventListener('click', openFoto);

	elementCards.append(cardElements)
})

function addCardSubmit(evt) {
	evt.preventDefault();
	const cardElements = elementTemplate.cloneNode(true);
	cardElements.querySelector('.element__foto').src = linkAdd.value;
	cardElements.querySelector('.element__name').textContent = nameAdd.value;
	const trushButton = cardElements.querySelector('.element__trash');
	trushButton.addEventListener('click', handleDelete);
	cardElements.querySelector('.element__item').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__item_active');
	});
	const foto = cardElements.querySelector('.element__foto');
	foto.addEventListener('click', openFoto);
	elementCards.prepend(cardElements)
	linkAdd.value = '';
	nameAdd.value = '';

	openPopupAdd();
}

editButton.addEventListener('click', handleEditButtonClick);
closeProfileButton.addEventListener('click', toggleOpenPopup);
formProfile.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', openPopupAdd);
formAddCard.addEventListener('submit', addCardSubmit);
closeButtonAddCard.addEventListener('click', openPopupAdd);
closePopupImages.addEventListener('click', closePopupImage);