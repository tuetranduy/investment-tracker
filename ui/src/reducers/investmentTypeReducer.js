/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import { setAutoFreeze } from 'immer';
import {
  ADD_INVESTMENT_TYPE_SUCCESS,
  GET_INVESTMENT_TYPES_FAILURE,
  GET_INVESTMENT_TYPES_REQUEST,
  GET_INVESTMENT_TYPES_SUCCESS,
} from 'src/actions/investmentTypeAction';

setAutoFreeze(false);

const initialState = {
  investmentTypes: [],
  investmentType: {},
};

const investmentTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTMENT_TYPES_REQUEST: {
      return produce(state, (draft) => {
        draft.investmentTypes = null;
      });
    }

    case GET_INVESTMENT_TYPES_SUCCESS: {
      const { investmentTypes } = action.payload;

      return produce(state, (draft) => {
        draft.investmentTypes = investmentTypes;
      });
    }

    case GET_INVESTMENT_TYPES_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case ADD_INVESTMENT_TYPE_SUCCESS: {
      const { investmentType } = action.payload;

      return produce(state, (draft) => {
        draft.investmentTypes = draft.investmentTypes.concat(investmentType);
      });
    }

    // case UPDATE_PRODUCT_TYPE_SUCCESS: {
    //   const { productType } = action.payload;

    //   return produce(state, (draft) => {
    //     const { productTypes } = draft;

    //     const updatedProductTypes = _.map(productTypes, (item) => {
    //       if (item.id === productType.id) {
    //         return productType;
    //       }
    //       return item;
    //     });

    //     if (updatedProductTypes && updatedProductTypes.length > 0) {
    //       draft.productTypes = updatedProductTypes;
    //     }
    //   });
    // }

    // case UPDATE_PRODUCT_TYPE_FAILURE: {
    //   return produce(state, () => {
    //     // Maybe store error
    //   });
    // }

    default: {
      return state;
    }
  }
};

export default investmentTypeReducer;
