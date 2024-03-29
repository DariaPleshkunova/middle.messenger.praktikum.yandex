import Block from '../../utils/Block';
import { Time } from '../time';

interface MessageProps {
  className?: string,
  imageUrl?: string,
  text?: string,
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
      time: new Time({ className: 'message__time', text: '12:00', datetime: '2024-03-04T12:00' }),
    });
  }

  render() {
    return `
      <div class="message {{ className }}">
        {{#if imageUrl}}
          <img class="message__image" src={{imageUrl}} alt="">
        {{/if}}

        <p class="message__text">
          {{ text }}

          {{{ time }}}
        </p>
      </div>
    `;
  }
}
