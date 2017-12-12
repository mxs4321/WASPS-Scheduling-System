//@flow
import React from 'react';
import styled from 'styled-components';
import { Menu } from '../icons';
import Avatar from '../Avatar';

type Props = {
  /** Helps determine the color of the bar */
  isDispatcher: Boolean,
  /** Helps determine the color of the bar */
  isDriver: Boolean
};

const getToolbarColor = ({ isDispatcher = false, isDriver = false }) => {
  if (isDispatcher) return '#EB5757';
  if (isDriver) return '#27AE60';
  return '#4396E3';
};

const HamburgerMenu = styled(Menu)`
  margin: 11px;
`;

const Background = styled.div`
  height: 46px;
  width: 100%;
  background-color: ${getToolbarColor};
  display: flex;
  line-height: 46px;
  color: white;
`;

const SearchBar = styled.input`
  width: 70%;
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

const Toolbar = ({ isDispatcher = false, isDriver = false }: Props) => (
  <Background isDispatcher={isDispatcher} isDriver={isDriver}>
    <HamburgerMenu />asdf<SearchBar />
    <Avatar size={36} />
  </Background>
);

export default Toolbar;
