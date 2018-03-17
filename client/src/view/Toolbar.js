//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu } from './icons';
import Avatar from './Avatar';
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

const getToolbarBackgroundColor = ({
  isDispatcher = false,
  isDriver = false,
  isSearching = false
}) => {
  // if (isSearching) return "#f6f6f6";
  if (isDispatcher) return '#EB5757';
  if (isDriver) return '#27AE60';
  return '#4396E3';
};

const getToolbarTitle = ({ isDispatcher = false, isDriver = false }) => {
  if (isDispatcher) return 'Dispatcher';
  if (isDriver) return 'Driver';
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
  state = {
    isSearching: false
  };

  render() {
    const {
      isDispatcher = false,
      isDriver = false,
      onMenuToggle = NoOp,
      goToEditProfile = NoOp,
      logout = NoOp
    } = this.props;
    const { isSearching } = this.state;
    return (
      <Background
        isDispatcher={isDispatcher}
        isDriver={isDriver}
        isSearching={isSearching}
      >
        <HamburgerMenu onClick={onMenuToggle} />
        {getToolbarTitle({ isDispatcher, isDriver })}
        <SearchBar
          onFocus={() => this.setState({ isSearching: true })}
          onBlur={() => this.setState({ isSearching: false })}
        />
        <Avatar size={36}/>
      </Background>
    );
  }
}

export default Toolbar;
