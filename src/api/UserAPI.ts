import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from '../utils/BaseAPI';
import url from './url';

const userAPIInstance = new HTTPTransport();

export class UserAPI extends BaseAPI {
  async getUser() {
    const response = await userAPIInstance.get(url.auth.userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }

  async findUserByLogin(login: string) {
    const response = await userAPIInstance.post(url.user.search, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        login,
      },
    });

    return response;
  }

  async editPassword(data: { oldPassword: string, newPassword: string }) {
    const response = await userAPIInstance.put(url.user.password, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });

    return response;
  }

  async editProfile(data: Record<string, unknown>) {
    const response = await userAPIInstance.put(url.user.profile, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });

    return response;
  }

  async editAvatar(data: FormData) {
    const response = await userAPIInstance.put(url.user.avatar, {
      data,
    });

    return response;
  }
}
