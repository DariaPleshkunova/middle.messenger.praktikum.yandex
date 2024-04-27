import Block from './utils/Block';
import Router from './utils/Router';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import { ChatPage } from './pages/chat-page';
import { Error404Page } from './pages/error-404-page';
import { Error500Page } from './pages/error-500-page';

import userController from './controllers/userController';

import { Indexed } from './types';

export class Page extends Block {
  constructor(props: Indexed) {
    super({
      ...props,
    });
  }

  render() {
    return `
      {{{ page }}}
    `;
  }
}

const router = new Router('app');

const routes = {
  base: '/',
  login: '/login',
  signup: '/sign-up',
  chats: '/messenger',
  error404: '/error-404',
  error500: '/error-500',
};

export const routeHandlers = {
  onLoginRoute: () => {
    router.go(routes.login);
  },
  onSignupRoute: () => {
    router.go(routes.signup);
  },
  onChatsRoute: () => {
    router.go(routes.chats);
  },
  onError404Route: () => {
    router.go(routes.error404);
  },
  onError500Route: () => {
    router.go(routes.error500);
  },
  onBackRoute: () => {
    router.back();
  },
};

const loginPage = new Page({
  page: new LoginPage({ routeHandlers }),
});

const signupPage = new Page({
  page: new SignupPage({ routeHandlers }),
});

const chatPage = new Page({
  page: new ChatPage({ routeHandlers }),
});

const error404Page = new Page({
  page: new Error404Page({ routeHandlers }),
});

const error500Page = new Page({
  page: new Error500Page({ routeHandlers }),
});

router
  .use('/', loginPage)
  .use(routes.login, loginPage)
  .use(routes.signup, signupPage)
  .use(routes.chats, chatPage)
  .use(routes.error404, error404Page)
  .use(routes.error500, error500Page)
  .start();

if (window.location.pathname === routes.chats) {
  userController.getUser().then((isSuccess) => {
    if (isSuccess) {
      routeHandlers.onChatsRoute();
    } else {
      routeHandlers.onLoginRoute();
    }
  });
}

const pathnames = Object.values(routes);

if (window.location.pathname && !pathnames.find((path) => path === window.location.pathname)) {
  routeHandlers.onError404Route();
}
