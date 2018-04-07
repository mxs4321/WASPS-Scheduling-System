import React, { Component } from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import AvailableDriversList from '../AvailableDriversList';

const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Center = styled.div`
  margin: 0 auto;
`;
const Margin = styled.div`
  margin: 20px;
`;

export default class DriverAvailabilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverID: null,
      date: null,
      startTime: null,
      endTime: null
    };
  }

  handleChange = () => {
    const { date, startTime, endTime, driverID } = this.state;
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
    const { drivers } = this.props;
    const { driverID, date, startTime, endTime, pickupTime } = this.state;

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
                      {
                        endTime: endTime.format('HH:mm'),
                        pickupTime: endTime.format('HH:mm')
                      },
                      this.handleChange
                    );
                  }
                }}
              />
            </Margin>
          </Flex>
        </Center>
        {endTime && (
          <AvailableDriversList
            date={date}
            startTime={startTime}
            pickupTime={pickupTime}
            endTime={endTime}
            drivers={drivers}
            selectedID={driverID}
            handleChange={driverID => {
              if (driverID) {
                this.setState({ driverID }, this.handleChange);
              }
            }}
          />
        )}
      </Flex>
    );
  }
}
