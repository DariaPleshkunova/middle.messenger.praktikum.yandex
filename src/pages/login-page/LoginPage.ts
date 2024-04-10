import Block from '../../utils/Block';
import { Heading } from '../../components/heading';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { InputListItem } from '../../components/input-list-item';
import { Form } from '../../components/form';

export class LoginPage extends Block {
  constructor() {
    super({
      heading: new Heading({ className: 'board__heading', text: 'Sign in to MyMsg' }),
      form: new Form({
        id: 'login-form',
        submitButton: new Button({
          className: 'button_success',
          text: 'Sign in',
          type: 'submit',
        }),
        cancelButton: new Link({
          text: 'Create profile',
        }),
        inputItems: [
          new InputListItem({
            name: 'login',
            type: 'text',
            label: 'Login',
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
