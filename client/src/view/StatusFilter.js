//@flow
import React from 'react';
import { Help, Warning, Scheduled, Complete, Canceled } from './icons';
import List from './SidebarList';
import type { UserRole } from '../model/types/user';

type Props = {
  /** Will toggle weather the unverified and canceled categories appear */
  userRole: UserRole,
  /** The Currently selected Status */
  status: 'Unverified' | 'Pending' | 'Scheduled' | 'Complete' | 'Canceled',
  /** Callback function for when the filter changes states */
  onFilterChange: Function
};

const StatusFilter = ({ userRole, status, onFilterChange }: Props) => (
  <List>
    {userRole === 'dispatcher' && (
      <List.Item>
        <Help />&nbsp;&nbsp;Unverified
      </List.Item>
    )}
    <List.Item>
      <Warning />&nbsp;&nbsp;Pending
    </List.Item>
    <List.Item>
      <Scheduled />&nbsp;&nbsp;Scheduled
    </List.Item>
    <List.Item>
      <Complete />&nbsp;&nbsp;Complete
    </List.Item>
    {userRole === 'dispatcher' && (
      <List.Item>
        <Canceled />&nbsp;&nbsp;Canceled
      </List.Item>
    )}
  </List>
);

export default StatusFilter;
