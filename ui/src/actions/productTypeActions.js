import productTypeAPI from 'src/api/productTypeAPI';

export const GET_PRODUCT_TYPES_REQUEST =
  '@productType/get-product-types-request';
export const GET_PRODUCT_TYPES_SUCCESS =
  '@productType/get-product-types-success';
export const GET_PRODUCT_TYPES_FAILURE =
  '@productType/get-product-types-failure';

export const ADD_PRODUCT_TYPE_REQUEST = '@productType/add-productType-request';
export const ADD_PRODUCT_TYPE_SUCCESS = '@productType/add-productType-success';
export const ADD_PRODUCT_TYPE_FAILURE = '@productType/add-productType-failure';

export const UPDATE_PRODUCT_TYPE_REQUEST =
  '@productType/update-productType-request';
export const UPDATE_PRODUCT_TYPE_SUCCESS =
  '@productType/update-productType-success';
export const UPDATE_PRODUCT_TYPE_FAILURE =
  '@productType/update-productType-failure';

export function getProductTypes() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_TYPES_REQUEST });
      const productTypes = await productTypeAPI.getProductTypes();
      dispatch({
        type: GET_PRODUCT_TYPES_SUCCESS,
        payload: { productTypes },
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_TYPES_FAILURE });
      throw error;
    }
  };
}

export function updateProductType(obj) {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_TYPE_REQUEST });
      const productType = await productTypeAPI.editProductType(obj);
      dispatch({
        type: UPDATE_PRODUCT_TYPE_SUCCESS,
        payload: { productType },
      });
    } catch (error) {
      dispatch({ type: UPDATE_PRODUCT_TYPE_FAILURE });
      throw error;
    }
  };
}

export function addProductType(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_PRODUCT_TYPE_REQUEST });
      const productType = await productTypeAPI.addProductType(data);
      dispatch({
        type: ADD_PRODUCT_TYPE_SUCCESS,
        payload: { productType },
      })
    } catch (error) {
      dispatch({ type: ADD_PRODUCT_TYPE_FAILURE });
      throw error;
    }
  };
}
