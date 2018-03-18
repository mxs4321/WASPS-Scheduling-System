import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import { Settings, Logout } from './icons';
import { darken } from '../util/colorMinipulator';

const Button = styled.div`
  color: white;
  text-align: right;
  font-size: 16px;
  border: none;
  width: 160px;
  &:hover ${Content} {
    display: block;
  }
`;
const Content = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  z-index: 1;
`;
const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${Content} {
    display: block;
  }
`;

const Link = styled.div`
  color: white;
  padding: 6px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  background-color: ${props => props.backgroundColor || '#4da6ff'};
  &:hover {
    background-color: ${props =>
      darken(props.backgroundColor, 0.1) || '#007acc'};
    cursor: pointer;
  }
`;

export default ({
  username,
  backgroundColor,
  size,
  goToEditProfile,
  logout
}) => (
  <Dropdown>
    <Button>
      <Avatar size={size} name={username} />
    </Button>
    <Content>
      <Link backgroundColor={backgroundColor} onClick={goToEditProfile}>
        <Settings />&nbsp;&nbsp;Edit Profile
      </Link>
      <Link backgroundColor={backgroundColor} onClick={logout}>
        <Logout />&nbsp;&nbsp;Logout
      </Link>
    </Content>
  </Dropdown>
);
