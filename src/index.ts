import Block from './utils/Block';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import { ChatPage } from './pages/chat-page';
import { Error404Page } from './pages/error-404-page';
import { Error500Page } from './pages/error-500-page';

import { SvgSprite } from './components/svg-sprite';

class TemporaryNavButton extends Block {
  constructor(props: { text: string, onClick: () => void }) {
    super({
      ...props,
      events: {
        click: () => props.onClick(),
      },
    });
  }

  render(): string {
    return `
      <button>{{text}}</button> 
    `;
  }
}

class Page extends Block {
  constructor(props: { page: Block }) {
    super({
      ...props,
      temporaryButtons: [
        new TemporaryNavButton({
          text: 'Login',
          onClick: () => {
            this.setProps({ page: new LoginPage() });
          },
        }),

        new TemporaryNavButton({
          text: 'Sign up',
          onClick: () => {
            this.setProps({ page: new SignupPage() });
          },
        }),

        new TemporaryNavButton({
          text: 'Chat page',
          onClick: () => {
            this.setProps({ page: new ChatPage() });
          },
        }),

        new TemporaryNavButton({
          text: 'Error 404',
          onClick: () => {
            this.setProps({ page: new Error404Page() });
          },
        }),

        new TemporaryNavButton({
          text: 'Error 500',
          onClick: () => {
            this.setProps({ page: new Error500Page() });
          },
        }),
      ],
      svgSprite: new SvgSprite(),
    });
  }

  componentDidUpdate(oldProps: { page: Block }, newProps: { page: Block }) {
    if (oldProps.page !== newProps.page) {
      this.children.page = newProps.page;
    }

    return true;
  }

  render() {
    return `
      <div>
        {{{ svgSprite }}}

        {{{ page }}}

        <div style="position: absolute; top: 10px; right: 10px; z-index: 100;
          display: flex; flex-direction: column; gap: 10px">
            {{{ temporaryButtons }}}
        </div>
      </div>
        
    `;
  }
}

const container: HTMLElement | null = document.getElementById('app');

if (container instanceof HTMLElement) {
  const block = new Page({ page: new LoginPage() });
  container.append(block.getContent()!);
}
