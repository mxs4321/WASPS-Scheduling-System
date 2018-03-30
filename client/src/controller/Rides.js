import React, { Component } from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRidesWithUsers } from '../model/rides';
import ExpandingCard from '../view/ExpandingCard';
import { Warning, Scheduled, Complete, Canceled, Help } from '../view/icons';
import RideCard from '../view/RideCard';

const colorForStatus = {
  Unverified: '#EB5757',
  Pending: '#F2994A',
  Scheduled: '#6FCF97',
  Complete: '#27AE60',
  Canceled: '#828282'
};

const iconsForStatus = {
  Unverified: <Help color={colorForStatus['Unverified']} />,
  Pending: <Warning color={colorForStatus['Pending']} />,
  Scheduled: <Scheduled color={colorForStatus['Scheduled']} />,
  Complete: <Complete color={colorForStatus['Complete']} />,
  Canceled: <Canceled color={colorForStatus['Canceled']} />
};

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
    return (
      <ExpansionList>
        {this.props.rides.map(
          ({
            id,
            passenger,
            pickupStreetAddress,
            apptStreetAddress,
            status,
            pickupTime,
            driver
          }) => (
            <ExpandingCard
              key={id}
              icon={iconsForStatus[status]}
              title={`${passenger.firstName} ${passenger.lastName}`}
              description={`${pickupStreetAddress} \u2192 ${apptStreetAddress}`}
              detailText={moment(pickupTime).fromNow()}
              accentColor={colorForStatus[status]}
            >
              <RideCard
                passenger={passenger}
                driver={driver}
                pickupStreetAddress={pickupStreetAddress}
                apptStreetAddress={apptStreetAddress}
              />
            </ExpandingCard>
          )
        )}
      </ExpansionList>
    );
  }
}

export default connect(
  ({ auth, rides, app, users }) => ({
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
