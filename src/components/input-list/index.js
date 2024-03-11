import Handlebars from 'handlebars';
import './input-list.scss';

export { default as InputList } from './input-list.hbs?raw';

Handlebars.registerHelper('input-list', () => {
    return [
        {name: "login", type: "text", label: "Login"},
        {name: "password", type: "password", label: "Password"},
    ]
})
