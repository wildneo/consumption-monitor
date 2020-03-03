import { setRowsPerPage } from '../../actions';
import tablesState, { initialState } from '../tablesState';

describe('filterState', () => {
  test(`Action: ${setRowsPerPage().type}`, () => {
    const expected = {
      rowsPerPage: 10,
    };

    const nextState = tablesState(initialState, setRowsPerPage({ value: 10 }));
    expect(nextState).toEqual(expected);
    expect(tablesState(nextState, setRowsPerPage({ value: 20 }))).toEqual(initialState);
  });
});
