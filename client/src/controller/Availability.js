import React from 'react';
import styled from 'styled-components';
import AvailabilityForm from '../view/forms/AvailabilityForm';

const Card = styled.div`
  position: relative;
  top: 5%;
  left: 5%;
  width: 80%;
  height: 80%;
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export default () => (
  <Card>
    <AvailabilityForm />
  </Card>
);
