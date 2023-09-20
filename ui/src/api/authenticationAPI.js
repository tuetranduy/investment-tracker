import axios from 'axios';
import authHelper from 'src/helpers/authHelper';
import { API_URL } from '../constants/constants';

class AuthenticationAPI {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          authHelper.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = authHelper.getAccessToken();

    if (!accessToken) {
      return;
    }

    if (authHelper.isValidToken(accessToken)) {
      authHelper.setSession(accessToken);
    } else {
      authHelper.setSession(null);
    }
  }

  login(creds) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/login`, creds)
        .then((response) => {
          authHelper.setSession(response.data.data.token);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  logout = () => {
    authHelper.setSession(null);
  };
}

const authenticationAPI = new AuthenticationAPI();

export default authenticationAPI;
