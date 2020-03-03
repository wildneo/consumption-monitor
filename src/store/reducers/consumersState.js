import { uniqueId } from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const initialState = {};

export default handleActions({
  [actions.getData]: (state, { payload: { data } }) => {
    const consumersTypes = Object.keys(data);

    const flatData = consumersTypes.reduce((acc, type) => {
      const flatConsumers = data[type].reduce(
        (acc, { ConsumerId, Name, consumptions }) => {
          const flatConsumer = consumptions.reduce(
            (acc, consumption) => {
              const flatConsumerData = {
                id: uniqueId(), ConsumerId, Name, type, ...consumption
              };

              return [...acc, flatConsumerData];
            }, []);

          return [...acc, ...flatConsumer];
        }, []);

      return [...acc, ...flatConsumers];
    }, []);

    return {
      consumptions: flatData,
    };
  },
  [actions.changeValue]: (state, { payload }) => {
    const { value: { id, data } } = payload;
    const consumptions = state.consumptions.map(
      (item) => item.id === id
        ? { ...item, ...data }
        : item
    );

    return { ...state, consumptions };
  }
}, initialState);
