import Block from '../../utils/Block';
import { Avatar } from '../avatar';
import { Title } from '../title';
import { Time } from '../time';
import { Text } from '../text';
import { Notification } from '../notification';

interface ChatProps {
  className?: string;
  isPinned?: boolean;
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      avatar: new Avatar({ className: 'chat__avatar', isStandard: true }),
      title: new Title({ className: 'chat__name', text: 'Bill Marks' }),
      time: new Time({ datetime: '12:00', text: '12:00' }),
      text: new Text({ className: 'chat__text', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta obcaecati maxime ex! Harum, nulla deleniti. Sapiente tenetur veritatis corrupti illo placeat enim minima eveniet, saepe porro unde ab libero illum!' }),
      notification: new Notification({ className: 'chat__notification', text: '55' }),
    });
  }

  render() {
    return `
      <article class="chat {{ className }}">
        {{{ avatar }}}
    
        {{{ title }}}
    
        <div class="chat__info"> 
          {{#if isPinned}}
            <button class="button-reset">
              <svg class="icon-stroke_standard icon_16">
                <use xlink:href="#pin"></use>
              </svg>
            </button>
          {{/if}}

          {{{ time }}}
        </div>
    
        <div class="chat__content">
          {{{ text }}}
  
          {{{ notification }}}
        </div>
      </article>    
    `;
  }
}
