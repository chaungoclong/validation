function Validate(formSelector, option = {}) {
	// form element
	this.formElement = $(formSelector);

	// input element
	this.inputElements = this.formElement.find(":input[name][rules][type!='button'][type!='submit']");

	// message rule 
	this.messageRule = {
		required: "truong nay khong duoc de trong",
		min_length: "it nhat :v ki tu",
		max_length: "nhieu nhat :v ki tu",
		is_number: ":v khong phai la so",
		min: "phai >= :v",
		max: "phai <= :v",
		between: "phai nam trong khoang :v - :v",
		email: "email sai dinh dang",
		password: "mat khau sai dinh dang",
		checked: "chua chon",
		phone: "so dien thoai sai dinh dang",
		dob: "ngay sinh sai dinh dang",
	}

	// render message rule
	this.renderMessage = {
		required: (value) => {
			let message = this.messageRule.required.split(":v");
			let values = [value];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		min_length: (minLength) => {
			let message = this.messageRule.min_length.split(":v");
			let values = [minLength];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		max_length: (maxLength) => {
			let message = this.messageRule.max_length.split(":v");
			let values = [maxLength];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		is_number: (value) => {
			let message = this.messageRule.is_number.split(":v");
			let values = [value];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		min: (min) => {
			let message = this.messageRule.min.split(":v");
			let values = [min];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		max: (max) => {
			let message = this.messageRule.max.split(":v");
			let values = [max];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		between: (min, max) => {
			let message = this.messageRule.between.split(":v");
			let values = [min, max];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		email: (value) => {
			let message = this.messageRule.email.split(":v");
			let values = [value];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		password: (value) => {
			let message = this.messageRule.password.split(":v");
			let values = [value];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		checked: () => {
			let message = this.messageRule.checked.split(":v");
			let values = [];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		phone: (value) => {
			let message = this.messageRule.phone.split(":v");
			let values = [value];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},

		dob: (value) => {
			let message = this.messageRule.dob.split(":v");
			let values = [value];

			for (let i = 0; i < message.length - 1; ++i) {
				if (values[i]) {
					message[i] += values[i];
				}
			}

			return message.join("");
		},
	}

	// rule
	this.validationRule = {
		required: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string" || value.length === 0) {
				return this.renderMessage.required(value);
			}

			return undefined;
		},

		min_length: (minLength) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string") {
					return undefined;
				}

				return (value.length >= parseInt(minLength)) ? undefined 
				: this.renderMessage.min_length(minLength);
			}
		},

		max_length: (maxLength) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string") {
					return undefined;
				}

				return (value.length <= parseInt(maxLength)) ? undefined 
				: this.renderMessage.max_length(maxLength);
			}
		},

		is_number: (inputElement) => {
			let value = $(inputElement).val();

			return !isNaN(value) ? undefined : this.renderMessage.is_number(value);
		},

		min: (min) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string" || isNaN(value) || isNaN(min)) {
					return undefined;
				}

				return (parseFloat(value) >= parseFloat(min)) ? undefined : this.renderMessage.min(min);
			}
		},

		max: (max) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string" || isNaN(value) || isNaN(max)) {
					return undefined;
				}

				console.log(value + " " + max);
				return (parseFloat(value) <= parseFloat(max)) ? undefined : this.renderMessage.max(max);
			}
		},

		between: (min, max) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string" || isNaN(value) || isNaN(max)
					|| isNaN(min)) {
					return undefined;
				}

				return (parseFloat(value) >= parseFloat(min) 
					&& parseFloat(value) <= parseFloat(max)) ? undefined : this.renderMessage.between(min, max);
			}
		},

		email: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			return regex.test(value) ? undefined : this.renderMessage.email(value);
		},

		password: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

			return regex.test(value) ? undefined : this.renderMessage.password(value);
		},

		checked: (inputElement) => {
			let name = inputElement.name;

			if ($(`:input[name='${name}']:checked`)[0] !== undefined) {
				return undefined;
			}

			return this.renderMessage.checked();
		},

		phone: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

			return regex.test(value) ? undefined : this.renderMessage.phone(value);
		},

		dob: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex = /^((0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19[0-9]{2}|2[0-9]{3}))|((0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19[0-9]{2}|2[0-9]{3}))|((19[0-9]{2}|2[0-9]{3})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]))$/;

			return regex.test(value) ? undefined : this.renderMessage.dob(value);
		}
	}

	// map input with rule
	this.mapInputWithRule = {};

	// check validate
	this.isValid = true;

	// wrap input
	this.wrapInput = {
		selector: "",
		whenSuccess: "",
		whenError: ""
	}

	// message
	this.message = {
		selector: "",
		whenSuccess: "",
		whenError: ""
	}

	// function is executed on submit
	this.onSubmit = null;

	// init
	this.init = () => {
		// set wrapInput ,message element and onSubmit function
		if (!$.isEmptyObject(option)) {
			if ("wrapInput" in option) {
				Object.assign(this.wrapInput, option.wrapInput);
				console.log(this.wrapInput);
			}

			if ("message" in option) {
				Object.assign(this.message, option.message);
				console.log(this.message);
			}

			if ("onSubmit" in option) {
				this.onSubmit = option.onSubmit;
				console.log(this.onSubmit);
			}

			if ("customMessage" in option) {
				Object.assign(this.messageRule, option.customMessage);
				console.log(this.messageRule);
			}
		}

		// add validation function for each input element
		$(this.inputElements).each((k, v) => {
			let inputName = v.name;
			let rules = $(v).attr("rules");
			rules = rules.toLowerCase().replace(/^\s+|\s+$|^\|+|\|+$/).split("|");

			// push validation function to map
			for (let rule of rules) {
				let ruleFunc = this.validationRule[rule];

				if (rule.includes(":")) {
					let ruleArr = rule.split(":");

					if (ruleArr.length === 2) {
						ruleFunc = this.validationRule[ruleArr[0]](ruleArr[1]);
					}

					if (ruleArr.length === 3) {
						ruleFunc = this.validationRule[ruleArr[0]](ruleArr[1], ruleArr[2]);
					}
				}

				if (Array.isArray(this.mapInputWithRule[inputName])) {
					this.mapInputWithRule[inputName].push(ruleFunc);
				} else {
					this.mapInputWithRule[inputName] = [ruleFunc];
				}
			}
		});
	}

	// get display field
	this.getDisplayElement = (inputElement, type = "success") => {
		let wrapInputSelector = this.wrapInput.selector;
		let messageSelector = this.message.selector;

		let wrapInputElement = null;
		let messageElement = null;
		let messageElementTmp = $(inputElement).nextAll().filter(".msg-tmp")[0];

		type = type.toLowerCase();

		if (wrapInputSelector != "" && messageSelector != "") {
			wrapInputElement = $(inputElement).closest(wrapInputSelector);

			messageElement = $(inputElement).closest(wrapInputSelector)
				.find(messageSelector)[0];

			messageElement = $(messageElement);

		} else if (messageSelector != "") {
			wrapInputElement = null;

			messageElement = $(inputElement).nextAll()
				.filter(messageSelector)[0];

			messageElement = $(messageElement);

		} else if (wrapInputSelector != "") {
			wrapInputElement = $(inputElement).closest(wrapInputSelector);

			// if msg-tmp already exists, delete msg-tmp then create new msg-tmp
			// to make sure there is only one msg-tmp
			if (type === "error") {
				if (messageElementTmp !== undefined) {
					$(messageElementTmp.remove());
				}

				messageElement = $("<span class='msg-tmp'></span>");
				messageElement.insertAfter(inputElement);
			}

		} else {
			wrapInputElement = null;

			if (type === "error") {
				if (messageElementTmp !== undefined) {
					$(messageElementTmp.remove());
				}

				messageElement = $("<span class='msg-tmp'></span>");
				messageElement.insertAfter(inputElement);
			}
		}

		return {
			wrapInputElement: wrapInputElement,
			messageElement: messageElement
		};
	}

	// display error
	this.displayError = (inputElement, errorMsg) => {
		let displayElements = this.getDisplayElement(inputElement, "error");

		let wrapInputElement = displayElements.wrapInputElement;
		let messageElement = displayElements.messageElement;

		if (wrapInputElement !== null) {
			wrapInputElement.removeClass(this.wrapInput.whenSuccess)
				.addClass(this.wrapInput.whenError);
		}

		if (messageElement !== null) {
			messageElement.removeClass(this.message.whenSuccess)
				.addClass(this.message.whenError)
				.html(errorMsg);
		}
	}

	// display success
	this.displaySuccess = (inputElement) => {
		let displayElements = this.getDisplayElement(inputElement, "success");

		let wrapInputElement = displayElements.wrapInputElement;
		let messageElement = displayElements.messageElement;
		let messageElementTmp = $(inputElement).nextAll().filter(".msg-tmp")[0];

		if (wrapInputElement !== null) {
			wrapInputElement.removeClass(this.wrapInput.whenError)
				.addClass(this.wrapInput.whenSuccess);
		}

		if (messageElement !== null) {
			messageElement.removeClass(this.message.whenError)
				.addClass(this.message.whenSuccess)
				.html("");
		}

		if (messageElementTmp !== undefined) {
			$(messageElementTmp).remove();
		}
	}

	// display result
	this.displayResult = (inputElement, errorMsg) => {
		if (errorMsg !== undefined) {
			this.displayError(inputElement, errorMsg);
		} else {
			this.displaySuccess(inputElement);
		}
	}

	// validate for each input
	this.validateForInput = (inputElement) => {
		// get all the validation functions of each input element
		let validFunctOfInputs = this.mapInputWithRule[inputElement.name];

		// get the first error of each input element
		let errorMsg = undefined;

		for (let validFunct of validFunctOfInputs) {
			errorMsg = validFunct(inputElement);

			if (errorMsg !== undefined) {
				this.isValid = false;
				break;
			}
		}

		this.displayResult(inputElement, errorMsg);
	}

	// validate on submit
	this.validateOnSubmit = () => {
		$(document).on("submit", formSelector, (e) => {
			this.isValid = true;

			$(this.inputElements).each((k, v) => {
				this.validateForInput(v);
			});

			if (!this.isValid) {
				e.preventDefault();
			} else if (this.onSubmit !== null) {
				e.preventDefault();
				this.onSubmit.bind(this);
				this.onSubmit();
			}
		});
	}

	// validate on input
	this.validateOnInput = () => {
		$(this.inputElements).each((k, v) => {
			$(document).on("input", v, (e) => {
				let type = v.type;
				let tagName = $(v).prop("tagName");

				if ($(v).is($(e.target)) && type !== "radio"
					&& type !== "checkbox" && tagName !== "SELECT") {
					this.validateForInput(v);
				}
			});
		});
	}

	// validate function
	this.validate = () => {
		this.validateOnSubmit();

		// on input
		this.validateOnInput();
	}

	this.init();

	this.validate();
}