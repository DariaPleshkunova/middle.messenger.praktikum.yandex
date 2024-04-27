import Block from '../../utils/Block';
import { Time } from '../time';

export interface MessageProps {
  className?: string,
  imageUrl?: string,
  text?: string,
  datetime?: string,
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
      time: new Time({
        className: 'message__time',
        datetime: props.datetime,
      }),
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
