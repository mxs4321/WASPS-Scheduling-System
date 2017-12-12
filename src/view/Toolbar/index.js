import React from 'react';
import styled from 'styled-components';
import { Menu } from '../icons';
import Avatar from '../Avatar';

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

const SearchBar = styled.input`
  width: 80%;
  height: 28px;
  margin: 8px auto;
  border: none;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.4);
  :hover,
  :focus {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export default ({ isDispatcher = false, isDriver = false }) => (
  <Toolbar isDispatcher={isDispatcher} isDriver={isDriver}>
    <HamburgerMenu />asdf<SearchBar />
    <Avatar />
  </Toolbar>
);
