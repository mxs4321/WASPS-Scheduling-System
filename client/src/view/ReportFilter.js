//@flow
import React from 'react';
import { Help, Warning, Scheduled, Complete, Canceled } from './icons';
import List from './SidebarList';
import type { UserRole } from '../model/types/user';
import type { RideStatus } from '../mode/types/ride';

type Props = {
  /** Will toggle weather the unverified and canceled categories appear */
  userRole: UserRole,
  /** The Currently selected Status */
  status: RideStatus,
  /** Callback function for when the filter changes states */
  onFilterChange: Function
};

const RideFilter = ({ currentReport, onFilterChange }: Props) => (
  <List>
    <List.Item
      active={currentReport === 'driver'}
      onClick={() => onFilterChange('driver')}
    >
      &nbsp;&nbsp;Driver
    </List.Item>
    <List.Item
      active={currentReport === 'ride'}
      onClick={() => onFilterChange('ride')}
    >
      &nbsp;&nbsp;Ride
    </List.Item>
    <List.Item
      active={currentReport === 'destination'}
      onClick={() => onFilterChange('destination')}
    >
      &nbsp;&nbsp;Destination
    </List.Item>
    <List.Item
      active={currentReport === 'client'}
      onClick={() => onFilterChange('client')}
    >
      &nbsp;&nbsp;Client
    </List.Item>
  </List>
);

export default RideFilter;
