import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  font-size: 17px;
`;

const Option = styled.option`
  ::-ms-expand {
    display: none;
  }
  :hover {
    background-color: black;
  }
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
  &:focus {
    border-bottom: 2px solid black;
  }
  font-size: 16px;
  text-align: center;
`;

const Box = styled.div`
  margin: 10;
`;

const Title = styled.p`
  margin: 5px;
  font-size: 12px;
`;

const All = styled.div`
  margin-left: 10px;
`;

export default () => (
  <All>
    <Title>Time</Title>
    <Box>
      <Input placeholder="HH" type="text" size="3" name="hour" maxLength="2" />:
      <Input placeholder="mm" type="text" size="3" name="mins" maxLength="2" />
      <Select>
        <Option>AM</Option>
        <Option>PM</Option>
      </Select>
    </Box>
  </All>
);
