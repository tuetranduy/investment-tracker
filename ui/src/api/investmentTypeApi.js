import axios from 'axios';
import { API_URL } from 'src/constants/constants';

class InvestmentTypeApi {
  getInvestmentTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/investment-types`)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }

  addInvestmentType(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/add-investment-type`, obj)
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

const investmentTypeApi = new InvestmentTypeApi();

export default investmentTypeApi;
