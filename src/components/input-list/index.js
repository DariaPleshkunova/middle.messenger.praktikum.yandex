import Handlebars from 'handlebars';
import './input-list.scss';

export { default as InputList } from './input-list.hbs?raw';

const inputs = {
    login: {name: "login", type: "text", label: "Login"},
    name: {name: "first_name", type: "text", label: "Name"},
    secondName: {name: "second_name", type: "text", label: "Last Name"},
    displayName: {name: "display_name", type: "text", label: "Login"},
    email: {name: "email", type: "email", label: "E-mail"},
    phone: {name: "phone", type: "tel", label: "Phone number"},
    oldPassword: {name: "oldPassword", type: "password", label: "Password"},
    newPassword: {name: "newPassword", type: "password", label: "New Password"},
    confirmPassword: {name: "", type: "password", label: "Confirm Password"},
}

const inputLists = {
    loginPage: [ inputs.login, inputs.oldPassword ],
    signUpPage: [ inputs.login, inputs.name, inputs.secondName, inputs.email, inputs.phone, inputs.oldPassword, inputs.confirmPassword ],
    profilePopup: [ inputs.login, inputs.name, inputs.secondName, inputs.email, inputs.phone, inputs.oldPassword, inputs.newPassword  ],
}

Handlebars.registerHelper('input-list', (inputListBlock, options) => {
    inputListBlock = Handlebars.escapeExpression(inputListBlock);
    
    if (inputLists[inputListBlock]) {
        return options.fn(inputLists[inputListBlock]); // Возвращаем список, соответствующий переданному типу
    } else {
        return "Invalid input list type"; // Если тип списка не существует, возвращаем сообщение об ошибке
    }
});


