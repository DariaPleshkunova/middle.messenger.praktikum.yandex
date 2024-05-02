import { ChatAPI } from '../api/ChatAPI';
import store from '../utils/Store';
import checkResponse from '../utils/checkResponse';

const api = new ChatAPI();

const chatController = {
  async createChat(title: string) {
    try {
      store.set('badge', null);
      const response = await api.createChat(title) as XMLHttpRequest;

      return checkResponse(response);
    } catch (err) {
      store.set('badge', { message: 'Could not create the chat' });
      console.log(err);
    }
  },

  async deleteChat(id: number) {
    try {
      store.set('badge', null);
      const response = await api.deleteChat(id) as XMLHttpRequest;

      return checkResponse(response, () => store.set('currentChatId', null));
    } catch (err) {
      store.set('badge', { message: 'Could not delete the chat' });
      console.log(err);
    }
  },

  async getChats() {
    try {
      store.set('badge', null);
      const response = await api.request() as XMLHttpRequest;

      const data = checkResponse(response);
      store.set('chats', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  async addUser(users: number[], chatId: Number) {
    try {
      store.set('badge', null);
      const response = await api.addUser(users, chatId) as XMLHttpRequest;

      return checkResponse(response, () => store.set('badge', { message: 'User added', isError: false }));
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async deleteUser(users: number[], chatId: Number) {
    try {
      store.set('badge', null);
      const response = await api.deleteUser(users, chatId) as XMLHttpRequest;

      return checkResponse(response, () => store.set('badge', { message: 'User deleted', isError: false }));
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async editAvatar(chatId: Blob, file: File | null) {
    try {
      store.set('badge', null);

      if (file) {
        const formData = new FormData();
        formData.append('chatId', chatId);
        formData.append('avatar', file);

        const response = await api.editAvatar(formData) as XMLHttpRequest;
        const responseData = JSON.parse(response.responseText);
        const status = response.status;

        if (status >= 200 && status < 300) {
          const chats = store.getState().chats as Record<string, unknown>[];
          const currentChat = chats.find((chat) => chat.id === chatId);
          let newChats;

          if (currentChat) {
            currentChat.avatar = responseData.avatar;
            newChats = chats.map((chat) => (chat.id === chatId ? currentChat : chat));
          }

          store.set('badge', { message: 'Chat image changed', isError: false });

          store.set('chats', newChats);
          return true;
        }

        throw new Error(responseData.reason);
      }

      return true;
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async getChatToken(id: number) {
    try {
      store.set('badge', null);
      const response = await api.getToken(id) as XMLHttpRequest;

      const { token } = checkResponse(response);
      return token;
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },
};

export default chatController;
