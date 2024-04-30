import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from '../utils/BaseAPI';
import url from './url';

const chatAPIInstance = new HTTPTransport();

export class ChatAPI extends BaseAPI {
  createChat(title: string) {
    return chatAPIInstance.post(url.chats.base, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        title,
      },
    });
  }

  deleteChat(id: number) {
    return chatAPIInstance.delete(url.chats.base, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        chatId: id,
      },
    });
  }

  addUser(users: number[], chatId: Number) {
    return chatAPIInstance.put(url.chats.users, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        users,
        chatId,
      },
    });
  }

  deleteUser(users: number[], chatId: Number) {
    return chatAPIInstance.delete(url.chats.users, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        users,
        chatId,
      },
    });
  }

  request() {
    return chatAPIInstance.get(url.chats.base, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        limit: 50,
      },
    });
  }

  async editAvatar(data: FormData) {
    const response = await chatAPIInstance.put(url.chats.avatar, {
      data,
    });

    return response;
  }

  getToken(id: number) {
    return chatAPIInstance.post(`${url.chats.token}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
