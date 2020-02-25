import React from 'react';
import { invoke } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import TableChart from '@material-ui/icons/TableChart';
import ShowChart from '@material-ui/icons/ShowChart';

const items = [
  { key: "tables", name: "Таблицы", icon: TableChart },
  { key: "charts", name: "Графики", icon: ShowChart },
];

const styles = {
  list: {
    width: 200,
  },
};

const SideList = (props) => {
  const { classes } = props;

  const handleClickListItem = (value) => (event) => {
    invoke(props, 'onClickListItem', event, { ...props, value });
  };

  return(
    <div className={classes.list}>
      <List>
        {items.map(({ key, name, icon: IconComponent }) => (
          <ListItem
            onClick={handleClickListItem(key)}
            key={key}
            button
          >
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default withStyles(styles)(SideList);
