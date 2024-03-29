import Block from '../../utils/Block';

interface ButtonProps {
  className?: string,
  type?: string,
  text?: string,
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
    });
  }

  render() {
    return '<button class="button {{ className }}" type={{ type }}>{{text}}</button>';
  }
}
