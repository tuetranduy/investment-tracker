import axios from 'axios';
import { API_URL } from 'src/constants/constants';

class ProductTypeAPI {
  getProductTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/admin/get-product-types`)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  addProductType(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/add-product-type`, obj)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  editProductType(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/edit-product-type`, obj)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }
}

const productTypeAPI = new ProductTypeAPI();

export default productTypeAPI;
