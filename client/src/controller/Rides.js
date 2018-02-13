import React, { Component } from 'react';
import ExpansionPanel from 'material-expansion-panel';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRides } from '../model/rides';

const ExpansionList = styled.div`
  width: 100%;
  margin: 20px 60px;
`;

const colorForStatus = {
  Unverified: '#EB5757',
  Pending: '#F2994A',
  Scheduled: '#6FCF97',
  Complete: '#27AE60',
  Canceled: '#828282'
};

const iconsForStatus = {
  Unverified: 'error_outline',
  Pending: 'warning',
  Scheduled: 'event',
  Complete: 'done',
  Canceled: 'cancel'
};

export class Rides extends Component {
  componentDidMount() {
    this.props.fetchRides();
  }

  render() {
    return (
      <ExpansionList>
        {this.props.rides.map(
          ({ pickupStreetAddress, apptStreetAddress, status }) => (
            <ExpansionPanel
              titleIcon={iconsForStatus[status]}
              title={`${pickupStreetAddress} \u2192 ${apptStreetAddress}`}
              expandedTitle={`${pickupStreetAddress} \u2192 ${apptStreetAddress}`}
            >
              This is a ride
            </ExpansionPanel>
          )
        )}
      </ExpansionList>
    );
  }
}

export default connect(
  ({ rides, app }) => ({
    rides: Object.values(rides.byId).filter(({ status }) => {
      if (app.rideFilter === '') {
        return true;
      }
      return status === app.rideFilter;
    })
  }),
  dispatch => ({
    fetchRides: () => dispatch(fetchRides())
  })
)(Rides);
