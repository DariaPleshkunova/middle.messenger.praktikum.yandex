import Block from '../../utils/Block';

interface ButtonProps {
  className?: string,
  type?: string,
  text?: string,
  onClick?: (value: Event) => void,
}

export class Button extends Block {
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
    return '<button class="button {{ className }}" type={{ type }}>{{text}}</button>';
  }
}
