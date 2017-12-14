//@flow
import React from 'react';
import { Schedule, Car, Group, Timer } from './icons';
import List from './SidebarList';

type Props = {
  /** Will show an Availability tab */
  isDriver: boolean,
  /** Will show a Drivers tab */
  isDispatcher: boolean
};

const Navigation = ({ isDriver = false, isDispatcher = false }: Props) => (
  <List>
    <List.Item>
      <Car />&nbsp;&nbsp;Rides
    </List.Item>
    {isDispatcher && (
      <List.Item>
        <Group />&nbsp;&nbsp;Drivers
      </List.Item>
    )}
    {isDriver && (
      <List.Item>
        <Timer />&nbsp;&nbsp;Availability
      </List.Item>
    )}
    <List.Item>
      <Schedule />&nbsp;&nbsp;Schedule
    </List.Item>
  </List>
);

export default Navigation;
