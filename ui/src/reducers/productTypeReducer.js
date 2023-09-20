/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import { setAutoFreeze } from 'immer';
import {
  ADD_PRODUCT_TYPE_SUCCESS,
  GET_PRODUCT_TYPES_FAILURE,
  GET_PRODUCT_TYPES_REQUEST,
  GET_PRODUCT_TYPES_SUCCESS,
  UPDATE_PRODUCT_TYPE_FAILURE,
  UPDATE_PRODUCT_TYPE_SUCCESS,
} from 'src/actions/productTypeActions';

setAutoFreeze(false);

const initialState = {
  productTypes: []
};

const productTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_TYPES_REQUEST: {
      return produce(state, (draft) => {
        draft.productTypes = null;
      });
    }

    case GET_PRODUCT_TYPES_SUCCESS: {
      const { productTypes } = action.payload;

      return produce(state, (draft) => {
        draft.productTypes = productTypes;
      });
    }

    case GET_PRODUCT_TYPES_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case ADD_PRODUCT_TYPE_SUCCESS: {
      const { productType } = action.payload;

      return produce(state, (draft) => {
        draft.productTypes = draft.productTypes.concat(productType);
      });
    }

    case UPDATE_PRODUCT_TYPE_SUCCESS: {
      const { productType } = action.payload;

      return produce(state, (draft) => {
        const { productTypes } = draft;

        const updatedProductTypes = _.map(productTypes, (item) => {
          if (item.id === productType.id) {
            return productType;
          }
          return item;
        });

        if (updatedProductTypes && updatedProductTypes.length > 0) {
          draft.productTypes = updatedProductTypes;
        }
      });
    }

    case UPDATE_PRODUCT_TYPE_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    default: {
      return state;
    }
  }
};

export default productTypeReducer;
