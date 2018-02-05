//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu } from './icons';
import Avatar from './Avatar';
import SearchBar from './SearchBar';
import type { UserRole } from '../model/types/user';

type Props = {
  /** Helps determine the color of the bar */
  userRole: UserRole,
  /** Call back for when the Hamburger menu button is clicked */
  onMenuToggle: Function,
  /** Call back for when the search bar is Focused */
  onSearchFocus: Function,
  /** Call back for when the search bar is Blured */
  onSearchBlur: Function,
  /** Call back for when someone click the Avatar */
  onAvatarClick: Function
};

const NoOp = () => {};

const getToolbarBackgroundColor = ({ userRole }) => {
  if (userRole === 'dispatcher') return '#EB5757';
  if (userRole === 'driver') return '#27AE60';
  return '#4396E3';
};

const getToolbarTitle = userRole => {
  if (userRole === 'dispatcher') return 'Dispatcher';
  if (userRole === 'driver') return 'Driver';
  return 'Passanger';
};

const HamburgerMenu = styled(Menu)`
  margin: 11px;
`;
const Background = styled.div`
  height: 46px;
  width: 100%;
  background-color: ${getToolbarBackgroundColor};
  display: flex;
  line-height: 46px;
  color: white;
`;

class Toolbar extends Component {
  props: Props;
  state = { isSearching: false };

  render() {
    const {
      userRole = 'passanger',
      onMenuToggle = NoOp,
      onAvatarClick = NoOp
    } = this.props;
    const { isSearching } = this.state;
    return (
      <Background userRole={userRole} isSearching={isSearching}>
        <HamburgerMenu onClick={onMenuToggle} />
        {getToolbarTitle(userRole)}
        <SearchBar
          onFocus={() => this.setState({ isSearching: true })}
          onBlur={() => this.setState({ isSearching: false })}
        />
        <Avatar size={36} onClick={onAvatarClick} />
      </Background>
    );
  }
}

export default Toolbar;
