import config from '../Config';

const TokenService = {
  saveAuthToken(token, id) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
    window.sessionStorage.setItem(config.USER_ID, id)
  },
  
  getAuthToken() {//
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },

  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
    window.sessionStorage.removeItem(config.USER_ID)
    window.sessionStorage.removeItem(config.BIRTHYEAR)
    window.sessionStorage.removeItem(config.USERNAME)
  },

  hasAuthToken() {//
    return !!TokenService.getAuthToken()
  },

  makeBasicAuthToken(userName, password) {//
    return window.btoa(`${userName}:${password}`)
  },
};

export default TokenService