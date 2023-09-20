/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_USER_DATA,
} from 'src/actions/accountActions';

const initialState = {
  account: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return produce(state, (draft) => {
        draft.account = null;
      });
    }

    case LOGIN_SUCCESS: {
      const { decodedToken } = action.payload;

      return produce(state, (draft) => {
        draft.account = decodedToken;
      });
    }

    case LOGIN_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.account = null;
      });
    }

    case SET_USER_DATA: {
      const { account } = action.payload;

      return produce(state, (draft) => {
        draft.account = account;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
