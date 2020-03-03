import { combineReducers } from 'redux';
import consumersState from './consumersState';
import dashboardState from './dashboardState';

export default combineReducers({
  consumersState,
  dashboardState,
});