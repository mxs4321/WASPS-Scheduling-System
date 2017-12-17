//@flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Schedule, Car, Group, Timer } from '../view/icons';
import List from '../view/SidebarList';
import { withRouter } from 'react-router';

type Props = {
  /** Will show an Availability tab */
  isDriver: boolean,
  /** Will show a Drivers tab */
  isDispatcher: boolean
};

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Navigation = withRouter(
  ({ location, isDriver = false, isDispatcher = false }: Props) => (
    <List>
      <List.Item active={location.pathname === '/'}>
        <UnstyledLink to="/">
          <Car />&nbsp;&nbsp;Rides
        </UnstyledLink>
      </List.Item>
      {isDispatcher && (
        <List.Item active={location.pathname === '/drivers'}>
          <UnstyledLink to="/drivers">
            <Group />&nbsp;&nbsp;Drivers
          </UnstyledLink>
        </List.Item>
      )}
      {isDriver && (
        <List.Item active={location.pathname === '/availability'}>
          <UnstyledLink to="/availability">
            <Timer />&nbsp;&nbsp;Availability
          </UnstyledLink>
        </List.Item>
      )}
      <List.Item active={location.pathname === '/Schedule'}>
        <UnstyledLink to="/Schedule">
          <Schedule />&nbsp;&nbsp;Schedule
        </UnstyledLink>
      </List.Item>
    </List>
  )
);

export default Navigation;
