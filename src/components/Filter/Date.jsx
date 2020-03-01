import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns'; 
import ruLocale from 'date-fns/locale/ru';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const styles = {
  root: {},
};

class DateFilter extends React.Component {
  static propTypes = {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleFromDateChange = (date) => {
    invoke(this.props, 'onChange', { type: 'from', value: date });
  }

  handleToDateChange = (date) => {
    invoke(this.props, 'onChange', { type: 'to', value: date });
  }

  render() {
    const { from, to } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <Grid item xs={12} md container spacing={3} justify="flex-end">
          <Grid item>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              disableFuture 
              variant="inline"
              format="dd/MM/yyyy"
              label="Выберите дату"
              value={from}
              onChange={this.handleFromDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              disableFuture
              variant="inline"
              format="dd/MM/yyyy"
              label="Выберите дату"
              value={to}
              onChange={this.handleToDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(DateFilter);