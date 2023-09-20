import jwtDecode from 'jwt-decode';

import authenticationAPI from 'src/api/authenticationAPI';
export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SET_USER_DATA = '@account/set-user-data';
export const LOGOUT = '@account/logout';

export function login(creds) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const response = await authenticationAPI.login(creds);
      const { user } = response.data.data;
      const { token } = response.data.data;
      const decodedToken = jwtDecode(token);

      if (user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { decodedToken }
        });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(account) {
  return (dispatch) =>
    dispatch({
      type: SET_USER_DATA,
      payload: {
        account
      }
    });
}

export function logout() {
  return async (dispatch) => {
    authenticationAPI.logout();

    dispatch({
      type: LOGOUT
    });
  };
}
