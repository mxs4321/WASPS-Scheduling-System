import React, { Component } from 'react';
import * as moment from 'moment';
import ExpansionPanel from 'material-expansion-panel';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRidesWithUsers } from '../model/rides';
import AvailableDrivers from '../view/AvailableDrivers';
import AssignedDriver from '../view/AssignedDriver';
import AcceptRide from '../view/AcceptRide';
import ExpandingCard from '../view/ExpandingCard';

const ExpansionList = styled.div`
  width: 100%;
  padding: 20px 60px;
  overflow: scroll;
  height: 100%;
`;

export class Rides extends Component {
  componentDidMount() {
    this.props.fetchRidesWithUsers();
  }

  render() {
    return (
      <ExpansionList>
        {this.props.rides.map(
          ({
            id,
            passenger: { firstName, lastName },
            pickupStreetAddress,
            apptStreetAddress,
            status,
            pickupTime
          }) => (
            <ExpandingCard
              key={id}
              status={status}
              firstName={firstName}
              lastName={lastName}
              pickupStreetAddress={pickupStreetAddress}
              apptStreetAddress={apptStreetAddress}
              pickupTime={moment(pickupTime).fromNow()}
            />
          )
        )}
      </ExpansionList>
    );
  }
}

export default connect(
  ({ auth, rides, app, users }) => ({
    user: auth.user,
    rides: Object.values(rides.byId)
      .filter(({ status }) => {
        if (app.rideFilter === '') {
          return true;
        }
        return status === app.rideFilter;
      })
      .map(ride => ({
        ...ride,
        passenger: users.byId[ride.passengerID],
        driver: users.byId[ride.driverID]
      }))
  }),
  dispatch => ({
    fetchRidesWithUsers: () => dispatch(fetchRidesWithUsers())
  })
)(Rides);
