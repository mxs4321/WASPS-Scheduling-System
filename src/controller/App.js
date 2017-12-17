import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from '../view/Toolbar';
import Navigation from '../controller/Navigation';
import StatusFilter from '../view/StatusFilter';
import { Add } from '../view/icons';
import CreateRide from './CreateRide';
import Availability from './Availability';
import Drivers from './Drivers';
import Schedule from './Schedule';
import Rides from './Rides';
import { logout } from '../model/auth';
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

export default withRouter(
  connect(
    ({ auth }) => ({
      isPassanger: auth.isPassanger,
      isDispatcher: auth.isDispatcher,
      isDriver: auth.isDriver
    }),
    dispatch => ({
      logout: () => {
        dispatch(logout());
      }
    })
  )(
    class App extends Component {
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
        const { isDispatcher, isDriver, isPassanger, logout } = this.props;
        if (!(isDispatcher || isDriver || isPassanger)) {
          return <SignIn />;
        }
        return (
          <Fullbleed>
            <Toolbar
              title="Passanger"
              isDispatcher={isDispatcher}
              isDriver={isDriver}
              onMenuToggle={() => this.toggleSidebar()}
              onAvatarClick={() => logout()}
            />
            <Body>
              {sidebarIsOpen && (
                <Sidebar>
                  <Navigation isDispatcher={isDispatcher} isDriver={isDriver} />
                  <hr />
                  <StatusFilter
                    isDispatcher={isDispatcher}
                    isDriver={isDriver}
                    status={statusFilter}
                  />
                </Sidebar>
              )}
              <Route exact path="/" component={Rides} />
              {isDriver && (
                <Route path="/availability" component={Availability} />
              )}
              {isDispatcher && <Route path="/drivers" component={Drivers} />}
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
  )
);
