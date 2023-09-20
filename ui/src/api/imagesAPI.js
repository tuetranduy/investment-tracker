import axios from 'axios';
import { API_URL } from 'src/constants/constants';

const instance = axios.create();
delete instance.defaults.headers.common['access_token'];

class ImagesAPI {
  addProductImages(productId, imageUrl) {
    return new Promise((resolve, reject) => {
      const data = {
        url: imageUrl,
        productId,
      };

      axios
        .post(`${API_URL}/admin/add-product-image`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  updateProductImages(productId, updatedImageUrl) {
    const updatedData = {
      productId: productId,
      imageUrls: updatedImageUrl,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/admin/update-product-image`, updatedData)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  uploadImages(data) {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    return new Promise((resolve, reject) => {
      instance
        .post('https://api.cloudinary.com/v1_1/dkmdj0cre/upload', data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

const imagesAPI = new ImagesAPI();

export default imagesAPI;
