import balanceApi from 'src/api/balanceApi';

export const GET_BINANCE_BALANCE_REQUEST =
  '@balance/get-binance-balance-request';
export const GET_BINANCE_BALANCE_SUCCESS =
  '@balance/get-binance-balance-success';
export const GET_BINANCE_BALANCE_FAILURE =
  '@balance/get-binance-balance-failure';

export function getBinanceBalance() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BINANCE_BALANCE_REQUEST });
      const response = await balanceApi.getBinanceBalance();
      dispatch({
        type: GET_BINANCE_BALANCE_SUCCESS,
        payload: { response },
      });
    } catch (error) {
      dispatch({ type: GET_BINANCE_BALANCE_FAILURE });
      throw error;
    }
  };
}
