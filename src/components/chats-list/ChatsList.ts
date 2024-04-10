import Block from '../../utils/Block';
import { Chat } from '../chat';

interface ChatsListProps {
  className?: string,
}

export class ChatsList extends Block {
  constructor(props: ChatsListProps) {
    super({
      ...props,
      chats: [
        new Chat({ className: 'js-chat', isPinned: true }),
        new Chat({ className: 'js-chat' }),
        new Chat({ className: 'js-chat is-active' }),
        new Chat({ className: 'js-chat' }),
      ],
    });
  }

  render() {
    return `
      <div class="chats-list {{ className }}">
        {{{ chats }}}
      </div>
    `;
  }
}
