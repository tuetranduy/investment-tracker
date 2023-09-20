import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import productReducer from './productReducer';
import productTypeReducer from './productTypeReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  product: productReducer,
  productType: productTypeReducer,
  account: accountReducer,
  user: userReducer
});

export default rootReducer;
