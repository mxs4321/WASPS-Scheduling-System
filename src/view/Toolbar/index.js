import React from 'react';
import styled from 'styled-components';
import { Menu } from '../icons';

const getToolbarColor = ({ isDispatcher = false, isDriver = false }) => {
  if (isDispatcher) return '#EB5757';
  if (isDriver) return '#27AE60';
  return '#4396E3';
};

const HamburgerMenu = styled(Menu)`
  margin: 11px;
`;

const Toolbar = styled.div`
  height: 46px;
  width: 100%;
  background-color: ${getToolbarColor};
  display: flex;
  line-height: 46px;
  color: white;
`;

export default ({ isDispatcher = false, isDriver = false }) => (
  <Toolbar isDispatcher={isDispatcher} isDriver={isDriver}>
    <HamburgerMenu />asdf
  </Toolbar>
);
