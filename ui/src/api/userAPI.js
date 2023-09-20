import axios from 'axios';
import { API_URL } from 'src/constants/constants';

class UserAPI {
  getUsers() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/admin/users`)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  updatePassword(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/change-password`, obj)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  addUser(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/register`, obj)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  updateUser(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/update-user`, obj)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }
}

const userAPI = new UserAPI();

export default userAPI;
