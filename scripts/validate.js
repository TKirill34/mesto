const hiddenError = (errorElement, inputErrorClass) => {
	errorElement.textContent = "";
	errorElement.classList.remove(inputErrorClass);
};

const showError = (errorElement, message, inputErrorClass) => {
	errorElement.textContent = `${message}`;
	errorElement.classList.add(inputErrorClass);
};

const setInputState = (inputElement, isValid, options) => {
	const { inputSectionSelector, inputErrorSelector, inputErrorClass, errorClass } = options;
	const inputSectionElement = inputElement.closest(inputSectionSelector);
	const errorElement = inputSectionElement.querySelector(inputErrorSelector);
	if (isValid) {
		hiddenError(errorElement, inputErrorClass, errorClass);
		inputElement.classList.remove(errorClass);
	} else {
		showError(errorElement, inputElement.validationMessage, inputErrorClass, errorClass);
		inputElement.classList.add(errorClass);
	}
};

const enableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.removeAttribute('disabled');
	buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
	buttonElement.setAttribute('disabled', true);
	buttonElement.classList.add(disabledButtonClass);
};

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
	const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

	if (formIsValid) {
		enableButton(submitElement, disabledButtonClass);
	} else {
		disableButton(submitElement, disabledButtonClass);
	}
};

const toggleInputState = (inputElement, options) => {
	const isValid = inputElement.validity.valid;
	setInputState(inputElement, isValid, options);
};

const setEventListeners = (form, options) => {
	const submitElement = form.querySelector(options.submitSelector);
	const inputs = Array.from(form.querySelectorAll(options.inputSelector));
	inputs.forEach(inputElement => {
		inputElement.addEventListener("input", () => {
			toggleInputState(inputElement, options);
			toggleButtonState(inputs, submitElement, options.disabledButtonClass);
		});
	});
	toggleButtonState(inputs, submitElement, options.disabledButtonClass);
	form.addEventListener('reset', () => {
		setTimeout(() => {
			toggleButtonState(inputs, submitElement, options.disabledButtonClass);
		}, 0);
	});
};

const enableValidation = ({
	formSelector,
	submitSelector,
	inputSelector,
	inputSectionSelector,
	inputErrorSelector,
	inputErrorClass,
	errorClass,
	disabledButtonClass,
}) => {
	const forms = Array.from(document.querySelectorAll(formSelector));
	forms.forEach((form) => {
		setEventListeners(form, {
			submitSelector,
			inputSelector,
			inputSectionSelector,
			inputErrorSelector,
			inputErrorClass,
			errorClass,
			disabledButtonClass,
		});
	});
};