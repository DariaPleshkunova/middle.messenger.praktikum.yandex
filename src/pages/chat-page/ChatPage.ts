import Block from '../../utils/Block';
// import { Text } from '../../components/text';
import { SideMenu } from '../../components/side-menu';
import { Dialog } from '../../components/dialog';
import { ProfilePopup } from '../../components/profile-popup';

export class ChatPage extends Block {
  constructor() {
    super({
      sideMenu: new SideMenu(),
      // text: new Text({className: 'text_gray', text: 'Select a chat'}),
      dialog: new Dialog(),
      profilePopup: new ProfilePopup(),
      events: {
        click: (e: Event) => {
          const profilePopupTrigger = this.getContent()?.querySelector('.js-modal-btn[data-popup-trigger="profile"]');

          if (profilePopupTrigger?.contains(e.target as Node)) {
            const profilePopup = this.getContent()?.querySelector('[data-popup="profile"]');
            profilePopup?.classList.add('is-active');
          }
        },
      },
    });
  }

  render() {
    return `
      <div class="page chat-page">
        {{{ sideMenu }}}

        <main>
          {{{ dialog }}}
        </main>

        {{{ profilePopup }}}
      </div>
    `;
  }
}
