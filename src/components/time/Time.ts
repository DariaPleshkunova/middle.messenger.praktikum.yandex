import Block from '../../utils/Block';

interface TimeProps {
  className?: string,
  datetime?: string,
  text?: string,
}

export class Time extends Block {
  constructor(props: TimeProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <time class="time {{ className }}" datetime={{datetime}}>
        {{text}}
      </time>
    `;
  }
}
