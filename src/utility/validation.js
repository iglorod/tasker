const changeValidationMessage = (isValid, message, currMessage) => {
    if (!isValid && currMessage.length === 0) return message;
    return currMessage;
}

export const validation = (string, validationRules, originalEmail) => {
    let isValid = true;
    let validationMessage = '';

    if (validationRules.isRequred && isValid) {
        isValid = string.length > 0 && isValid;
        validationMessage = changeValidationMessage(isValid, 'Please, fill this field', validationMessage);
    }

    if (validationRules.isEmail && isValid) {
        const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = exp.test(string) && isValid;
        validationMessage = changeValidationMessage(isValid, 'Email is incorrect', validationMessage);
    }

    if (validationRules.minLength && isValid) {
        isValid = string.length > 5 && isValid;
        validationMessage = changeValidationMessage(isValid, 'Min password length is 6 symbols', validationMessage);
    }

    if (validationRules.maxLength && isValid) {
        isValid = string.length < validationRules.maxLength && isValid;
        validationMessage = changeValidationMessage(isValid, 'Max length is ' + validationRules.maxLength + ' symbols', validationMessage);
    }

    if (validationRules.shoudBeEqual && isValid) {
        isValid = string === originalEmail && isValid;
        validationMessage = changeValidationMessage(isValid, 'Emails don\'t match', validationMessage);
    }

    return [isValid, validationMessage];
}
