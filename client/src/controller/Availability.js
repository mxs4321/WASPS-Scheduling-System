import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AvailabilityForm from '../view/forms/AvailabilityForm';
import {
  fetchDriverAvailability,
  updateDriverAvailability
} from '../model/availability';

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
  componentDidMount() {
    this.props.fetchDriverAvailability();
  }
  render() {
    return (
      <Card>
        <AvailabilityForm
          onChange={this.props.updateDriverAvailability}
          availabilities={this.props.availabilities}
        />
      </Card>
    );
  }
}

export default connect(
  ({ availability, auth }) => ({
    availabilities: availability.byDriverId[auth.user.id]
  }),
  dispatch => ({
    fetchDriverAvailability: () => dispatch(fetchDriverAvailability()),
    updateDriverAvailability: availability =>
      dispatch(updateDriverAvailability(availability))
  })
)(Availability);
