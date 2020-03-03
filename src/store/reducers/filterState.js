import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const initialState = {
  dateInterval: { from: new Date('2019-01-01'), to: new Date() },
  consumerType: 'all',
};

export default handleActions({
  [actions.setFilterConsumerType]: (state, { payload: { value } }) => ({
    ...state, consumerType: value
  }),
  [actions.setFilterDate]: (state, { payload: { type, value } }) => ({
    ...state, dateInterval: { ...state.dateInterval, [type]: value }
  }),
}, initialState);
