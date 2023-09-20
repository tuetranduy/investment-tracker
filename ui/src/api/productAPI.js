import querystring from 'querystring';
import axios from 'axios';
import { API_URL } from 'src/constants/constants';

class ProductAPI {
  getProducts() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/products`)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  getProduct(productId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/product/${productId}`)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  addProduct(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/add-product`, obj)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  updateProduct(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/edit-product`, obj)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const data = querystring.stringify({ id });
      axios
        .post(`${API_URL}/admin/delete-product`, data)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }
}

const productAPI = new ProductAPI();

export default productAPI;
