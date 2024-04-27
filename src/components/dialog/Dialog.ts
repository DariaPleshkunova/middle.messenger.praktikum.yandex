import Block from '../../utils/Block';

import { Avatar } from '../avatar';
import { MoreButton } from '../more-button';
import { Title } from '../title';
import { Message } from '../message';
import { MessageForm } from '../message-form';

import store from '../../utils/Store';
import connect from '../../utils/connect';
import { ContextMenu } from '../context-menu';
import { DialogItem } from '../dialog-item';
import { ChatProps } from '../chat/Chat';
import { MessageProps } from '../message/Message';
import WsController from '../../controllers/wsController';

import {
  Indexed,
  ChatState,
  UserState,
  MessageState,
} from '../../types';

interface DialogProps {
  currentChat?: ChatProps;
  messages?: MessageProps[];
  isActive?: boolean;
}

export class Dialog extends Block {
  constructor(props: DialogProps) {
    super({
      ...props,
      avatar: new Avatar({ isStandard: true }),
      title: new Title({}),
      moreButton: new MoreButton({
        onClick: () => {
          this.children.dialogMenu.setProps({ isActive: true });
        },
      }),
      dialogMenu: new ContextMenu({ className: 'dialog__menu' }),
      dialogItems: [],
      messageForm: new MessageForm({
        onSubmit(data: Record<string, string>) {
          const socket = store.getState().socket as WsController;

          socket.sendMessage(data.message);
        },
      }),
    });
  }

  render() {
    const currentChat = this.props.currentChat as ChatState;

    if (currentChat) {
      this.children.avatar.setProps({ imageUrl: currentChat.avatar });
      this.children.title.setProps({ text: currentChat.title });
    }

    return `
      <div class="dialog {{#if isActive}}is-active{{/if}}">
        <header class="dialog__header">
          <div class="dialog__author">
            {{{ avatar }}}

            {{{ title }}}
          </div>
          
          <div class="dialog__more-button-wrapper">
            {{{ moreButton }}}
            
            {{{ dialogMenu }}}
          </div>
        </header>

        <div class="dialog__container">
          <div class="dialog__wrapper">
            <div class="dialog__content">
              {{{ dialogItems }}}
            </div>
          </div>

          {{{ messageForm }}}
        </div>            
      </div>
    `;
  }
}

function mapDialogToProps(state: Indexed) {
  const currentChatId = state.currentChatId;
  let currentChat: ChatState | {} = {};
  const userState = state.user as UserState;
  const messagesState = state.messages as MessageState[];
  const chatsState = state.chats as ChatState[];

  if (currentChatId) {
    const foundChat = chatsState.find((chat) => chat.id === currentChatId);

    if (foundChat) {
      currentChat = foundChat;
    }
  }

  function splitMessagesByDate(messages: Message[]): { [date: string]: Message[] } {
    const messagesByDate: { [date: string]: Message[] } = {};

    messages?.forEach((message) => {
      const messageProps = message.props as MessageProps;
      const date = messageProps?.datetime?.split('T').shift();

      if (date) {
        if (!messagesByDate[date]) {
          messagesByDate[date] = [];
        }

        messagesByDate[date].push(message);
      }
    });

    return messagesByDate;
  }

  const messages: Message[] = messagesState?.map((message) => new Message({
    text: message.content,
    className: message.user_id === userState.id ? 'is-authored' : '',
    datetime: message.time,
  })).reverse();

  const messagesItems = splitMessagesByDate(messages);
  const messItems = [];

  for (const [date, messagesArray] of Object.entries(messagesItems)) {
    messItems.push(new DialogItem({ datetime: date, messages: messagesArray }));
  }

  return {
    currentChat,
    messages: messItems,
    isActive: Object.keys(currentChat).length > 0,
  };
}

export default connect(Dialog as typeof Block, mapDialogToProps);
