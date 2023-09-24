import axios from 'axios';
import { API_URL } from 'src/constants/constants';

class ApiInformationApi {
  getAllApiInformation() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/api-informations`)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  getApiInformationByPlatform(obj) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/api-information`, { params: { description: obj } })
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  addApiInformation(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/add-api-information`, obj)
        .then((response) => resolve(response.data.data))
        .catch((error) => {
          reject(error);
        });
    });
  }

  // editProductType(obj) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(`${API_URL}/admin/edit-product-type`, obj)
  //       .then((response) => resolve(response.data.data))
  //       .catch((error) => reject(error));
  //   });
  // }
}

const apiInformationApi = new ApiInformationApi();

export default apiInformationApi;
