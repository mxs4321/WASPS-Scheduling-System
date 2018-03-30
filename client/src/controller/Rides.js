import React, { Component } from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRidesWithUsers } from '../model/rides';
import Card from '../view/Card';

const ExpansionList = styled.div`
  width: 100%;
  padding: 20px 60px;
  overflow: scroll;
  height: calc(100% - 40px);
`;

export class Rides extends Component {
  componentDidMount() {
    this.props.fetchRidesWithUsers();
  }

  render() {
    const { rides, user } = this.props;
    return (
      <ExpansionList>
        {rides.map(
          ({
            id,
            passenger,
            pickupStreetAddress,
            apptStreetAddress,
            status,
            pickupTime,
            driver
          }) => (
            <Card
              user={user}
              key={id}
              status={status}
              passenger={passenger}
              driver={driver}
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
      .filter(ride => app.rideFilter === '' || ride.status === app.rideFilter)
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
