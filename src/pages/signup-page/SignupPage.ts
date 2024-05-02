import Block from '../../utils/Block';
import { Heading } from '../../components/heading';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Form } from '../../components/form';
import { Badge } from '../../components/badge';

import authController from '../../controllers/authController';
import userController from '../../controllers/userController';
import { PageProps } from '../../types';

export class SignupPage extends Block {
  constructor(props: PageProps) {
    super({
      ...props,
      heading: new Heading({ className: 'board__heading', text: 'Sign up to MyMsg' }),
      form: new Form({
        id: 'signup-form',
        submitButton: new Button({
          className: 'button_success',
          text: 'Sign up',
          type: 'submit',
        }),
        cancelButton: new Link({
          text: 'Already have a profile?',
          onClick: props.routeHandlers.onLoginRoute,
        }),

        inputs: [
          new Input({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
          }),
          new Input({
            name: 'first_name',
            type: 'text',
            label: 'Name',
            required: true,
          }),
          new Input({
            name: 'second_name',
            type: 'text',
            label: 'Last Name',
            required: true,
          }),
          new Input({
            name: 'email',
            type: 'email',
            label: 'E-mail',
            required: true,
          }),
          new Input({
            name: 'phone',
            type: 'tel',
            label: 'Phone number',
            required: true,
          }),
          new Input({
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
          }),
        ],

        onSubmit: async (data: Record<string, unknown>) => {
          const isSuccess = await authController.signUp(data);

          if (isSuccess) {
            await userController.getUser();
            props.routeHandlers.onChatsRoute();
          }
        },
      }),

      badge: new Badge({}),
    });
  }

  render() {
    return `
      <main class="page page-start">
        <div class="board">
          {{{ heading }}}

          {{{ form }}}
        </div>

        {{{ badge }}}
      </main>
    `;
  }
}
