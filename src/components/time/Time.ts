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
      text: props.text || props.datetime?.split('T').pop()?.slice(0, 5) || '',
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
