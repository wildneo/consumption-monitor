import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getFilterConsumerType, getActideDashboardTab } from '../store/selectors';
import * as actions from '../store/actions';
import PlantsTable from './PlantsTable';
import HousesTable from './HousesTable';
import Dashboard from './Dashboard';
import TableFilter from './TableFilter';
import TotalChart from './TotalChart';
import WeatherChart from './WeatherChart';
import PriceChart from './PriceChart';


const mapStateToProps = (state) => ({
  consumerType: getFilterConsumerType(state),
  activeTab: getActideDashboardTab(state),
});

const actionsList = {
  toggleActiveTab: actions.toggleActiveTab,
};

class App extends React.Component {
  handleToggleTab = (event, { value }) => {
    const { toggleActiveTab } = this.props;
    toggleActiveTab({ value });
  }

  renderCharts() {
    return (
      <Grid container spacing={3}>
        <WeatherChart />
        <PriceChart />
        <TotalChart />
      </Grid>
    );
  }

  renderTables() {
    const { consumerType } = this.props;
    const showPlants = consumerType === 'all' || consumerType === 'plants';
    const showHouses = consumerType === 'all' || consumerType === 'houses';

    return (
      <Grid container spacing={3}>
        <TableFilter />
        {showPlants && <PlantsTable />}
        {showHouses && <HousesTable />}
      </Grid>
    );
  }

  render() {
    const { activeTab } = this.props;

    return (
      <Dashboard onClickMenuItem={this.handleToggleTab}>
        {activeTab === 'tables' && this.renderTables()}
        {activeTab === 'charts' && this.renderCharts()}
      </Dashboard>
    );
  }
}

export default connect(mapStateToProps, actionsList)(App);