import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../model/auth';
import Toolbar from '../view/Toolbar';
import StatusFilter from '../view/StatusFilter';
import { Add } from '../view/icons';
import Navigation from './Navigation';
import CreateRide from './CreateRide';
import Availability from './Availability';
import Drivers from './Drivers';
import Schedule from './Schedule';
import Rides from './Rides';
import SignIn from './SignIn';

const Fullbleed = styled.div`
  postion: absolute:
  width: 100%;
  height: 100%;
`;
const Body = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const FAB = styled.button`
  padding: 20px;
  background-color: #f2c94c;
  border-radius: 100%;
  position: absolute;
  right: 20px;
  bottom: 20px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
  border: none;
  :focus {
    outline: 0;
  }
`;
const Sidebar = styled.div`
  width: 180px;
`;

export class App extends Component {
  state = {
    sidebarIsOpen: true,
    statusFilter: '',
    createRideIsOpen: false
  };

  toggleSidebar = () => {
    this.setState(({ sidebarIsOpen }) => ({
      sidebarIsOpen: !sidebarIsOpen
    }));
  };

  toggleCreateRide = () => {
    this.setState(({ createRideIsOpen }) => ({
      createRideIsOpen: !createRideIsOpen
    }));
  };

  render() {
    const { sidebarIsOpen, statusFilter, createRideIsOpen } = this.state;
    const { user, logout } = this.props;
    if (!user) {
      return <SignIn />;
    }
    return (
      <Fullbleed>
        <Toolbar
          userRole={user.userRole}
          onMenuToggle={this.toggleSidebar}
          onAvatarClick={logout}
        />
        <Body>
          {sidebarIsOpen && (
            <Sidebar>
              <Navigation userRole={user.userRole} />
              <hr />
              <StatusFilter userRole={user.userRole} status={statusFilter} />
            </Sidebar>
          )}
          <Route exact path="/" component={Rides} />
          {user.userRole === 'driver' && (
            <Route path="/availability" component={Availability} />
          )}
          {(user.userRole === 'dispatcher' || user.userRole === 'admin') && (
            <Route path="/drivers" component={Drivers} />
          )}
          <Route path="/schedule" component={Schedule} />
        </Body>
        <FAB onClick={this.toggleCreateRide}>
          <Add />
        </FAB>
        {createRideIsOpen && (
          <CreateRide onModalClick={this.toggleCreateRide} />
        )}
      </Fullbleed>
    );
  }
}

export default withRouter(
  connect(
    ({ auth }) => ({
      user: auth.user
    }),
    dispatch => ({
      logout: () => dispatch(logout())
    })
  )(App)
);
