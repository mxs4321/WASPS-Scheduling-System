import React, { Component } from 'react';
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

class Availability extends Component {
  render() {
    return (
      <Card>
        <AvailabilityForm />
      </Card>
    );
  }
}

export default Availability;
