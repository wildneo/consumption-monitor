import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  Line,
  Area,
  XAxis,
  YAxis,
  Brush,
  Legend,
  Tooltip,
  ComposedChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { propertySelector, totalChartDataSelector } from '../store/selectors';
import PaddedContainer from './PaddedContainer';

const colors = [
  { stroke: '#2c3e4f', fill: '#33495e' },
  { stroke: '#7e8c8d', fill: '#95a5a6' },
  { stroke: '#e57e23', fill: '#d35400' },
  { stroke: '#f1c40f', fill: '#f39c13' },
  { stroke: '#26ae60', fill: '#2fcb71' },
  { stroke: '#169f85', fill: '#1abc9b' },
  { stroke: '#2980b9', fill: '#3398da' },
  { stroke: '#8d44ad', fill: '#9b59b6' },
  { stroke: '#bf392b', fill: '#e74c3c' },
];

const mapStateToProps = (state) => ({
  consumersNames: propertySelector()('Name')(state),
  totalChartData: totalChartDataSelector(state),
});

class TotalChart extends React.Component {
  render() {
    const { consumersNames, totalChartData } = this.props;

    return (
      <Grid item xs>
        <PaddedContainer style={{ height: 400 }}>
          <ResponsiveContainer>
            <ComposedChart
              data={totalChartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {consumersNames.map((name, i) => 
                <Area
                  key={i}
                  dataKey={name}
                  type="monotone"
                  stroke={colors[i].stroke}
                  fill={colors[i].fill}
                  stackId={1}
                />
              )}
              <Line type="monotone" dot={false} dataKey="Сумма" stroke="#555555" />
              <Brush />
            </ComposedChart>
          </ResponsiveContainer>
        </PaddedContainer>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(TotalChart);