import Block from '../../utils/Block';

interface MoreButtonProps {
  onClick: () => void;
}

export class MoreButton extends Block {
  constructor(props: MoreButtonProps) {
    super({
      ...props,
      events: {
        click: () => {
          props.onClick();
        },
      },
    });
  }

  render() {
    return `
      <button class="more-button">
        <span></span>
        <span></span>
        <span></span>
      </button>
    `;
  }
}
