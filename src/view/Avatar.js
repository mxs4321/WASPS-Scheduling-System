import React from 'react';
import styled from 'styled-components';

const DEFAULT_COLORS = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7'
];

const computeColor = (name = 'NA', colors = DEFAULT_COLORS) => {
  const colorIndex = (name.charCodeAt(0) - 65) % colors.length;
  return colors[colorIndex];
};

const computeInitials = (name = 'NA') => {
  const nameSplit = name.split(' ');
  if (nameSplit.length === 1) {
    const length = name.length >= 2 ? 2 : name.length;
    return name.substr(0, length).toUpperCase();
  }
  return (
    nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase()
  );
};

const UserIcon = styled.button`
  border-radius: 100%;
  width: 46px;
  height: 46px;
  font-size: 16px;
  color: white;
  border: 1px solid white;
  background-color: ${props => computeColor(props.name)};
  text-align: center;
  :focus {
    outline: 0;
  }
`;

export default ({ name, onClick }) => (
  <UserIcon name={name} onClick={onClick}>
    {computeInitials(name)}
  </UserIcon>
);
