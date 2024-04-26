import Block from '../../utils/Block';
import { SideMenu } from '../../components/side-menu';
import { Dialog } from '../../components/dialog';
import { ProfilePopup } from '../../components/profile-popup';
import { StandardPopup } from '../../components/standard-popup';
import { Input } from '../../components/input';
import { Badge } from '../../components/badge';

import chatController from '../../controllers/chatController';
import userController from '../../controllers/userController';
import store from '../../utils/Store';
import { Indexed } from '../../types';

export class ChatPage extends Block {
  constructor(props: Indexed) {
    super({
      ...props,
      sideMenu: new SideMenu({}),
      dialog: new Dialog({}),
      profilePopup: new ProfilePopup({ routeHandlers: props.routeHandlers }),

      newChatPopup: new StandardPopup({
        dataPopup: 'add-user',
        headingText: 'New chat with user',
        submitButtonClass: 'button_success',
        submitButtonText: 'Add',

        onSubmit: async (data) => {
          const user = await userController.findUserByLogin(data.login);

          if (user) {
            const chat = await chatController.createChat(`${user.first_name} ${user.second_name}`);

            const isSuccess = await chatController.addUser([user.id], chat.id);

            if (isSuccess) {
              this.children.newChatPopup.getContent()?.classList.remove('is-active');
              chatController.getChats();
            }
          }
        },

        inputs: [
          new Input({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
          }),
        ],
      }),

      editPasswordPopup: new StandardPopup({
        dataPopup: 'edit-password',
        headingText: 'Edit password',
        submitButtonClass: 'button_success',
        submitButtonText: 'Change password',

        inputs: [
          new Input({
            name: 'oldPassword',
            type: 'password',
            label: 'Old password',
            required: true,
          }),

          new Input({
            name: 'newPassword',
            type: 'password',
            label: 'New Password',
            required: true,
          }),
        ],

        onSubmit: async (data) => {
          const isSuccess = await userController.editPassword(data);

          if (isSuccess) {
            this.children.editPasswordPopup.getContent()?.classList.remove('is-active');
          }
        },
      }),

      deleteChatPopup: new StandardPopup({
        dataPopup: 'delete-chat',
        headingText: 'Are you sure you want to delete this chat?',
        submitButtonClass: 'button_danger',
        submitButtonText: 'Delete',

        onSubmit: async () => {
          const chatId = store.getState().currentChatId as number;
          const isSuccess = await chatController.deleteChat(chatId);

          if (isSuccess) {
            this.children.deleteChatPopup.getContent()?.classList.remove('is-active');
            chatController.getChats();
          }
        },
      }),

      addUserToChatPopup: new StandardPopup({
        dataPopup: 'add-user-to-chat',
        headingText: 'Add user to chat',
        submitButtonClass: 'button_success',
        submitButtonText: 'Add',

        onSubmit: async (data) => {
          const user = await userController.findUserByLogin(data.login);

          if (user) {
            const chatId = store.getState().currentChatId as number;
            const isSuccess = await chatController.addUser([user.id], chatId);

            if (isSuccess) {
              this.children.addUserToChatPopup.getContent()?.classList.remove('is-active');
            }
          }
        },

        inputs: [
          new Input({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
          }),
        ],
      }),

      deleteUserPopup: new StandardPopup({
        dataPopup: 'delete-user-from-chat',
        headingText: 'Delete user from chat',
        submitButtonClass: 'button_danger',
        submitButtonText: 'Delete',

        onSubmit: async (data) => {
          const user = await userController.findUserByLogin(data.login);

          if (user) {
            const chatId = store.getState().currentChatId as number;
            const isSuccess = await chatController.deleteUser([user.id], chatId);

            if (isSuccess) {
              this.children.deleteUserPopup.getContent()?.classList.remove('is-active');
            }
          }
        },

        inputs: [
          new Input({
            name: 'login',
            type: 'text',
            label: 'Login',
            required: true,
          }),
        ],
      }),

      badge: new Badge({}),

      events: {
        click: (e: Event) => {
          const popupTriggers = this.getContent()?.querySelectorAll('.js-modal-btn');

          popupTriggers?.forEach((trigger: HTMLElement) => {
            if (trigger.contains(e.target as HTMLElement)) {
              const dataPopupTrigger = trigger.dataset.popupTrigger;
              const popup = this.getContent()?.querySelector(`[data-popup="${dataPopupTrigger}"]`);
              popup?.classList.add('is-active');
            }
          });
        },
      },
    });
  }

  render() {
    chatController.getChats();

    return `
      <div class="page chat-page">
        {{{ sideMenu }}}

        <main class="main">
          <p class="text text_gray main__start-text">Select a chat</p>

          {{{ dialog }}}
        </main>

        {{{ profilePopup }}}

        {{{ newChatPopup }}}
        {{{ addUserToChatPopup }}}
        {{{ deleteChatPopup }}}
        {{{ editPasswordPopup }}}
        {{{ deleteChatPopup }}}
        {{{ deleteUserPopup }}}

        {{{ badge }}}
      </div>
    `;
  }
}
