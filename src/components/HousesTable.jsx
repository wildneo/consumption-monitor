import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import * as actions from '../store/actions';
import { chunkedTableDataSelector, getTableRowPerPage } from '../store/selectors';
import EditableTable from '../components/EditableTable';

const type = 'houses';
const title = 'Жилые дома'
const columns = [
  { id: 'Date', label: 'Дата', editable: false },
  { id: 'Name', label: 'Потребитель', editable: false },
  { id: 'Weather', label: 'Температура', editable: true },
  { id: 'Consumption', label: 'Потребление', editable: true },
];

const mapStateToProps = (state) => ({
  data: chunkedTableDataSelector(type)(state),
  rowPerPage: getTableRowPerPage(state),
});

const actionsList = {
  changeValue: actions.changeValue,
  setRowsPerPage: actions.setRowsPerPage,
};

class HousesTable extends React.Component {
  handleChangeData = (event, { value }) => {
    const { changeValue } = this.props;
    changeValue({ value });
  };

  handleChangeRowsPerPage = (event, { value }) => {
    const { setRowsPerPage } = this.props;
    setRowsPerPage({ type, value });
  };

  render() {
    const { data, rowPerPage } = this.props;

    return (
      <Grid
        item
        xs={12}
        sm
      >
        <EditableTable
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          onChangeData={this.handleChangeData}
          rowsPerPage={rowPerPage}
          columns={columns}
          title={title}
          data={data}
        />
      </Grid>
    );
  }
}

export default connect(mapStateToProps, actionsList)(HousesTable);