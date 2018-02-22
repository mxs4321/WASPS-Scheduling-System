import React, { Component } from 'react';
import * as moment from 'moment';
import ExpansionPanel from 'material-expansion-panel';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRidesWithUsers } from '../model/rides';
import AvailableDrivers from '../view/AvailableDrivers';
import AssignedDriver from '../view/AssignedDriver';
import AcceptRide from '../view/AcceptRide';

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

const Panel = ({ user, status }) => {
  if (status === 'Unverified') {
    return (
      <AvailableDrivers
        origin="1900 empire blvd, Webster, NY"
        destination="55 North Ave, Webster, NY"
        drivers={['Niharika Nakka', 'Brett Lamy', 'Mohammad Suhail']}
      />
    );
  }
  if (status === 'Unverified' && user.role === 'driver') {
    return (
      <AcceptRide
        onAccept={() => console.log('accept')}
        onDecline={() => console.log('decline')}
        origin="1900 empire blvd, Webster, NY"
        destination="55 North Ave, Webster, NY"
      />
    );
  }
  return (
    <AssignedDriver
      origin="1900 empire blvd, Webster, NY"
      destination="55 North Ave, Webster, NY"
      users={['Niharika Nakka']}
    />
  );
};

export class Rides extends Component {
  componentDidMount() {
    this.props.fetchRidesWithUsers();
  }

  render() {
    return (
      <ExpansionList>
        {this.props.rides.map(
          ({
            passenger: { firstName, lastName },
            pickupStreetAddress,
            apptStreetAddress,
            status,
            pickupTime
          }) => (
            <ExpansionPanel
              titleIcon={iconsForStatus[status]}
              title={`${firstName} ${lastName} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${pickupStreetAddress} \u2192 ${apptStreetAddress}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${moment(
                pickupTime
              ).fromNow()}`}
              expandedTitle={`${firstName} ${lastName} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${pickupStreetAddress} \u2192 ${apptStreetAddress}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${moment(
                pickupTime
              ).fromNow()}`}
            >
              <Panel user={this.props.user} status={status} />
            </ExpansionPanel>
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
