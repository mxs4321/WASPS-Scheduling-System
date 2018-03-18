import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRidesWithUsers } from '../model/rides';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

export class Schedule extends Component {
  componentDidMount() {
    this.props.fetchRidesWithUsers();
  }

  render() {
    return <BigCalendar events={this.props.rides} />;
  }
}

export default connect(
  ({ rides, app }) => ({
    rides: Object.values(rides.byId)
      .filter(({ status }) => {
        if (app.rideFilter === '') {
          return true;
        }
        return status === app.rideFilter;
      })
      .map(ride => ({
        ...ride,
        start: new Date(ride.pickupTime),
        end: new Date(ride.apptEnd),
        title: `${ride.pickupStreetAddress} \u2192 ${ride.apptStreetAddress}`
      }))
  }),
  dispatch => ({
    fetchRidesWithUsers: () => dispatch(fetchRidesWithUsers())
  })
)(Schedule);
