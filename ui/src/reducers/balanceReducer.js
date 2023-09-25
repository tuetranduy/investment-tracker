/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import { setAutoFreeze } from 'immer';
import {
  GET_BINANCE_BALANCE_FAILURE,
  GET_BINANCE_BALANCE_REQUEST,
  GET_BINANCE_BALANCE_SUCCESS,
} from 'src/actions/balanceActions';

setAutoFreeze(false);

const initialState = {
  binanceBalance: null,
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BINANCE_BALANCE_REQUEST: {
      return produce(state, (draft) => {
        draft.binanceBalance = null;
      });
    }

    case GET_BINANCE_BALANCE_SUCCESS: {
      const { response } = action.payload;

      return produce(state, (draft) => {
        draft.binanceBalance = response.balance;
      });
    }

    case GET_BINANCE_BALANCE_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    default: {
      return state;
    }
  }
};

export default balanceReducer;
