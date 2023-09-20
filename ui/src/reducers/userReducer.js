/* eslint-disable no-param-reassign */
import produce from 'immer';
import _ from 'lodash';
import { setAutoFreeze } from 'immer';
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from 'src/actions/userActions';

setAutoFreeze(false);

const initialState = {
  users: [],
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST: {
      return produce(state, (draft) => {
        draft.users = [];
      });
    }

    case GET_USERS_SUCCESS: {
      const { users } = action.payload;

      return produce(state, (draft) => {
        draft.users = users;
      });
    }

    case GET_USERS_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case ADD_USER_REQUEST: {
      return produce(state, (draft) => {
        draft.user = {};
      });
    }

    case ADD_USER_SUCCESS: {
      const { response } = action.payload;

      return produce(state, (draft) => {
        draft.users = draft.users.concat(response);
      });
    }

    case ADD_USER_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case UPDATE_USER_REQUEST: {
      return produce(state, (draft) => {
        draft.user = [];
      });
    }

    case UPDATE_USER_SUCCESS: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        const { users } = draft;

        const updatedUsers = _.map(users, (item) => {
          if (item.id === user.id) {
            return user;
          }
          return item;
        });

        if (updatedUsers && updatedUsers.length > 0) {
          draft.users = updatedUsers;
        }
      });
    }

    case UPDATE_USER_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
