import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { priceChartDataSelector } from '../store/selectors';
import PaddedContainer from './PaddedContainer';

const mapStateToProps = (state) => ({
  priceChartData: priceChartDataSelector(state),
});

class PriceChart extends React.Component {
  render() {
    const { priceChartData } = this.props;

    return (
      <Grid item xs={12} md={6}>
        <PaddedContainer style={{ height: 350 }}>
          <ResponsiveContainer>
            <LineChart
              data={priceChartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="price" />
              <YAxis />
              <Tooltip />
              <Line type="basis" dot={false} dataKey="Потребление" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </PaddedContainer>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(PriceChart);