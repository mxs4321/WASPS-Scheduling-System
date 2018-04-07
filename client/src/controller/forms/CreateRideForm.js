import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, InputNumber, Select, TimePicker, DatePicker } from 'antd';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { createRide } from '../../model/rides';
import PlacesSearchBox from '../../view/PlacesSearchbox';

const Pad10 = styled.div`
  padding: 10px;
`;
const InputTitle = styled.b`
  padding-top: 8px;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const Button = styled.button`
  flex: 1;
  background-color: ${props => props.background};
  color: white;
`;

class CreateRideForm extends Component {
  state = {
    origin: 'Webster NY, United States',
    destination: ''
  };

  render() {
    const {
      onSubmit,
      user,
      closeForm,
      apiKey = window.REACT_APP_PLACES_API_KEY
    } = this.props;
    const {
      origin,
      destination,
      apptStart,
      apptEnd,
      pickupTime,
      date
    } = this.state;
    const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
    const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
    const isComplete =
      origin !== 'Webster NY, United States' &&
      destination !== '' &&
      apptStart &&
      apptEnd;
    return (
      <div>
        <Pad10>
          <Flex>
            <div>
              <InputTitle>Pickup Address</InputTitle>
              <PlacesSearchBox
                left
                onAddressPicked={origin => this.setState({ origin })}
              />
              <InputTitle>Appointment Address</InputTitle>
              <PlacesSearchBox
                left
                onAddressPicked={destination => this.setState({ destination })}
              />
              <InputTitle>Date</InputTitle>
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
              <br />
              <InputTitle>Start Time</InputTitle>
              <br />
              <TimePicker
                use12Hours
                format="h:mm a"
                onChange={apptStart => {
                  if (apptStart) {
                    this.setState({
                      apptStart: apptStart.format('HH:mm')
                    });
                  }
                }}
              />
              <br />
              <InputTitle>Pickup Time</InputTitle>
              <br />
              <TimePicker
                use12Hours
                format="h:mm a"
                onChange={pickupTime => {
                  if (pickupTime) {
                    this.setState({
                      pickupTime: pickupTime.format('HH:mm')
                    });
                  }
                }}
              />
              <br />
              <InputTitle>End Time</InputTitle>
              <br />
              <TimePicker
                use12Hours
                format="h:mm a"
                onChange={apptEnd => {
                  if (apptEnd) {
                    this.setState({
                      apptEnd: apptEnd.format('HH:mm')
                    });
                  }
                }}
              />
            </div>
            <iframe
              title="directions"
              frameborder="0"
              src={destination === '' ? placeIframe : directionIframe}
              allowfullscreen
            />
          </Flex>
          <br />
          <br />
          <br />
          <Flex>
            <Button
              background={isComplete ? '#4CAF50' : '#9E9E9E'}
              onClick={() =>
                isComplete &&
                onSubmit({
                  passengerID: user.id,
                  apptStart: `${date} ${apptStart}`,
                  apptEnd: `${date} ${apptEnd}`,
                  pickupTime: `${date} ${pickupTime}`,
                  origin,
                  destination
                }) &&
                closeForm()
              }
            >
              Create Ride
            </Button>
          </Flex>
        </Pad10>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({ user: auth.user }),
  dispatch => ({
    onSubmit: ride => dispatch(createRide(ride))
  })
)(CreateRideForm);
