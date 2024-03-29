import { popupImage, imageCard, imageCardName } from './index.js';

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
		this._openPopup(popupImage);
		imageCard.src = this._link;
		imageCard.alt = this._name;
		imageCardName.textContent = this._name;
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