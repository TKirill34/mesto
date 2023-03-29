const validationOptions = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit',
	disabledButtonSelector: 'popup__submit_disabled',
	inputErrorSelector: 'popup__message_type-error',
	spanErrorSelector: 'popup__message-error_active'
};

class FormValidator {
	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
		this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
		this._buttonElement = formElement.querySelector(this._config.submitButtonSelector);
	}

	_showInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._config.inputErrorSelector);
		errorElement.classList.add(this._config.spanErrorSelector);
		errorElement.textContent = inputElement.validationMessage;
	}

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._config.inputErrorSelector);
		errorElement.classList.remove(this._config.spanErrorSelector);
		errorElement.textContent = '';
	}

	_checkValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}

	disableButton() {
		this._buttonElement.classList.add(this._config.disabledButtonSelector);
		this._buttonElement.setAttribute('disabled', true);
	}

	_toggleButtonState(inputList) {
		if (this._hasInvalidInput(inputList)) {
			this.disableButton();
		} else {
			this._buttonElement.classList.remove(this._config.disabledButtonSelector);
			this._buttonElement.removeAttribute('disabled');
		}
	}

	_setEventListener() {
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkValidity(inputElement);
				this._toggleButtonState(this._inputList, this._buttonElement);
			});
		});
	}

	enableValidation() {
		this._setEventListener();
		this._toggleButtonState(this._inputList, this._buttonElement);
	}
};

export { validationOptions, FormValidator };