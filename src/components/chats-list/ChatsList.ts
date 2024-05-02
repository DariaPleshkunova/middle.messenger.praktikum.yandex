import Block from '../../utils/Block';
import { Chat } from '../chat';

import connect from '../../utils/connect';
import { ChatState, Indexed } from '../../types';

interface ChatsListProps {
  className?: string,
}

export class ChatsList extends Block {
  constructor(props: ChatsListProps) {
    super({
      ...props,
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

function mapChatsToProps(state: Indexed) {
  const chatsState = state.chats as ChatState[];

  const chats = chatsState?.map((chat) => {
    const initials = chat.title.split(' ').map((namepart) => namepart.charAt(0)).slice(0, 3).join('');

    return new Chat({
      id: chat.id,
      title: chat.title,
      unread_count: chat.unread_count,
      avatar: chat.avatar,
      initials,
      last_message: {
        text: chat.last_message ? chat.last_message.content : '',
        datetime: chat.last_message ? chat.last_message.time : '',
      },
    });
  });

  return {
    chats,
  };
}

export default connect(ChatsList as typeof Block, mapChatsToProps);
