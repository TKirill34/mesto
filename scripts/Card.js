const popupImages = document.querySelector('.popup-image');
const imagesCard = popupImages.querySelector('.popup-image__foto');
const imagesCardName = popupImages.querySelector('.popup-image__name');

class Card {
	constructor(name, link, templateSelector, openPopup) {
		this._name = name;
		this._link = link;
		this._templateSelector = templateSelector;
		this._openPopup = openPopup;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.element')
			.cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();

		this._cardImage = this._element.querySelector('.element__foto');
		this._element.querySelector('.element__name').textContent = this._name;
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;

		this._setEventListeners();
		return this._element;
	}

	_handlePictureView() {
		this._openPopup(popupImages);
		imagesCard.src = this._link;
		imagesCard.alt = this._name;
		imagesCardName.textContent = this._name;
	}

	_handlePictureLike() {
		this._element.querySelector('.element__item').classList.toggle('element__item_active');
	}

	_handleDeleteCard() {
		this._element.remove();
		this._element = null;
	}

	_setEventListeners() {
		this._element.querySelector('.element__item').addEventListener('mousedown', () => {
			this._handlePictureLike();
		});

		this._element.querySelector('.element__trash').addEventListener('mousedown', () => {
			this._handleDeleteCard();
		});

		this._element.querySelector('.element__foto').addEventListener('mousedown', () => {
			this._handlePictureView();
		})
	}
};

export default Card;