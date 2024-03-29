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
    });
  }

  closePopup() {
    const popupElement = this.getContent();
    const closeModal = popupElement?.querySelectorAll('.js-close-modal');
    const modalOverlay = popupElement?.querySelector('.js-modal-overlay');

    if (closeModal) {
      closeModal.forEach((item) => {
        item.addEventListener('click', () => {
          popupElement?.classList.remove('is-active');
        });
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', () => {
        popupElement?.classList.remove('is-active');
      });
    }
  }

  componentDidMount() {
    this.closePopup();
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
