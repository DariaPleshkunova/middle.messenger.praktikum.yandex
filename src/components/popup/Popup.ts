import Block from '../../utils/Block';
import { Link } from '../link';
import { Form } from '../form';

interface PopupProps {
  dataPopup?: string,
  editProfileButton?: Link,
  logOutButton?: Link,
  form?: Form,
}

export class Popup extends Block {
  constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          const closeModal = this.getContent()?.querySelectorAll('.js-close-modal');
          const modalOverlay = this.getContent()?.querySelector('.js-modal-overlay');

          if (e.target === modalOverlay) {
            this.getContent()?.classList.remove('is-active');
          }

          if (closeModal) {
            closeModal.forEach((item) => {
              if (item.contains(e.target as Node)) {
                this.getContent()?.classList.remove('is-active');
              }
            });
          }
        },
      },
    });
  }

  render() {
    return `
      <div class="popup js-popup" data-popup={{dataPopup}}>
        <div class="popup__overlay js-modal-overlay"></div>
    
        <div class="popup__wrapper">
          <button class="button-reset popup__close-button js-close-modal" type="button">
            <svg class="icon-stroke_standard icon_20 ">
              <use xlink:href="#close"></use>
            </svg>
          </button>
  
          <div class="popup__content">
            {{ popupContent }}
          </div>
        </div>
      </div>    
    `;
  }
}
