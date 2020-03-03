import { combineReducers } from 'redux';
import consumersState from './consumersState';
import dashboardState from './dashboardState';
import tablesState from './tablesState';

export default combineReducers({
  consumersState,
  dashboardState,
  tablesState,
});