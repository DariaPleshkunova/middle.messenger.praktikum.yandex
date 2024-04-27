import { ChatAPI } from '../api/ChatAPI';
import store from '../utils/Store';

const api = new ChatAPI();

const chatController = {
  async createChat(title: string) {
    try {
      store.set('badge', null);
      const response = await api.createChat(title) as XMLHttpRequest;
      const status = response.status;
      const data = JSON.parse(response.response);

      if (status >= 200 && status < 300) {
        return data;
      }
    } catch (err) {
      store.set('badge', { message: 'Could not create the chat' });
      console.log(err);
    }
  },

  async deleteChat(id: number) {
    try {
      store.set('badge', null);
      const response = await api.deleteChat(id) as XMLHttpRequest;
      const status = response.status;

      if (status >= 200 && status < 300) {
        store.set('currentChatId', null);
        return true;
      }
    } catch (err) {
      store.set('badge', { message: 'Could not delete the chat' });
      console.log(err);
    }
  },

  async getChats() {
    try {
      store.set('badge', null);
      const response = await api.request() as XMLHttpRequest;
      const data = JSON.parse(response.response);
      const status = response?.status;

      if (status >= 200 && status < 300) {
        store.set('chats', data);
        return data;
      }

      const responseData = JSON.parse(response.response);
      throw new Error(responseData.reason);
    } catch (err) {
      console.log(err);
    }
  },

  async addUser(users: number[], chatId: Number) {
    try {
      store.set('badge', null);
      const response = await api.addUser(users, chatId) as XMLHttpRequest;
      const status = response.status;

      if (status >= 200 && status < 300) {
        store.set('badge', { message: 'User added', isError: false });
        return true;
      }

      const responseData = JSON.parse(response.response);
      throw new Error(responseData.reason);
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async deleteUser(users: number[], chatId: Number) {
    try {
      store.set('badge', null);
      const response = await api.deleteUser(users, chatId) as XMLHttpRequest;
      const status = response.status;

      if (status >= 200 && status < 300) {
        store.set('badge', { message: 'User deleted', isError: false });
        return true;
      }

      const responseData = JSON.parse(response.response);
      throw new Error(responseData.reason);
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async getChatToken(id: number) {
    try {
      store.set('badge', null);
      const response = await api.getToken(id) as XMLHttpRequest;
      const data = JSON.parse(response.response);
      const status = response?.status;

      if (status >= 200 && status < 300) {
        return data.token;
      }

      const responseData = JSON.parse(response.response);
      throw new Error(responseData.reason);
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },
};

export default chatController;
