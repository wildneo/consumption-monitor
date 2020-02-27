import React from 'react';
import { invoke, eq } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { isNumeric } from '../../utils';

const styles = {
  editable: {
    '&:hover': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    cursor: 'pointer',
    maxWidth: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  root: {
    '&:hover': {
      overflow: 'inherit',
    },
    maxWidth: 120,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

class EditableTableCell extends React.Component {
  state = {
    value: this.props.cellData,
    editMode: false,
    error: false,
  };

  handleToggleEditMode = () => {
    const { editMode } = this.state;
    this.setState({ editMode: !editMode });
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ value, error: isNumeric(value) });
  }

  handleChangeCancel = () => {
    const { cellData: value } = this.props;
    this.setState({ value });
    this.handleToggleEditMode();
  }

  handleChangeSave = (event) => {
    const { cellData } = this.props;
    const { value } = this.state;
    this.handleToggleEditMode();
    if (eq(cellData, value)) {
      return;
    }
    invoke(this.props, 'onCellChange', event, { ...this.props, value });
  }

  render() {
    const { value, editMode, error } = this.state;
    const { classes, editable, cellData } = this.props;
    const editableClass = editable ? classes.editable : classes.root;

    return (
      <>
        <TableCell
          className={editableClass}
          onClick={this.handleToggleEditMode}
        >
          {cellData}
        </TableCell>
        <Dialog open={editMode && editable}>
          <DialogContent>
            <TextField
              autoFocus
              error={error}
              onChange={this.handleInputChange}
              value={value}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleChangeCancel}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleChangeSave}
              color="primary"
              disabled={error}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(EditableTableCell);