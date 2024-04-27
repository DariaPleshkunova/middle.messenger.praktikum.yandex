import Block from '../../utils/Block';
import { Avatar } from '../avatar';
import { Title } from '../title';
import { Time } from '../time';
import { Text } from '../text';
import { Notification } from '../notification';

import store from '../../utils/Store';
import chatController from '../../controllers/chatController';
import WsController from '../../controllers/wsController';
import { Indexed } from '../../types';

export interface ChatProps {
  className?: string;
  isPinned?: boolean;
  initials?: string;
  avatar: string;
  title: string;
  last_message: {
    datetime: string,
    text: string,
  };
  id: number,
  unread_count: number;
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      avatar: new Avatar({
        className: 'chat__avatar',
        imageUrl: props.avatar,
        isStandard: true,
        initials: props.initials,
      }),
      title: new Title({ className: 'chat__name', text: props.title }),
      time: new Time({ datetime: props.last_message.datetime }),
      text: new Text({ className: 'chat__text', text: props.last_message.text }),
      notification: new Notification({
        className: props.unread_count === 0 ? 'chat__notification is-hidden' : 'chat__notification',
        text: props.unread_count.toString(),
      }),
      events: {
        click: async (e: MouseEvent) => {
          e.preventDefault();

          if (this.props.id) {
            const chatId = +this.props.id;

            store.set('currentChatId', chatId);

            const token = await chatController.getChatToken(chatId);

            const user = store.getState().user as Indexed;

            if (user) {
              const userId = user.id;

              const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;

              const socket = new WsController(url);

              store.set('socket', socket);

              socket.open().then(() => {
                socket.getOldMessages();
              });
            }
          }
        },
      },
    });
  }

  render() {
    return `
      <button class="chat button-reset">
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
      </button>   
    `;
  }
}
