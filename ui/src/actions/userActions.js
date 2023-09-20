import userAPI from 'src/api/userAPI';

export const GET_USERS_REQUEST = '@user/get-users-request';
export const GET_USERS_SUCCESS = '@user/get-users-success';
export const GET_USERS_FAILURE = '@user/get-users-failure';

export const ADD_USER_REQUEST = '@user/add-user-request';
export const ADD_USER_SUCCESS = '@user/add-user-success';
export const ADD_USER_FAILURE = '@user/add-user-failure';

export const UPDATE_USER_REQUEST = '@user/update-user-request';
export const UPDATE_USER_SUCCESS = '@user/update-user-success';
export const UPDATE_USER_FAILURE = '@user/update-user-failure';

export function getUsers() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_USERS_REQUEST });
      const users = await userAPI.getUsers();
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { users },
      });
    } catch (error) {
      dispatch({ type: GET_USERS_FAILURE });
      throw error;
    }
  };
}

export function addUser(obj) {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
      const response = await userAPI.addUser(obj);
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: { response },
      });
    } catch (error) {
      dispatch({ type: ADD_USER_FAILURE });
      throw error;
    }
  };
}

export function updateUser(obj) {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const user = await userAPI.updateUser(obj);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAILURE });
      throw error;
    }
  };
}