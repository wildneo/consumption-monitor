import React from 'react';
import { invoke } from 'lodash';
import UIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const AppBar = (props) => {
  const handleClick = (event) => {
    invoke(props, 'onClick', event, props);
  };

  return(
    <UIAppBar position="static">
      <Toolbar>
        <IconButton
          onClick={handleClick}
          color="inherit"
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
        >
          Consumption monitor
        </Typography>
      </Toolbar>
    </UIAppBar>
  );
};

export default AppBar;
