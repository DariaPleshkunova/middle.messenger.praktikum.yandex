import { UserAPI } from '../api/UserAPI';
import store from '../utils/Store';
import checkResponse from '../utils/checkResponse';

const api = new UserAPI();

const userController = {
  async getUser() {
    try {
      const response = await api.getUser() as XMLHttpRequest;
      const responseData = checkResponse(response);
      store.set('user', responseData);
      return responseData;
    } catch (err) {
      console.log(err);
    }
  },

  async findUserByLogin(login: string) {
    try {
      store.set('badge', null);
      const response = await api.findUserByLogin(login) as XMLHttpRequest;
      const responseData = checkResponse(response);

      if (responseData.length === 0) {
        throw new Error('This user does not exist');
      }

      return responseData[0];
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async editPassword(data: { oldPassword: string, newPassword: string }) {
    try {
      store.set('badge', null);
      const response = await api.editPassword(data) as XMLHttpRequest;

      return checkResponse(response, () => store.set('badge', { message: 'Password changed', isError: false }));
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async editProfile(data: Record<string, unknown>) {
    try {
      store.set('badge', null);
      const response = await api.editProfile(data) as XMLHttpRequest;
      const responseData = checkResponse(response);
      store.set('user', responseData);
      return responseData;
    } catch (err) {
      store.set('badge', { message: err.message });
      console.log(err);
    }
  },

  async editAvatar(file: File | null) {
    try {
      store.set('badge', null);

      if (file) {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await api.editAvatar(formData) as XMLHttpRequest;
        const responseData = JSON.parse(response.responseText);
        const status = response.status;

        if (status >= 200 && status < 300) {
          store.set('user', responseData);
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
};

export default userController;
