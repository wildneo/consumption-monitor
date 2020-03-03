import { createAction } from 'redux-actions';

export const getData = createAction('DATA_INITIALIZATION');
export const changeValue = createAction('VALUE_CHANGE');
export const toggleActiveTab = createAction('DASHBOARD_TOGGLE_TAB');
export const setRowsPerPage = createAction('TABLE_SET_ROWS_PER_PAGE');
export const setFilterConsumerType = createAction('FILTER_SET_TYPE');
export const setFilterDate = createAction('FILTER_SET_DATE');