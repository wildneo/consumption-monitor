import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const initialState = {
  activeTab: 'tables',
};

export default handleActions({
  [actions.toggleActiveTab]: (state, { payload: { value } }) => ({
    ...state, activeTab: value
  }),
}, initialState);
