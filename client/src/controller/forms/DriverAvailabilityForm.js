import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { DatePicker, TimePicker } from 'antd';
import { parse, stringify as queryify } from 'query-string';
import moment from 'moment';
import styled from 'styled-components';
import Avatar from '../../view/Avatar';
import { fetchAvailableDriver } from '../../model/availability';

const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Ul = styled.ul`
  list-style: none;
  width: 280px;
`;
const Li = styled.li`
  background-color: ${props => (props.active ? '#0070D2' : 'transparent')};
  color: ${props => (props.active ? 'white' : 'black')};
`;
const Center = styled.div`
  margin: 0 auto;
`;
const Margin = styled.div`
  margin: 20px;
`;

class DriverAvailabilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverID: null,
      date: null,
      startTime: null,
      endTime: null
    };
  }

  findDriversIfNecessary = () => {
    const { date, startTime, endTime } = this.state;
    if (startTime && endTime && date) {
      const start = `${date} ${startTime}`;
      const end = `${date} ${endTime}`;
      this.props.fetchAvailableDriver(date, startTime, endTime);
    }
  };

  handleChange = () => {
    const { date, startTime, endTime, driverID } = this.state;
    this.findDriversIfNecessary();
    if (startTime && endTime && date) {
      this.props.onChange({
        apptStart: `${date} ${startTime}`,
        apptEnd: `${date} ${endTime}`,
        pickupTime: `${date} ${startTime}`,
        driverID
      });
    }
  };

  render() {
    const { drivers, history, location } = this.props;
    const { date, startTime, endTime } = this.state;

    return (
      <Flex>
        <Center>
          <Center>
            <b>Date:</b>
            <br />
            <DatePicker
              value={date ? moment(date, 'YYYY-MM-DD') : null}
              format="YYYY-MM-DD"
              placeholder="Select Date"
              onChange={date => {
                if (date) {
                  this.setState(
                    { date: date.format('YYYY-MM-DD') },
                    this.handleChange
                  );
                }
              }}
            />
          </Center>
          <br />
          <Flex>
            <Margin>
              <b>Appointment Start:</b>
              <br />
              <TimePicker
                value={startTime ? moment(startTime, 'HH:mm') : null}
                use12Hours
                format="h:mm a"
                onChange={startTime => {
                  if (startTime) {
                    this.setState(
                      { startTime: startTime.format('HH:mm') },
                      this.handleChange
                    );
                  }
                }}
              />
            </Margin>
            <Margin>
              <b>Appointment End:</b>
              <br />
              <TimePicker
                value={endTime ? moment(endTime, 'HH:mm') : null}
                use12Hours
                format="h:mm a"
                onChange={endTime => {
                  if (endTime) {
                    this.setState(
                      { endTime: endTime.format('HH:mm') },
                      this.handleChange
                    );
                    this.props;
                  }
                }}
              />
            </Margin>
          </Flex>
        </Center>
        <Ul>
          {drivers.map(({ id, firstName, lastName, role }) => (
            <Li
              active={this.state.driverID === id}
              key={id}
              onClick={() => {
                this.setState({ driverID: id }, this.handleChange);
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
      </Flex>
    );
  }
}

export default withRouter(
  connect(
    ({ availability, auth }) => ({
      drivers: availability.drivers
    }),
    dispatch => ({
      fetchAvailableDriver: (date, startTime, endTime) =>
        dispatch(fetchAvailableDriver(date, startTime, endTime))
    })
  )(DriverAvailabilityForm)
);
