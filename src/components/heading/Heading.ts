import Block from '../../utils/Block';

interface HeadingProps {
  className?: string,
  text?: string,
}

export class Heading extends Block {
  constructor(props: HeadingProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <h1 class="heading {{ className }}">
        {{ text }}
      </h1>
    `;
  }
}
