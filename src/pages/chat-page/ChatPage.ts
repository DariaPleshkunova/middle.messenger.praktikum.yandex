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
    });
  }

  initProfilePopup() {
    const popupModalTrigger = this.getContent()?.querySelector('.js-modal-btn[data-popup-trigger="profile"]');

    popupModalTrigger?.addEventListener('click', () => {
      const profilePopup = this.getContent()?.querySelector('[data-popup="profile"]');
      profilePopup?.classList.add('is-active');
    });
  }

  componentDidMount() {
    this.initProfilePopup();
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
