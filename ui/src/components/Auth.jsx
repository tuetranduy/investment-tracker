import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from 'src/components/SplashScreen';
import {setUserData, logout} from 'src/actions/accountActions';
import authenticationAPI from 'src/api/authenticationAPI';
import authHelper from 'src/helpers/authHelper';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../constants/constants';

function Auth({children}) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      authenticationAPI.setAxiosInterceptors({
        onLogout: () => dispatch(logout()),
      });

      authenticationAPI.handleAuthentication();

      if (authHelper.isAuthenticated()) {
        const token = authHelper.getAccessToken();

        try {
          const decodedToken = jwt.verify(token, SECRET_KEY);
          dispatch(setUserData(decodedToken));
        } catch (error) {
          authHelper.setSession(null);
          dispatch(setUserData(null));
        }
      }

      setLoading(false);
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen/>;
  }

  return children;
}

Auth.propTypes = {
  children: PropTypes.any
};

export default Auth;
