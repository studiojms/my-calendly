const AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';

export default class AuthenticationUtils {
  static setAuthenticationToken(token) {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      window.localStorage.setItem(AUTHENTICATION_TOKEN, JSON.stringify(token));
    }
  }

  static getAuthenticationToken() {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      const data = window.localStorage.getItem(AUTHENTICATION_TOKEN);
      return JSON.parse(data);
    }
  }

  static clearAuthenticationToken() {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      window.localStorage.removeItem(AUTHENTICATION_TOKEN);
    }
  }
}
