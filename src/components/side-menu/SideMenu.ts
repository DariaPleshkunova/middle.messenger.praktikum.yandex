import Block from '../../utils/Block';
import { Avatar } from '../avatar';
import { InputField } from '../input-field';
import { ChatsList } from '../chats-list';

export class SideMenu extends Block {
  constructor() {
    super({
      inputField: new InputField({
        className: 'input-field_type_search side-menu__search-input',
        type: 'search',
        name: 'search',
        placeholder: 'Search',
        skipValidation: true,
      }),
      avatar: new Avatar({ className: 'avatar_viewtype_person side-menu__avatar' }),
      chatsList: new ChatsList({ className: 'side-menu__chats-list js-chats-list' }),
    });
  }

  render() {
    return `
      <aside class="side-menu">
        <div class="side-menu__top-container">
          {{{ inputField }}}

          <button class="button-reset js-modal-btn side-menu__avatar-button js-modal-btn" data-popup-trigger="profile">
            {{{ avatar }}}
          </button>
        </div>

        {{{ chatsList }}}
      </aside>
    `;
  }
}
