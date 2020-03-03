import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const initialState = { rowsPerPage: 20 };

export default handleActions({
  [actions.setRowsPerPage]: (state, { payload: { value } }) => ({
    ...state, rowsPerPage: value
  })
}, initialState);
