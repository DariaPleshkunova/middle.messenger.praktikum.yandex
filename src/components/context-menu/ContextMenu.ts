import { Indexed } from '../../types';
import Block from '../../utils/Block';
import { Link } from '../link';

export class ContextMenu extends Block {
  constructor(props: Indexed) {
    super({
      ...props,
      links: [
        new Link({
          className: 'text_default js-modal-btn',
          iconId: '#plus',
          iconClass: 'icon-stroke_info icon_20',
          text: 'Add to chat',
          dataPopup: 'add-user-to-chat',
        }),
        new Link({
          className: 'text_default js-modal-btn',
          iconId: '#pencil',
          iconClass: 'icon_info icon_20',
          text: 'Change chat image',
          dataPopup: 'change-chat-image',
        }),
        new Link({
          className: 'text_default js-modal-btn',
          iconId: '#delete',
          iconClass: 'icon_danger icon_20',
          text: 'Delete from chat',
          dataPopup: 'delete-user-from-chat',
        }),
        new Link({
          className: 'text_default js-modal-btn',
          iconId: '#delete',
          iconClass: 'icon_danger icon_20',
          text: 'Delete chat',
          dataPopup: 'delete-chat',
        }),
      ],
    });
  }

  render() {
    return `
      <div class="context-menu {{#if className}}{{className}}{{/if}} {{#if isActive}}is-active{{/if}}">
        {{{ links }}}
      </div>  
    `;
  }
}
