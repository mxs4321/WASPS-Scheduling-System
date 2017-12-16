import React from 'react';
import styled from 'styled-components';

const NoOp = () => {};

const Title = styled.div`
  margin-top: 5px;
  font-size: 12px;
`;
const Input = styled.input`
  width: 260px;
  height: 30px;
  font-size: 16px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  margin-bottom: 5px;
`;

const InputBox = ({ name = '', onChange = NoOp }) => [
  <Title>{name}</Title>,
  <Input name={name} onChange={onChange} />
];

export default InputBox;
