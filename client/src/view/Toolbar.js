//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu } from './icons';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

type Props = {
  /** Helps determine the color of the bar */
  isDispatcher: Boolean,
  /** Helps determine the color of the bar */
  isDriver: Boolean,
  /** Call back for when the Hamburger menu button is clicked */
  onMenuToggle: Function,
  /** Call back for when the search bar is Focused */
  onSearchFocus: Function,
  /** Call back for when the search bar is Blured */
  onSearchBlur: Function,
  /** Call back for when someone clicks Edit Profile */
  goToEditProfile: Function,
  /** Call back for when someone clicks Logout */
  logout: Function
};

const NoOp = () => {};

const getToolbarBackgroundColor = ({ userRole }) => {
  if (userRole === 'admin') return '#24292e';
  if (userRole === 'dispatcher') return '#EB5757';
  if (userRole === 'driver') return '#27AE60';
  return '#4396E3';
};

const getToolbarTitle = userRole => {
  if (userRole === 'admin') return 'Administrator';
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
const Unselectable = styled.span`
  user-select: none;
`;
class Toolbar extends Component {
  props: Props;
  state = {
    isSearching: false
  };

  render() {
    const {
      userRole = 'passenger',
      userName,
      onMenuToggle = NoOp,
      goToEditProfile = NoOp,
      logout = NoOp
    } = this.props;
    const { isSearching } = this.state;
    return (
      <Background userRole={userRole} isSearching={isSearching}>
        <HamburgerMenu onClick={onMenuToggle} />
        <Unselectable>{getToolbarTitle(userRole)}</Unselectable>
        <SearchBar
          onFocus={() => this.setState({ isSearching: true })}
          onBlur={() => this.setState({ isSearching: false })}
        />
        <UserMenu
          backgroundColor={getToolbarBackgroundColor({ userRole })}
          size={36}
          logout={logout}
          goToEditProfile={goToEditProfile}
        />
      </Background>
    );
  }
}

export default Toolbar;
