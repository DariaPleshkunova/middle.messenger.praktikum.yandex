import Block from '../../utils/Block';

interface TextProps {
  className?: string,
  text?: string,
}

export class Text extends Block {
  constructor(props: TextProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <p class="text {{ className }}">
        {{ text }}
      </p>
    `;
  }
}
