import axios from 'axios';
import { API_URL } from 'src/constants/constants';

class BalanceApi {
  getBinanceBalance() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/binance/balance`)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  }
}

const balanceApi = new BalanceApi();

export default balanceApi;
