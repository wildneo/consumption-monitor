import React from 'react';
import { invoke } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const types = [
  { value: 'all',  name: 'Все' },
  { value: 'houses',  name: 'Дома' },
  { value: 'plants',  name: 'Заводы' },
];

export default class TypeFilter extends React.Component {
  handleChange = (event) => {
    const { value } = event.target;
    invoke(this.props, 'onChange', event, { ...this.props, value });
  }

  render() {
    const { value } = this.props;

    return (
      <Grid
        item
        xs={12}
        md={2}
      >
        <FormControl fullWidth>
          <InputLabel>Тип</InputLabel>
          <Select
            value={value}
            onChange={this.handleChange}
          >
            {types.map(({ value, name }) =>
              <MenuItem
                key={value}
                value={value}
              >
                {name}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
    );
  }
}
