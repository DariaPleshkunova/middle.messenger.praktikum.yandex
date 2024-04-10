import Block from '../../utils/Block';

interface DateProps {
  className?: string,
  datetime?: string,
  text?: string,
}

export class Date extends Block {
  constructor(props: DateProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <time class="date {{ className }}" datetime={{ datetime }}>
        {{ text }}
      </time>
    `;
  }
}
