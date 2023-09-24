/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import { setAutoFreeze } from 'immer';
import {
  ADD_API_INFORMATION_SUCCESS,
  GET_API_INFORMATIONS_FAILURE,
  GET_API_INFORMATIONS_REQUEST,
  GET_API_INFORMATIONS_SUCCESS,
} from 'src/actions/apiInformationActions';

setAutoFreeze(false);

const initialState = {
  apiInformations: [],
  apiInformation: {},
};

const apiInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_INFORMATIONS_REQUEST: {
      return produce(state, (draft) => {
        draft.apiInformations = null;
      });
    }

    case GET_API_INFORMATIONS_SUCCESS: {
      const { apiInformations } = action.payload;

      return produce(state, (draft) => {
        draft.apiInformations = apiInformations;
      });
    }

    case GET_API_INFORMATIONS_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case ADD_API_INFORMATION_SUCCESS: {
      const { apiInformation } = action.payload;

      return produce(state, (draft) => {
        draft.apiInformations = draft.apiInformations.concat(apiInformation);
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

export default apiInformationReducer;
