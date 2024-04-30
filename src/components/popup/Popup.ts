import Block from '../../utils/Block';

export class Popup extends Block {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          const closeModal = this.getContent()?.querySelectorAll('.js-close-modal');
          const modalOverlay = this.getContent()?.querySelector('.js-modal-overlay');

          if (e.target === modalOverlay) {
            if (props.onHideModal && typeof props.onHideModal === 'function') {
              props.onHideModal();
            } else {
              this.getContent()?.classList.remove('is-active');
            }
          }

          if (closeModal) {
            closeModal.forEach((item) => {
              if (item.contains(e.target as Node)) {
                if (props.onHideModal && typeof props.onHideModal === 'function') {
                  props.onHideModal();
                } else {
                  this.getContent()?.classList.remove('is-active');
                }
              }
            });
          }
        },
      },
    });
  }

  render() {
    return `
      <div class="popup js-popup {{#if isActive}}is-active{{/if}}" data-popup={{dataPopup}}>
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
