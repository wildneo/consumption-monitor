import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PaddedContainer from './PaddedContainer';
import Filter from './Filter';
import { getFilterConsumerType, getFilterDateInterval } from '../store/selectors';
import * as actions from '../store/actions';

const mapStateToProps = (state) => ({
  consumerType: getFilterConsumerType(state),
  dateInterval: getFilterDateInterval(state),
});

const actionsList = {
  setFilterConsumerType: actions.setFilterConsumerType,
  setFilterDate: actions.setFilterDate,
};

class TableFilter extends React.Component {
  handleChange = (event, { value }) => {
    const { setFilterConsumerType } = this.props;
    setFilterConsumerType({ value });
  }

  handleDateChange = (value) => {
    const { setFilterDate } = this.props;
    setFilterDate(value);
  }

  render() {
    const { consumerType, dateInterval } = this.props;

    return (
      <Grid item xs={12}>
        <PaddedContainer variant="outlined">
          <Grid
            container
            spacing={3}
            justify="space-between"
          >
            <Filter.Type
              onChange={this.handleChange}
              value={consumerType}
            />
            <Filter.Date
              onChange={this.handleDateChange}
              from={dateInterval.from}
              to={dateInterval.to}
            />
          </Grid>
        </PaddedContainer>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, actionsList)(TableFilter);
