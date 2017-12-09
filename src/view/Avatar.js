import React from 'react';
import styled from 'styled-components';

const DEFAULT_COLORS = [
  '#EB5757',
  '#F2994A',
  '#F2C94C',
  '#219653',
  '#27AE60',
  '#6FCF97',
  '#2F80ED',
  '#2D9CDB',
  '#56CCF2',
  '#9B51E0',
  '#BB6BD9',
  '#27AE60',
  '#7F8DE1',
  '#56CB7D',
  '#F88962'
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
