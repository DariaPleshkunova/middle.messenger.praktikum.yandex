import Block from '../../utils/Block';

interface TitleProps {
  className?: string,
  text?: string,
}

export class Title extends Block {
  constructor(props: TitleProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <h2 class="title {{ className }}">
        {{ text }}
      </h2>
    `;
  }
}
