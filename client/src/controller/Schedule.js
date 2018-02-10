import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRides } from '../model/rides';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const Card = styled.div`
  position: relative;
  top: 5%;
  left: 5%;
  width: 80%;
  height: 80%;
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

BigCalendar.momentLocalizer(moment);

export class Schedule extends Component {
  componentDidMount() {
    this.props.fetchRides();
  }

  render() {
    return (
      <Card>
        <BigCalendar events={this.props.rides} />
      </Card>
    );
  }
}

export default connect(
  ({ rides }) => ({
    rides: Object.values(rides.byId).map(ride => ({
      ...ride,
      start: new Date(ride.pickupTime),
      end: new Date(ride.apptEnd),
      title: `${ride.pickupStreetAddress} \u2192 ${ride.apptStreetAddress}`
    }))
  }),
  dispatch => ({
    fetchRides: () => dispatch(fetchRides())
  })
)(Schedule);
