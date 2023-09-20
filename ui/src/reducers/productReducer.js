/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import { setAutoFreeze } from 'immer';
import {
  CLEAR_PRODUCT,
  DELETE_PRODUCT_FAILURE,
  DELETE_IMAGE_FROM_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from 'src/actions/productActions';

setAutoFreeze(false);

const initialState = {
  products: [],
  product: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return produce(state, (draft) => {
        draft.products = [];
      });
    }

    case GET_PRODUCTS_SUCCESS: {
      const { products } = action.payload;

      return produce(state, (draft) => {
        draft.products = products;
      });
    }

    case GET_PRODUCTS_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case GET_PRODUCT_REQUEST: {
      return produce(state, (draft) => {
        draft.product = {};
      });
    }

    case GET_PRODUCT_SUCCESS: {
      const { product } = action.payload;

      return produce(state, (draft) => {
        draft.product = product;
      });
    }

    case GET_PRODUCT_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case CLEAR_PRODUCT: {
      return produce(state, (draft) => {
        draft.product = {};
      });
    }

    case DELETE_PRODUCT_SUCCESS: {
      const { product } = action.payload;

      return produce(state, (draft) => {
        const { products } = draft;

        const updatedProducts = _.map(products, (item) => {
          if (item.id === product.id) {
            return product;
          }
          return item;
        });

        if (updatedProducts && updatedProducts.length > 0) {
          draft.products = updatedProducts;
        }
      });
    }

    case DELETE_PRODUCT_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case DELETE_IMAGE_FROM_PRODUCT: {
      const { imageUrl } = action.payload;

      return produce(state, (draft) => {
        let { product } = draft;
        const imageUrls = product.productImages[0].url.split(',');

        const updatedProductImages = _.reject(imageUrls, (item) => {
          return item === imageUrl;
        });

        draft.product.productImages[0].url = updatedProductImages.join(',');
      });
    }

    default: {
      return state;
    }
  }
};

export default productReducer;
