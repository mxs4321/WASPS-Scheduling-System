//@flow
import React from 'react';
import { Schedule, Car, Group, Timer } from '../icons';
import List from './List';

export default ({ isDriver = false, isDispatcher = false }) => (
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
