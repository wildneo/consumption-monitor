import { createSelector } from 'reselect';
import { orderBy } from 'lodash';

export const getConsumers = (type) => ({ consumersState: { consumptions } }) => (
  type
    ? consumptions.filter((item) => item.type === type)
    : consumptions
);
export const getTableRowPerPage = (state) => state.tablesState.rowsPerPage;
export const getActideDashboardTab = (state) => state.dashboardState.activeTab;
export const getFilterConsumerType = (state) => state.filterState.consumerType;
export const getFilterDateInterval = (state) => state.filterState.dateInterval;

export const propertySelector = (type) => (prop, fn) => createSelector(
  getConsumers(type),
  (consumers) => {
    const store = new Map();
    consumers.forEach(({ [prop]: p }) => {
      const item = fn ? fn(p): p;
      store.set(item, item);
    });
    const values = Array.from(store.values());

    return orderBy(values);
  },
);

export const filteredByDateSelector = (type) => createSelector(
  [getConsumers(type), getFilterDateInterval],
  (consumers, filterDates) => {
    const from = filterDates.from.setHours(0, 0, 0, 0);
    const to = filterDates.to.setHours(0, 0, 0, 0);

    return consumers.filter((item) => {
      const date = new Date(item.Date);

      return date >= from && date <= to;
    })
  },
);
