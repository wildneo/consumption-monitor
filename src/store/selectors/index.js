import { createSelector } from 'reselect';
import { chunk, orderBy } from 'lodash';
import { formatDate } from '../../utils';

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

export const chunkedTableDataSelector = (type) => createSelector(
  [filteredByDateSelector(type), getTableRowPerPage],
  (consumers, rowsPerPage) => {
    const data = consumers.map((item) => ({ ...item, Date: formatDate(item.Date) }));
    return data.length > 0 && rowsPerPage > 0 ? chunk(data, rowsPerPage) : data;
  },
);

export const totalChartDataSelector = createSelector(
  [getConsumers(), propertySelector()('Date')],
  (consumers, timeline) => {
    const groupByDate = consumers.reduce((acc, item) => {
      const { Date: date, Consumption, Name } = item;
      const total = 'Сумма';
      const object = acc[date]
        ? {
          ...acc[date],
          date: formatDate(date),
          [Name]: Consumption,
          [total]: acc[date][total] + Consumption
        }
        : { date: formatDate(date), [Name]: Consumption, [total]: Consumption };

      return { ...acc, [date]: object };
    }, {});

    return timeline.map((date) => groupByDate[date]);
  },
);

export const weatherChartDataSelector = createSelector(
  [getConsumers('houses'), propertySelector('houses')('Weather', Math.round)],
  (consumers, tempLine) => {
    const groupByTemp = consumers.reduce((acc, item) => {
      const { Consumption } = item;
      const weather = Math.round(item.Weather);
      const count = acc[weather] ? acc[weather].count + 1 : 1;
      const object = acc[weather]
        ? {
          ...acc[weather],
          weather,
          consumption: (acc[weather].consumption * count + Consumption) / (count + 1),
          test: (acc[weather].consumption + Consumption),
          count,
        }
        : { weather, consumption: Consumption, count };

      return { ...acc, [weather]: object };
    }, {});

    return tempLine.map((temp) => ({
      weather: groupByTemp[temp].weather,
      'Потребление': groupByTemp[temp].consumption,
    }));
  },
);

export const priceChartDataSelector = createSelector(
  [getConsumers('plants'), propertySelector('plants')('Price', Math.round)],
  (consumers, priceList) => {
    const groupByTemp = consumers.reduce((acc, item) => {
      const { Consumption } = item;
      const brickPrice = Math.round(item.Price);
      const count = acc[brickPrice] ? acc[brickPrice].count + 1 : 1;
      const object = acc[brickPrice]
        ? {
          ...acc[brickPrice],
          brickPrice,
          consumption: (acc[brickPrice].consumption * count + Consumption) / (count + 1),
          test: (acc[brickPrice].consumption + Consumption),
          count,
        }
        : { brickPrice, consumption: Consumption, count };

      return { ...acc, [brickPrice]: object };
    }, {});

    return priceList.map((price) => ({
      price: groupByTemp[price].brickPrice,
      'Потребление': groupByTemp[price].consumption,
    }));
  },
);
