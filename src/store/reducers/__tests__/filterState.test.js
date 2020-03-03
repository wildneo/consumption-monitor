import { setFilterDate, setFilterConsumerType } from '../../actions';
import filterState, { initialState } from '../filterState';

const mockInitialState = {
  ...initialState,
  dateInterval: {
    from: new Date('1914-07-28'),
    to: new Date('1918-11-11'),
  }
};

describe('filterState', () => {
  test(`Action: ${setFilterDate().type}`, () => {
    const dateFrom = new Date('1941-06-22');
    const dateTo = new Date('1945-05-09');
    const expected1 = {
      ...mockInitialState,
      dateInterval: {
        ...mockInitialState.dateInterval, from: dateFrom,
      },
    };
    const expected2 = {
      ...mockInitialState,
      dateInterval: {
        ...expected1.dateInterval, to: dateTo,
      },
    };
    const nextState = filterState(mockInitialState, setFilterDate({ type: 'from', value: dateFrom }));
    expect(nextState).toEqual(expected1);
    expect(filterState(nextState, setFilterDate({ type: 'to', value: dateTo }))).toEqual(expected2);
  });

  test(`Action: ${setFilterConsumerType().type}`, () => {
    const consumerType = 'plants';
    const expected = { ...initialState, consumerType };
    const nextState = filterState(initialState, setFilterConsumerType({ value: consumerType }));
    expect(nextState).toEqual(expected);
    expect(filterState(nextState, setFilterConsumerType({ value: 'all' }))).toEqual(initialState);
  });
});
