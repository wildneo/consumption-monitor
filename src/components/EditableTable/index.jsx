import React from 'react';
import PropTypes from 'prop-types';
import { invoke, uniqueId } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import EditableTableRow from './EditableTableRow';
import PaddedContainer from '../PaddedContainer';

const styles = {
  wrapper: {
    display: 'block',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  headCell: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontWeight: 700,
  },
};

class EditableTable extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onChangeRowsPerPage: PropTypes.func,
    onChangeData: PropTypes.func,
  };

  state = {
    page: 0,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    this.setState({ page: 0 });
    invoke(this.props, 'onChangeRowsPerPage', event, { ...this.props, value });
  };

  handleRowChange = (event, { value }) => {
    invoke(this.props, 'onChangeData', event, { ...this.props, value });
  };

  render() {
    const { page } = this.state;
    const { classes, title, columns, data, rowsPerPage } = this.props;

    return (
      <PaddedContainer className={classes.wrapper}>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
        >
          {title}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  className={classes.headCell}
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(data.length > 0 && rowsPerPage > 0 ? data[page] : data).map(rowData => (
              <EditableTableRow
                onRowChange={this.handleRowChange}
                columns={columns}
                rowData={rowData}
                key={uniqueId()}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                onChangePage={this.handleChangePage}
                count={data.length * rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </PaddedContainer>
    );
  }
}

export default withStyles(styles)(EditableTable);
