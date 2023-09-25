import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import investmentTypeReducer from './investmentTypeReducer';
import apiInformationReducer from './apiInformationReducer';
import balanceReducer from './balanceReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  investmentType: investmentTypeReducer,
  apiInformation: apiInformationReducer,
  balance: balanceReducer,
});

export default rootReducer;
