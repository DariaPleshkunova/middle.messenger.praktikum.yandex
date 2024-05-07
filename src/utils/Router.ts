import { Indexed } from '../types';
import Block from './Block';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.getElementById(query) as HTMLElement;
  let content: Node | string = '';

  if (block) {
    content = block.getContent() as Node;
  }

  root?.append(content);
  return root;
}

class Route {
  private _pathname: string;

  private _blockClass: Block<Record<string, unknown>>;

  private _block: Block | null;

  private _props: Indexed;

  constructor(pathname: string, view: Block<Record<string, unknown>>, props: Indexed) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = this._blockClass;
    render(this._props.rootQuery as string, this._block as Block);
  }
}

export default class Router {
  private static __instance: Router | null = null;

  routes: Route[];

  private history: History;

  private _currentRoute: Route | null;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  getInstance(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
