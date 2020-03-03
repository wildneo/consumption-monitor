export const getConsumers = (type) => ({ consumersState: { consumptions } }) => (
  type
    ? consumptions.filter((item) => item.type === type)
    : consumptions
);
export const getTableRowPerPage = (state) => state.tablesState.rowsPerPage;
export const getActideDashboardTab = (state) => state.dashboardState.activeTab;
export const getFilterConsumerType = (state) => state.filterState.consumerType;
export const getFilterDateInterval = (state) => state.filterState.dateInterval;
