import investmentTypeApi from 'src/api/investmentTypeApi';

export const GET_INVESTMENT_TYPES_REQUEST =
  '@investmentType/get-investmentType-request';
export const GET_INVESTMENT_TYPES_SUCCESS =
  '@investmentType/get-investmentType-success';
export const GET_INVESTMENT_TYPES_FAILURE =
  '@investmentType/get-investmentType-failure';

export const ADD_INVESTMENT_TYPE_REQUEST =
  '@investmentType/add-investmentType-request';
export const ADD_INVESTMENT_TYPE_SUCCESS =
  '@investmentType/add-investmentType-success';
export const ADD_INVESTMENT_TYPE_FAILURE =
  '@investmentType/add-investmentType-failure';

// export const UPDATE_INVESTMENT_TYPE_REQUEST =
//   '@investmentType/update-investmentType-request';
// export const UPDATE_INVESTMENT_TYPE_SUCCESS =
//   '@investmentType/update-investmentType-success';
// export const UPDATE_INVESTMENT_TYPE_FAILURE =
//   '@investmentType/update-investmentType-failure';

export function getInvestmentTypes() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_INVESTMENT_TYPES_REQUEST });
      const investmentTypes = await investmentTypeApi.getInvestmentTypes();
      dispatch({
        type: GET_INVESTMENT_TYPES_SUCCESS,
        payload: { investmentTypes },
      });
    } catch (error) {
      dispatch({ type: GET_INVESTMENT_TYPES_FAILURE });
      throw error;
    }
  };
}

// export function updateProductType(obj) {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_PRODUCT_TYPE_REQUEST });
//       const productType = await productTypeAPI.editProductType(obj);
//       dispatch({
//         type: UPDATE_PRODUCT_TYPE_SUCCESS,
//         payload: { productType },
//       });
//     } catch (error) {
//       dispatch({ type: UPDATE_PRODUCT_TYPE_FAILURE });
//       throw error;
//     }
//   };
// }

export function addInvestmentType(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_INVESTMENT_TYPE_REQUEST });
      const investmentType = await investmentTypeApi.addInvestmentType(data);
      dispatch({
        type: ADD_INVESTMENT_TYPE_SUCCESS,
        payload: { investmentType },
      });
    } catch (error) {
      dispatch({ type: ADD_INVESTMENT_TYPE_FAILURE });
      throw error;
    }
  };
}
