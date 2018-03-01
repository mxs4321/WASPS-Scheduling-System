//@flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  /** Uses this name to derive the initials */
  name: string,
  /** Calls this function when the user clicks */
  onClick: Function,
  /** Diameter of the circle in pixels */
  size: number
};

const NoOp = () => {};

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

const getBorderColor = role => {
  if (role === 'admin') return '#24292e';
  if (role === 'dispatcher') return '#EB5757';
  if (role === 'driver') return '#27AE60';
  if (role === 'passenger') return '#4396E3';
  return 'white';
};

const UserIcon = styled.button`
  line-height: ${props => `${props.size}px` || '46px'};
  border-radius: 100%;
  padding: 0;
  margin: 5px;
  width: ${props => `${props.size}px` || '46px'};
  height: ${props => `${props.size}px` || '46px'};
  font-size: ${props => `${props.size / 3}px` || '16px'};
  color: white;
  border: 1px solid ${props => getBorderColor(props.role)};
  background-color: ${props => computeColor(props.name)};
  text-align: center;
  :focus {
    outline: 0;
  }
`;

const Avatar = ({ name = 'NA', onClick = NoOp, size = 46, ...args }: Props) => (
  <UserIcon name={name} onClick={onClick} size={size} {...args}>
    {computeInitials(name)}
  </UserIcon>
);

export default Avatar;
