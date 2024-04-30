import { AuthAPI } from '../api/AuthAPI';
import store from '../utils/Store';
import checkResponse from '../utils/checkResponse';

const api = new AuthAPI();

const authController = {
  async signUp(data: Record<string, unknown>) {
    try {
      store.set('badge', null);
      const response = await api.signUp(data) as XMLHttpRequest;

      return checkResponse(response);
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async logIn(data: Record<string, unknown>) {
    try {
      store.set('badge', null);
      const response = await api.logIn(data) as XMLHttpRequest;
      const status = response?.status;

      if (status >= 200 && status < 300) {
        return true;
      }

      const responseData = JSON.parse(response.response);

      if (responseData.reason === 'User already in system') {
        return true;
      }

      throw new Error(responseData.reason);
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async logOut() {
    try {
      store.set('badge', null);
      const response = await api.logOut() as XMLHttpRequest;

      return checkResponse(response, () => store.clear());
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },
};

export default authController;
