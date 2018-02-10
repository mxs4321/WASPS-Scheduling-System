import React, { Component } from 'react';
import ExpansionPanel from 'material-expansion-panel';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRides } from '../model/rides';

const ExpansionList = styled.div`
  width: 100%;
  margin: 20px 60px;
`;

export class Rides extends Component {
  componentDidMount() {
    this.props.fetchRides();
  }

  render() {
    return (
      <ExpansionList>
        {this.props.rides.map(({ pickupStreetAddress, apptStreetAddress }) => (
          <ExpansionPanel
            title={`${pickupStreetAddress} \u2192 ${apptStreetAddress}`}
            expandedTitle={`${pickupStreetAddress} \u2192 ${apptStreetAddress}`}
          >
            This is a ride
          </ExpansionPanel>
        ))}
      </ExpansionList>
    );
  }
}

export default connect(
  ({ rides }) => ({
    rides: Object.values(rides.byId)
  }),
  dispatch => ({
    fetchRides: () => dispatch(fetchRides())
  })
)(Rides);
