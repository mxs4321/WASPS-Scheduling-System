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
import AvailabilityForm from './forms/AvailabilityForm';
import Users from './Users';
import Schedule from './Schedule';
import Rides from './Rides';
import PrivateRoute from './PrivateRoute';
import Reports from './Reports';
import EditProfileForm from './forms/EditProfileForm';

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
  z-index: 9001;
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
  margin-top: 10px;
  width: 180px;
`;
const Card = styled.div`
  position: relative;
  top: 5%;
  left: 5%;
  width: 80%;
  height: 80%;
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const App = ({
  user,
  logout,
  isSidebarOpen,
  toggleSidebar,
  rideFilter,
  changeRideFilter,
  location,
  history
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
        username={`${user.firstName} ${user.lastName}`}
        userRole={user.role}
        onMenuToggle={toggleSidebar}
        goToEditProfile={() => history.push('/profile')}
        logout={logout}
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
          component={(...args) => (
            <Card>
              <AvailabilityForm {...args} />
            </Card>
          )}
        />
        <PrivateRoute
          allowedRoles={['dispatcher', 'admin']}
          path="/users"
          component={Users}
        />
        <PrivateRoute
          allowedRoles={['admin']}
          path="/reports"
          component={Reports}
        />
        <Route
          path="/profile"
          component={(...args) => (
            <Card>
              <EditProfileForm {...args} />
            </Card>
          )}
        />
        <Route
          path="/schedule"
          component={(...args) => (
            <Card>
              <Schedule {...args} />
            </Card>
          )}
        />
      </Body>
      {user.role !== 'driver' && [
        <FAB to="/create/1">
          <Add />
        </FAB>,
        <Route
          path="/create/:step"
          component={({ match }) => (
            <CreateRide
              step={Number.parseInt(match.params.step, 10)}
              onModalClick={() => history.push('/')}
            />
          )}
        />
      ]}
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
