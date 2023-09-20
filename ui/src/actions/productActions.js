import productAPI from 'src/api/productAPI';

export const GET_PRODUCTS_REQUEST = '@product/get-products-request';
export const GET_PRODUCTS_SUCCESS = '@product/get-products-success';
export const GET_PRODUCTS_FAILURE = '@product/get-products-failure';

export const GET_PRODUCT_REQUEST = '@product/get-product-request';
export const GET_PRODUCT_SUCCESS = '@product/get-product-success';
export const GET_PRODUCT_FAILURE = '@product/get-product-failure';

export const DELETE_PRODUCT_REQUEST = '@product/delete-product-request';
export const DELETE_PRODUCT_SUCCESS = '@product/delete-product-success';
export const DELETE_PRODUCT_FAILURE = '@product/delete-product-failure';

export const CLEAR_PRODUCT = '@product/clear-product';

export const DELETE_IMAGE_FROM_PRODUCT = '@product/delete-image-from-product';

export function getProducts() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_REQUEST });
      const products = await productAPI.getProducts();
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: { products }
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_FAILURE });
      throw error;
    }
  };
}

export function getProduct(productId) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_REQUEST });
      const product = await productAPI.getProduct(productId);
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: { product }
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_FAILURE });
      throw error;
    }
  };
}

export function deleteProduct(productId) {
  return async (dispatch) => {
    try {
      const product = await productAPI.deleteProduct(productId);
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: { product }
      });
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAILURE });
      throw error;
    }
  };
}

export function clearProduct() {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCT,
    });
  };
}

export function deleteImageFromProduct(imageUrl) {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IMAGE_FROM_PRODUCT,
      payload: { imageUrl },
    });
  };
}