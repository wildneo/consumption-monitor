import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import SideList from './SideList';
import AppBar from './AppBar';

const styles = {
  container: {
    paddingTop: 24,
    paddingBottom: 24,
  },
};

class Dashboard extends React.Component {
  static propTypes = {
    onClickMenuItem: PropTypes.func,
    children: PropTypes.node,
  };

  state = {
    open: false,
  };

  handleDrawerToggle = () =>{
    const { open } = this.state;
    this.setState({ open: !open });
  }

  handleClickMenuItem = (event, { value }) => {
    this.handleDrawerToggle();
    invoke(this.props, 'onClickMenuItem', event, { ...this.props, value });
  };

  render() {
    const { open } = this.state;
    const { children, classes } = this.props;

    return(
      <>
        <CssBaseline />
        <AppBar onClick={this.handleDrawerToggle} />
        <Drawer
          onClose={this.handleDrawerToggle}
          open={open}
        >
          <SideList onClickListItem={this.handleClickMenuItem} />
        </Drawer>
        <main>
          <Container className={classes.container}>
            {children}
          </Container>
        </main>
      </>
    );
  }
};

export default withStyles(styles)(Dashboard);
