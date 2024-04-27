import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from '../utils/BaseAPI';
import url from './url';

const authAPIInstance = new HTTPTransport();

export class AuthAPI extends BaseAPI {
  async signUp(data: Record<string, unknown>) {
    const response = await authAPIInstance.post(url.auth.signup, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });

    return response;
  }

  async logIn(data: Record<string, unknown>) {
    const response = await authAPIInstance.post(url.auth.login, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });

    return response;
  }

  async logOut() {
    const response = await authAPIInstance.post(url.auth.logout, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }
}
