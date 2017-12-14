//@flow
import React from 'react';
import { Help, Warning, Scheduled, Complete, Canceled } from './icons';
import List from './SidebarList';

type Props = {
  /** Will toggle weather the unverified and canceled categories appear */
  isDispatcher: boolean,
  /** The Currently selected Status */
  status: 'Unverified' | 'Pending' | 'Scheduled' | 'Complete' | 'Canceled',
  /** Callback function for when the filter changes states */
  onFilterChange: Function
};

const StatusFilter = ({ isDispatcher, status, onFilterChange }: Props) => (
  <List>
    {isDispatcher && (
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
    {isDispatcher && (
      <List.Item>
        <Canceled />&nbsp;&nbsp;Canceled
      </List.Item>
    )}
  </List>
);

export default StatusFilter;
