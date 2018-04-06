import React, { Component } from 'react';
import * as moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRidesWithUsers, updateRide } from '../model/rides';
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
    const { rides, updateRide, user } = this.props;
    return (
      <ExpansionList>
        {rides.map(
          ({
            id,
            passenger,
            driver,
            pickupStreetAddress,
            apptStreetAddress,
            status,
            apptStart,
            pickupTime,
            ...props
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
                id={id}
                passenger={passenger}
                driver={driver}
                user={user}
                apptStart={apptStart}
                pickupTime={pickupTime}
                pickupStreetAddress={pickupStreetAddress}
                apptStreetAddress={apptStreetAddress}
                status={status}
                updateRide={updateRide}
                {...props}
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
    fetchRidesWithUsers: () => dispatch(fetchRidesWithUsers()),
    updateRide: (id, changedValues) => dispatch(updateRide(id, changedValues))
  })
)(Rides);
