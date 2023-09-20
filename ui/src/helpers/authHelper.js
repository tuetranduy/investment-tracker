import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthHelper {
  getAccessToken = () => localStorage.getItem('accessToken');

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.access_token = `${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.access_token;
    }
  };

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    try {
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return;
    }
  };

  isAuthenticated = () => !!this.getAccessToken();
}

const authHelper = new AuthHelper();

export default authHelper;
