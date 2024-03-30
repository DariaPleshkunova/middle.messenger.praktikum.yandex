import Block from '../../utils/Block';
import { Heading } from '../../components/heading';
import { InputListItem } from '../../components/input-list-item';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Form } from '../../components/form';

export class SignupPage extends Block {
  constructor() {
    super({
      heading: new Heading({ className: 'board__heading', text: 'Sign up to MyMsg' }),
      form: new Form({
        id: 'signup-form',
        submitButton: new Button({ className: 'button_success', text: 'Sign up', type: 'submit' }),
        cancelButton: new Link({ text: 'Already have a profile?' }),

        inputItems: [
          new InputListItem({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
            value: null,
          }),
          new InputListItem({
            name: 'first_name',
            type: 'text',
            label: 'Name',
            required: true,
            value: null,
          }),
          new InputListItem({
            name: 'second_name',
            type: 'text',
            label: 'Last Name',
            required: true,
            value: null,
          }),
          new InputListItem({
            name: 'email',
            type: 'email',
            label: 'E-mail',
            required: true,
            value: null,
          }),
          new InputListItem({
            name: 'phone',
            type: 'tel',
            label: 'Phone number',
            required: true,
            value: null,
          }),
          new InputListItem({
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
            value: null,
          }),
          new InputListItem({
            name: 'confirm_password',
            type: 'password',
            label: 'Confirm Password',
            value: null,
          }),
        ],
      }),
    });
  }

  render() {
    return `
      <main class="page page-start">
        <div class="board">
          {{{ heading }}}

          {{{ form }}}
        </div>
      </main>
    `;
  }
}
