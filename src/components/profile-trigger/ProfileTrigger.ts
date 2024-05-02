import Block from '../../utils/Block';
import store from '../../utils/Store';
import { Avatar } from '../avatar';

interface ProfileTriggerProps {
  onClick?: () => void,
  avatar?: Avatar,
}

export class ProfileTrigger extends Block {
  constructor(props: ProfileTriggerProps) {
    super({
      ...props,
      events: {
        click: () => {
          store.set('popup.profile', true);
          if (props.onClick) {
            props.onClick();
          }
        },
      },
    });
  }

  render() {
    return `
      <button class="button-reset side-menu__avatar-button" data-popup-trigger="profile">
        {{{ avatar }}}
      </button>
    `;
  }
}
