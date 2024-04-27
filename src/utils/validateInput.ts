export default function validateInput(input: HTMLInputElement) {
  const inputValue : string = input.value.trim();
  const isRequired : boolean = input.required;
  const inputName : string = input.name;

  const validationResult: {
    isValidated: boolean;
    errorText: null | string;
  } = {
    isValidated: true,
    errorText: null,
  };

  const inputTypes: { [key: string]: string } = {
    first_name: 'name',
    second_name: 'name',
    login: 'login',
    email: 'email',
    phone: 'phone',
    password: 'password',
    oldPassword: 'password',
    newPassword: 'password',
  };

  const currentType: string = inputTypes[inputName] || 'no-validation';

  if (currentType === 'no-validation') {
    return;
  }

  interface InputValidationRules {
    validCharacters?: RegExp | null;
    requiredCharacters?: RegExp[];
    requiredCharsText?: string;
    length?: {
      min: number;
      max: number;
    };
    formatName?(value: string): string;
  }

  const inputValidationRules: { [key: string]: InputValidationRules } = {
    name: {
      validCharacters: /^[a-zA-Zа-яА-Я\-]+$/,
      formatName(value) {
        const formattedName = value.replace(inputValue.charAt(0), inputValue.charAt(0).toUpperCase());

        return formattedName;
      },
    },

    login: {
      validCharacters: /^[a-zA-Z0-9\-\_]+$/,
      requiredCharacters: [/[a-zA-Z]/],
      requiredCharsText: 'Must contain letters',
      length: {
        min: 3,
        max: 20,
      },
    },

    email: {
      validCharacters: /^[a-zA-Z0-9_\-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    },

    phone: {
      validCharacters: /^\+?\d+$/,
      length: {
        min: 10,
        max: 15,
      },
    },

    password: {
      validCharacters: null,
      requiredCharacters: [/\d/, /[A-ZА-Я]/],
      requiredCharsText: 'Must contain at least 1 number and 1 capital letter',
      length: {
        min: 8,
        max: 40,
      },
    },
  };

  let validationRules: InputValidationRules = {};
  validationRules = inputValidationRules[currentType];

  if (isRequired && !input.value) {
    validationResult.isValidated = false;
    validationResult.errorText = 'Must not be empty';
    return validationResult;
  }

  if (validationRules.validCharacters) {
    if (!validationRules.validCharacters.test(inputValue)) {
      validationResult.isValidated = false;
      validationResult.errorText = 'Invalid characters';
      return validationResult;
    }
  }

  if (validationRules.requiredCharacters) {
    let isInvalid = false;

    validationRules.requiredCharacters.forEach((substr) => {
      if (inputValue.search(substr) === -1) {
        isInvalid = true;

        validationResult.isValidated = false;
        return validationResult;
      }
    });

    if (isInvalid) {
      validationResult.isValidated = false;
      validationResult.errorText = validationRules.requiredCharsText || 'Validation error';

      return validationResult;
    }
  }

  if (validationRules.length) {
    if (validationRules.length.min && inputValue.length < validationRules.length.min) {
      validationResult.isValidated = false;
      validationResult.errorText = `Value must contain more than ${validationRules.length.min} characters`;
      return validationResult;
    }

    if (validationRules.length.max && inputValue.length > validationRules.length.max) {
      validationResult.isValidated = false;
      validationResult.errorText = `Value must contain less than ${validationRules.length.max} characters`;
      return validationResult;
    }
  }

  if (validationRules.formatName) {
    input.value = validationRules.formatName(inputValue);
  }

  return validationResult;
}
