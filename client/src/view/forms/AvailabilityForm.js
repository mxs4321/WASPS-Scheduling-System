import React from 'react';
import styled from 'styled-components';
import AvailabilityInput from '../AvailabilityInput';
import TimePicker from '../TimePicker';
import { Close } from '../icons';

const Flex = styled.div`
  display: Flex;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  border-radius: 4px;
  color: #4396e3;
  :hover {
    background: #fafafa;
  }
`;

const AvaliabilityForm = () => (
  <div>
    <AvailabilityInput />
    <Flex>
      <TimePicker />
      <TimePicker />
      <Close />
    </Flex>
    <Button>ADD HOURS</Button>
  </div>
);

export default AvaliabilityForm;
