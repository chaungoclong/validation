function Validate(formSelector, option = {}) {
	// form element
	this.formElement = $(formSelector);

	// input element
	this.inputElements = this.formElement.find(":input[name][rules][type!='button'][type!='submit']");

	// message


	// rule
	this.validationRule = {
		required: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string" || value.length === 0) {
				return "khong duoc de trong";
			}

			return undefined;
		},

		min_length: (minLength) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string") {
					return undefined;
				}

				return (value.length >= minLength) ? undefined : `it nhat ${minLength} ki tu`;
			}
		},

		max_length: (maxLength) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string") {
					return undefined;
				}

				return (value.length <= maxLength) ? undefined : `nhieu nhat ${maxLength} ki tu`;
			}
		},

		is_number: (inputElement) => {
			let value = $(inputElement).val();

			return ! isNaN(value) ? undefined : `${value} khong phai la so`;
		},

		min: (min) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string" || isNaN(value) || isNaN(min)) {
					return undefined;
				}

				return (value >= min) ? undefined : `phai >= ${min}`;
			}
		},

		max: (max) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string" || isNaN(value) || isNaN(max)) {
					return undefined;
				}

				return (value <= max) ? undefined : `phai <= ${max}`;
			}
		},

		between: (min, max) => {
			return (inputElement) => {
				let value = $(inputElement).val();

				if (typeof value !== "string" || isNaN(value) || isNaN(max) 
					|| isNaN(min)) {
					return undefined;
				}

				return (value >= min && value <= max) ? undefined : `phai nam trong khoang tu ${min} - ${max}`;
			}
		},

		email: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			return regex.test(value) ? undefined : "email sai dinh dang";
		},

		password: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

			return regex.test(value) ? undefined : "mat khau sai dinh dang";
		},

		checked: (inputElement) => {
			let name = inputElement.name;

			if ($(`:input[name='${name}']:checked`)[0] !== undefined) {
				return undefined;
			}

			return "chua chon";
		},

		phone: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex =  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

			return regex.test(value) ? undefined : "khong phai la so dien thoai";
		},

		dob: (inputElement) => {
			let value = $(inputElement).val();

			if (typeof value !== "string") {
				return undefined;
			}

			let regex = /^((0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19[0-9]{2}|2[0-9]{3}))|((0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19[0-9]{2}|2[0-9]{3}))|((19[0-9]{2}|2[0-9]{3})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]))$/;

			return regex.test(value) ? undefined : "ngay sinh khong hop le";
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
		if (! $.isEmptyObject(option)) {
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
	this.getDisplayElement = (inputElement, type="success") => {
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
		let displayElements  = this.getDisplayElement(inputElement, "error");

		let wrapInputElement = displayElements.wrapInputElement;
		let messageElement   = displayElements.messageElement;

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

		let wrapInputElement  = displayElements.wrapInputElement;
		let messageElement    = displayElements.messageElement;
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

			if (! this.isValid) {
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