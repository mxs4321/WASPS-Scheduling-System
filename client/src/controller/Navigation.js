//@flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Schedule, Car, Group, Timer, BarChart } from '../view/icons';
import List from '../view/SidebarList';
import { withRouter } from 'react-router';
import type { UserRole } from '../model/types/user';

type Props = {
  /** Will show an Availability tab */
  userRole: UserRole
};

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Navigation = withRouter(({ location, userRole = 'passenger' }: Props) => (
  <List>
    <List.Item active={location.pathname === '/'}>
      <UnstyledLink to="/">
        <Car />&nbsp;&nbsp;Rides
      </UnstyledLink>
    </List.Item>
    {userRole === 'admin' && (
      <List.Item active={location.pathname === '/reports'}>
        <UnstyledLink to="/reports">
          <BarChart />&nbsp;&nbsp;Reports
        </UnstyledLink>
      </List.Item>
    )}
    {(userRole === 'dispatcher' || userRole === 'admin') && (
      <List.Item active={location.pathname === '/drivers'}>
        <UnstyledLink to="/drivers">
          <Group />&nbsp;&nbsp;Drivers
        </UnstyledLink>
      </List.Item>
    )}
    {userRole === 'driver' && (
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
));

export default Navigation;
