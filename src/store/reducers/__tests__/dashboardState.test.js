import { toggleActiveTab } from '../../actions';
import dashboardState, { initialState } from '../dashboardState';

describe('filterState', () => {
  test(`Action: ${toggleActiveTab().type}`, () => {
    const expected = {
      activeTab: 'charts',
    };

    const nextState = dashboardState(initialState, toggleActiveTab({ value: 'charts' }));
    expect(nextState).toEqual(expected);
    expect(dashboardState(nextState, toggleActiveTab({ value: 'tables' }))).toEqual(initialState);
  });
});
