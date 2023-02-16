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
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__input_profile_name");
const jobInput = popup.querySelector(".popup__input_profile_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add_card");
const closeButtonAddCard = document.querySelector(".popup__close_add_element");
const formAddCard = document.querySelector(".popup__form_add_element");
const LinkAdd = document.querySelector(".popup__input_element_foto");
const NameAdd = document.querySelector(".popup__input_element_name");

const ElementCards = document.querySelector('.elements');
const ElementTemplate = document.getElementById('element').content;

const popupImages = document.querySelector('.popup-image');
const images = document.querySelector('.popup-image__foto');
const imagesName = document.querySelector('.popup-image__name');
const closePopupImages = document.querySelector('.popup-image__close');

const handleDelete = (evt) => {
	evt.target.closest('.element').remove();
};

const OpenFoto = (evt) => {
	evt.preventDefault();
	popupImages.classList.toggle('popup-image_opened');
	images.src = evt.target.closest('.element__foto').src;
	imagesName.textContent = evt.target.closest('.element').textContent;
}

initialCards.forEach(function (element) {
	const cardElements = ElementTemplate.cloneNode(true);
	cardElements.querySelector('.element__foto').src = element.link;
	cardElements.querySelector('.element__name').textContent = element.name;

	const trushButton = cardElements.querySelector('.element__trash');
	trushButton.addEventListener('click', handleDelete);

	cardElements.querySelector('.element__item').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__item_active');
	});

	const Foto = cardElements.querySelector('.element__foto');
	Foto.addEventListener('click', OpenFoto);

	ElementCards.append(cardElements)
})

const toggleOpenPopup = () => {
	popup.classList.toggle('popup_opened');
}

const OpenPopupAdd = () => {
	popupAddCard.classList.toggle('popup_opened');
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

function addCardSubmit(evt) {
	evt.preventDefault();
	const cardElements = ElementTemplate.cloneNode(true);
	cardElements.querySelector('.element__foto').src = LinkAdd.value;
	cardElements.querySelector('.element__name').textContent = NameAdd.value;
	const trushButton = cardElements.querySelector('.element__trash');
	trushButton.addEventListener('click', handleDelete);
	cardElements.querySelector('.element__item').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__item_active');
	});
	const Foto = cardElements.querySelector('.element__foto');
	Foto.addEventListener('click', OpenFoto);
	ElementCards.prepend(cardElements)
	LinkAdd.value = '';
	NameAdd.value = '';

	OpenPopupAdd();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', toggleOpenPopup);
formAddCard.addEventListener('submit', addCardSubmit);
addButton.addEventListener('click', OpenPopupAdd);
closeButtonAddCard.addEventListener('click', OpenPopupAdd);
closePopupImages.addEventListener('click', OpenFoto);