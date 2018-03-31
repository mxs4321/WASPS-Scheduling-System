import React, { Component } from 'react';
import styled from 'styled-components';
import Avatar from '../view/Avatar';
import { fetchAvailableDriver } from '../model/availability';
import { connect } from 'react-redux';

const Ul = styled.ul`
  list-style: none;
  width: 280px;
`;
const Li = styled.li`
  background-color: ${props => (props.active ? '#0070D2' : 'transparent')};
  color: ${props => (props.active ? 'white' : 'black')};
`;

export class AvailableDriversList extends Component {
  componentDidMount = () => {
    const { date, startTime, pickupTime } = this.props;
    if (date && startTime && pickupTime) {
      this.props.fetchAvailableDriver(date, startTime, pickupTime);
    }
  };

  componentWillReceiveProps = ({ date, startTime, pickupTime }) => {
    if (date && startTime && pickupTime) {
      if (
        date !== this.props.date ||
        startTime !== this.props.startTime ||
        pickupTime !== this.props.pickupTime
      ) {
        this.props.fetchAvailableDriver(date, startTime, pickupTime);
      }
    }
  };

  render() {
    const { drivers, selectedID, handleChange } = this.props;
    return (
      <Ul>
        {drivers.map(({ id, firstName, lastName, role }) => (
          <Li
            active={selectedID === id}
            key={id}
            onClick={() => {
              debugger;
              handleChange(id);
            }}
          >
            <Avatar role={role} name={`${firstName} ${lastName}`} />
            <span>
              {firstName} {lastName}
            </span>
          </Li>
        ))}
        <span />
      </Ul>
    );
  }
}

export default connect(
  ({ availability, auth }) => ({
    drivers: availability.drivers
  }),
  dispatch => ({
    fetchAvailableDriver: (date, startTime, endTime) =>
      dispatch(fetchAvailableDriver(date, startTime, endTime))
  })
)(AvailableDriversList);
