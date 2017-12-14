//@flow
import React from 'react';
import { Help, Warning, Scheduled, Complete, Canceled } from './icons';
import List from './SidebarList';

export type Status =
  | 'Unverified'
  | 'Pending'
  | 'Scheduled'
  | 'Complete'
  | 'Canceled';

type Props = {
  isAdmin: boolean,
  status: Status,
  onClick: Function
};

export default ({ isDispatcher = false, status, onClick }: Props) => (
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
