import Block from '../../utils/Block';

interface ButtonProps {
  className?: string,
  text?: string,
  onClick?: (value: Event) => void,
}

export class AddButton extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  render() {
    return `
      <button class="add-button {{{className}}} js-modal-btn" data-popup-trigger="add-user" type="button">
        <svg class="icon-stroke icon_18">
          <use xlink:href="#plus"></use>
        </svg>
      </button>
    `;
  }
}
