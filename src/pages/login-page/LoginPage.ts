import Block from '../../utils/Block';
import { Heading } from '../../components/heading';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Input } from '../../components/input';
import { Form } from '../../components/form';

import authController from '../../controllers/authController';
import userController from '../../controllers/userController';
import chatController from '../../controllers/chatController';
import { PageProps } from '../../types';
import { Badge } from '../../components/badge';

export class LoginPage extends Block {
  constructor(props: PageProps) {
    super({
      ...props,
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
          onClick: props.routeHandlers.onSignupRoute,
        }),
        inputs: [
          new Input({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
          }),

          new Input({
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
          }),
        ],

        onSubmit: async (data) => {
          const isSuccess = await authController.logIn(data);

          if (isSuccess) {
            await userController.getUser();
            await chatController.getChats();
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
          
          {{{ button }}}
        </div>

        {{{ badge }}}
      </main>
    `;
  }
}
