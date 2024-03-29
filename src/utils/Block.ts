import Handlebars from 'handlebars';
import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _id: number = Math.floor(100000 + Math.random() * 900000);

  private _isMounted: boolean = false;

  props: any;

  children: { [key: string]: Block } = {};

  lists: { [key: string]: any[] } = {};

  eventBus: () => EventBus;

  constructor(propsWithChildren: { [key: string]: unknown } = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: unknown) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: unknown, newProps: unknown) {
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: { [key: string]: unknown }) {
    const children: { [key: string]: Block } = {};
    const props: { [key: string]: unknown } = {};
    const lists: { [key: string]: unknown[] } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  setProps = (nextProps: unknown) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const propsAndStubs: { [key: string]: unknown } = { ...this.props };
    const tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub && child instanceof Block) {
        const content = child.getContent();
        if (content) {
          stub.replaceWith(content);
        }
      }
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement('template');

      child.forEach((item) => {
        if (item instanceof Block) {
          const content = item.getContent();
          if (content) {
            listCont.content.append(content);
          }
        } else {
          listCont.content.append(`${item}`);
        }
      });

      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild;
    if (newElement && this._element) {
      this._element.replaceWith(newElement);
    }

    if (newElement instanceof HTMLElement) {
      this._element = newElement;
    }

    this._addEvents();

    if (!this._isMounted) {
      this.dispatchComponentDidMount();
    }

    this._isMounted = true;
  }

  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;

        if (oldTarget[prop] !== value) {
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        }
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  show() {
    if (this.getContent()) {
      this.getContent()!.style.display = 'block';
    }
  }

  hide() {
    if (this.getContent()) {
      this.getContent()!.style.display = 'none';
    }
  }
}
