import React from 'react';
import styled from 'styled-components';
import AvailabilityInput from '../AvailabilityInput';
import TimeSelectorDropdown from '../TimeSelectorDropdown';

const Wrapper = styled.div``;

const Time = styled.div`
  width: 400px;
  height: 80px;
  display: flex;
  position: absolute;
  padding-left: 50px;
`;

export default () => (
  <Wrapper>
    <AvailabilityInput />
    <br />
    <Time>
      <TimeSelectorDropdown />
      <TimeSelectorDropdown />
    </Time>
    <br />
    <br />
    <br />
    <br />
    <br />
    <AvailabilityInput />
    <br />
    <Time>
      <TimeSelectorDropdown />
      <TimeSelectorDropdown />
    </Time>
  </Wrapper>
);
