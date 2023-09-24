import apiInformationApi from 'src/api/api-informationApi';

export const GET_API_INFORMATIONS_REQUEST =
  '@apiInformation/get-apiInformation-request';
export const GET_API_INFORMATIONS_SUCCESS =
  '@apiInformation/get-apiInformation-success';
export const GET_API_INFORMATIONS_FAILURE =
  '@apiInformation/get-apiInformation-failure';

export const ADD_API_INFORMATION_REQUEST =
  '@apiInformation/add-apiInformation-request';
export const ADD_API_INFORMATION_SUCCESS =
  '@apiInformation/add-apiInformation-success';
export const ADD_API_INFORMATION_FAILURE =
  '@apiInformation/add-apiInformation-failure';

// export const UPDATE_API_INFORMATION_REQUEST =
//   '@apiInformation/update-apiInformation-request';
// export const UPDATE_API_INFORMATION_SUCCESS =
//   '@apiInformation/update-apiInformation-success';
// export const UPDATE_API_INFORMATION_FAILURE =
//   '@apiInformation/update-apiInformation-failure';

export function getApiInformations() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_API_INFORMATIONS_REQUEST });
      const apiInformations = await apiInformationApi.getAllApiInformation();
      dispatch({
        type: GET_API_INFORMATIONS_SUCCESS,
        payload: { apiInformations },
      });
    } catch (error) {
      dispatch({ type: GET_API_INFORMATIONS_FAILURE });
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

export function addApiInformation(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_API_INFORMATION_REQUEST });
      const apiInformation = await apiInformationApi.addApiInformation(data);
      dispatch({
        type: ADD_API_INFORMATION_SUCCESS,
        payload: { apiInformation },
      });
    } catch (error) {
      dispatch({ type: ADD_API_INFORMATION_FAILURE });
      throw error;
    }
  };
}
