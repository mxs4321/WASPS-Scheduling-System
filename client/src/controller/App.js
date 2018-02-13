import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../model/auth';
import { toggleSidebar, changeRideFilter } from '../model/app';
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
import PrivateRoute from './PrivateRoute';

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
const FAB = styled(Link)`
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

export const App = ({
  user,
  logout,
  isSidebarOpen,
  toggleSidebar,
  rideFilter,
  changeRideFilter,
  location
}) => {
  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { referrer: location }
        }}
      />
    );
  }
  return (
    <Fullbleed>
      <Toolbar
        userRole={user.role}
        onMenuToggle={toggleSidebar}
        onAvatarClick={logout}
      />
      <Body>
        {isSidebarOpen && (
          <Sidebar>
            <Navigation userRole={user.role} />
            <hr />
            {['/', '/schedule'].map(path => (
              <Route
                exact
                path={path}
                component={() => (
                  <StatusFilter
                    userRole={user.role}
                    status={rideFilter}
                    onFilterChange={changeRideFilter}
                  />
                )}
              />
            ))}
          </Sidebar>
        )}
        <Route exact path="/" component={Rides} />
        <PrivateRoute
          allowedRoles={['driver']}
          path="/availability"
          component={Availability}
        />
        <PrivateRoute
          allowedRoles={['dispatcher', 'admin']}
          path="/drivers"
          component={Drivers}
        />
        <Route path="/schedule" component={Schedule} />
      </Body>
      <FAB to="/create/1">
        <Add />
      </FAB>
      <Route
        path="/create/:step"
        component={({ match }) => (
          <CreateRide
            step={Number.parseInt(match.params.step, 10)}
            onModalClick={this.toggleCreateRide}
          />
        )}
      />
    </Fullbleed>
  );
};

export default withRouter(
  connect(
    ({ auth, app }) => ({
      user: auth.user,
      isSidebarOpen: app.isSidebarOpen,
      rideFilter: app.rideFilter
    }),
    dispatch => ({
      logout: () => dispatch(logout()),
      toggleSidebar: () => dispatch(toggleSidebar()),
      changeRideFilter: status => dispatch(changeRideFilter(status))
    })
  )(App)
);
