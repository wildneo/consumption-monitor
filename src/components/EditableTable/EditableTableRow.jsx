import React from 'react';
// import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import TableRow from '@material-ui/core/TableRow';
import EditableTableCell from './EditableTableCell';

export default class EditadleTableRow extends React.Component {
  handleChange = (columnId) => (event, { value }) => {
    const { rowData: { id } } = this.props;
    const data = { id, data: { [columnId]: value } };
    invoke(this.props, 'onRowChange', event, { ...this.props, value: data });
  };

  render() {
    const { columns, rowData } = this.props;

    return (
      <TableRow>
        {columns.map(({ id, editable }) => (
          <EditableTableCell
            onCellChange={this.handleChange(id)}
            cellData={rowData[id]}
            editable={editable}
            key={id}
          />
        ))}
      </TableRow>
    );
  }
}
