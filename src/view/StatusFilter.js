//@flow
import React from 'react';
import { Help, Warning, Scheduled, Complete, Canceled } from './icons';
import styled from 'styled-components';

type Status = 'Unverified' | 'Pending' | 'Scheduled' | 'Complete' | 'Canceled';

type Props = {
  status: Status,
  onClick: Function,
  colors: { [Status]: string }
};

const List = styled.ul`
  list-style: none;
`;
const ListItem = styled.li`
  line-height: 24px;
  display: flex;
  padding: 4px;
`;

const defaultColors = {
  Unverified: '#EB5757',
  Pending: '#F2994A',
  Scheduled: '#6FCF97',
  Complete: '#27AE60',
  Canceled: '#828282'
};

export default ({ status, onClick, colors = defaultColors }: Props) => (
  <List>
    <ListItem>
      <Help color={colors['Unverified']} />&nbsp;&nbsp;Unverified
    </ListItem>
    <ListItem>
      <Warning color={colors['Pending']} />&nbsp;&nbsp;Pending
    </ListItem>
    <ListItem>
      <Scheduled color={colors['Scheduled']} />&nbsp;&nbsp;Scheduled
    </ListItem>
    <ListItem>
      <Complete color={colors['Complete']} />&nbsp;&nbsp;Complete
    </ListItem>
    <ListItem>
      <Canceled color={colors['Canceled']} />&nbsp;&nbsp;Canceled
    </ListItem>
  </List>
);
