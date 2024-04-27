const baseUrl = 'https://ya-praktikum.tech/api/v2';

const url = {
  auth: {
    signup: `${baseUrl}/auth/signup`,
    login: `${baseUrl}/auth/signin`,
    userInfo: `${baseUrl}/auth/user`,
    logout: `${baseUrl}/auth/logout`,
  },

  chats: {
    base: `${baseUrl}/chats`,
    users: `${baseUrl}/chats/users`,
    token: `${baseUrl}/chats/token`,
  },

  user: {
    search: `${baseUrl}/user/search`,
    password: `${baseUrl}/user/password`,
    profile: `${baseUrl}/user/profile`,
    avatar: `${baseUrl}/user/profile/avatar`,
  },

  resources: `${baseUrl}/resources`,
};

export default url;
