import { getData, changeValue } from '../../actions';
import consumersState, { initialState } from '../consumersState';

const data = {
  "houses":[
    {
      "ConsumerId":1,
      "Name":"Жилой дом 1",
      "consumptions":[
          {
            "Date":"2019-01-01T00:00:00",
            "Weather":-8.750000000000000e+000,
            "Consumption":9.845272370999999e+003
          },
      ]
    },
  ],
};

const expected1 = {
  consumptions: [
    {
      id: '1',
      ConsumerId: 1,
      Name: 'Жилой дом 1',
      type: 'houses',
      Date: '2019-01-01T00:00:00',
      Weather: -8.75,
      Consumption: 9845.272371,
    },
  ],
};

const expected2 = {
  consumptions: [
    {
      id: '1',
      ConsumerId: 1,
      Name: 'Жилой дом 1',
      type: 'houses',
      Date: '2019-01-01T00:00:00',
      Weather: 10,
      Consumption: 9845.272371,
    },
  ],
};

describe('consumersState', () => {
  test(`Action: ${getData().type}`, () => {
    expect(consumersState(initialState, getData({ data }))).toEqual(expected1);
  });

  test(`Action: ${changeValue().type}`, () => {
    const value = { id: '1', data: { Weather: 10 } };
    expect(consumersState(expected1, changeValue({ value }))).toEqual(expected2);
  });
});