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

const StatusFilter = ({ userRole, status, onFilterChange }: Props) => (
  <List>
    {(userRole === 'dispatcher' || userRole === 'admin') && (
      <List.Item
        active={status === 'Unverified'}
        onClick={() =>
          status === 'Unverified'
            ? onFilterChange('')
            : onFilterChange('Unverified')
        }
      >
        <Help />&nbsp;&nbsp;Unverified
      </List.Item>
    )}
    <List.Item
      active={status === 'Pending'}
      onClick={() =>
        status === 'Pending' ? onFilterChange('') : onFilterChange('Pending')
      }
    >
      <Warning />&nbsp;&nbsp;Pending
    </List.Item>
    <List.Item
      active={status === 'Scheduled'}
      onClick={() =>
        status === 'Scheduled'
          ? onFilterChange('')
          : onFilterChange('Scheduled')
      }
    >
      <Scheduled />&nbsp;&nbsp;Scheduled
    </List.Item>
    <List.Item
      active={status === 'Complete'}
      onClick={() =>
        status === 'Complete' ? onFilterChange('') : onFilterChange('Complete')
      }
    >
      <Complete />&nbsp;&nbsp;Complete
    </List.Item>
    <List.Item
      active={status === 'Canceled'}
      onClick={() =>
        status === 'Canceled' ? onFilterChange('') : onFilterChange('Canceled')
      }
    >
      <Canceled />&nbsp;&nbsp;Canceled
    </List.Item>
  </List>
);

export default StatusFilter;
