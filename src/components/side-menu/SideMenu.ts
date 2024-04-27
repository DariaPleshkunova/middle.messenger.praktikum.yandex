import Block from '../../utils/Block';
import { Avatar } from '../avatar';
import { InputField } from '../input-field';
import { ChatsList } from '../chats-list';
import { AddButton } from '../add-button';

import url from '../../api/url';
import connect from '../../utils/connect';
import { Indexed, UserState } from '../../types';

interface SideMenuProps {
  avatar?: string,
}

export class SideMenu extends Block {
  constructor(props: SideMenuProps) {
    super({
      ...props,
      inputField: new InputField({
        className: 'input-field_type_search side-menu__search-input',
        type: 'search',
        name: 'search',
        placeholder: 'Search',
        skipValidation: true,
      }),
      avatar: new Avatar({ className: 'avatar_viewtype_person side-menu__avatar', imageUrl: props.avatar }),
      chatsList: new ChatsList({ className: 'side-menu__chats-list js-chats-list' }),
      addButton: new AddButton({
        className: 'side-menu__add-button',
      }),
    });
  }

  render() {
    if (this.props.avatar) {
      this.children.avatar.setProps({ imageUrl: `${url.resources}/${this.props.avatar}` });
    }

    return `
      <aside class="side-menu">
        <div class="side-menu__top-container">
          {{{ inputField }}}

          <button class="button-reset js-modal-btn side-menu__avatar-button js-modal-btn" data-popup-trigger="profile">
            {{{ avatar }}}
          </button>
        </div>

        {{{ chatsList }}}

        {{{ addButton }}}
      </aside>
    `;
  }
}

function mapUserToProps(state: Indexed) {
  const userState = state.user as UserState;

  if (userState) {
    return {
      avatar: userState.avatar,
    };
  }
}

export default connect(SideMenu as typeof Block, mapUserToProps);
