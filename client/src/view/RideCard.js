import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import { Popover, Input, InputNumber, Select, TimePicker } from 'antd';
import { Calendar, AccessAlarm, AlarmOn, More, EditLocation } from './icons';
import GoogleMap from './GoogleMap';
import Avatar from './Avatar';
import AvailableDriversList from '../controller/AvailableDriversList';

const Flex = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const Flex3 = styled.div`
  flex: 3;
`;
const Pad10 = styled.div`
  padding: 10px;
`;
const Pad8 = styled.div`
  padding: 8px;
`;
const PadLeft8 = styled.div`
  padding-left: 8px;
`;
const DriverInfo = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #fafafa;
`;
const DateAndTimeRow = styled.div`
  display: flex;
  padding: 20px 10px;
`;
const PhoneNumber = styled.a`
  display: block;
  color: #4fc3f7;
  text-decoration: none;
`;
const Button = styled.button`
  flex: 1;
  background-color: ${props => props.background};
  color: white;
`;
const MoreButton = styled.a`
  position: absolute;
  top: 5px;
  right: 5px;
`;
const MoreMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  > li {
    padding: 10px 0;
  }
`;
const InputTitle = styled.b`
  padding-top: 8px;
`;

const AcceptRide = ({ id, updateRide }) => (
  <Flex>
    <Button
      background="#4CAF50"
      onClick={() => updateRide(id, { status: 'Scheduled' })}
    >
      Accept
    </Button>
    <Button
      background="#F44336"
      onClick={() => updateRide(id, { status: 'Unverified' })}
    >
      Reject
    </Button>
  </Flex>
);

const DriverPanel = ({ firstName, lastName, phone }) => (
  <Flex>
    <Avatar name={`${firstName} ${lastName}`} />
    <Pad8>
      <b>
        {firstName} {lastName}
      </b>
      <PhoneNumber href={`tel:${phone}`}>{phone}</PhoneNumber>
    </Pad8>
  </Flex>
);

const DetailPanel = ({
  apptStart,
  pickupTime,
  drivers,
  selectedId,
  updateRide,
  id,
  status,
  user,
  driver
}) => {
  if (
    user &&
    (user.role === 'admin' || user.role === 'dispatcher') &&
    status === 'Unverified'
  ) {
    return (
      <Fragment>
        <InputTitle>Available Drivers</InputTitle>
        <AvailableDriversList
          drivers={drivers}
          selectedID={selectedId}
          date={moment(apptStart).format('MM-DD-YYYY')}
          startTime={moment(apptStart).format('HH:mm')}
          pickupTime={moment(pickupTime).format('HH:mm')}
          endTime={moment(pickupTime).format('HH:mm')}
          handleChange={driverID =>
            updateRide(id, { driverID, status: 'Pending' })
          }
        />
      </Fragment>
    );
  }
  if (user && user.role === 'driver' && status === 'Pending') {
    return <AcceptRide id={id} updateRide={updateRide} />;
  }

  if (user && user.role === 'driver' && status === 'Scheduled') {
    return (
      <Flex>
        <Button
          background="#F44336"
          onClick={() => updateRide(id, { status: 'Unverified' })}
        >
          Reject Ride
        </Button>
      </Flex>
    );
  }

  if (driver) {
    return (
      <DriverPanel
        firstName={driver.firstName}
        lastName={driver.lastName}
        phone={driver.phone}
      />
    );
  }
  return null;
};
class EditRide extends Component {
  render() {
    const {
      id,
      user,
      driver,
      passenger,
      status,
      pickupStreetAddress,
      apptStreetAddress,
      apptStart,
      apptEnd,
      pickupTime,
      numMiles,
      onCancel,
      onSubmit
    } = this.props;
    return (
      <Pad10>
        <InputTitle>Pickup Address</InputTitle>
        <Input
          defaultValue={pickupStreetAddress}
          onChange={e => this.setState({ pickupStreetAddress: e.target.value })}
        />
        <InputTitle>Appointment Address</InputTitle>
        <Input
          defaultValue={apptStreetAddress}
          onChange={e => this.setState({ apptStreetAddress: e.target.value })}
        />
        <br />
        <InputTitle>Start Time</InputTitle>
        <br />
        <TimePicker
          value={apptStart ? moment(pickupTime, 'HH:mm') : null}
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
          value={pickupTime ? moment(pickupTime, 'h:mm a') : null}
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
          value={apptEnd ? moment(apptEnd, 'h:mm a') : null}
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
        <br />
        <InputTitle>Distance</InputTitle>
        <br />
        <InputNumber
          defaultValue={numMiles}
          min={0}
          step={0.1}
          onChange={numMiles => this.setState({ numMiles })}
        />
        <br />
        <InputTitle>Status</InputTitle>
        <br />
        <Select
          defaultValue={status}
          onChange={status => this.setState({ status })}
        >
          <Select.Option value="Unverified">Unverified</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Scheduled">Scheduled</Select.Option>
          <Select.Option value="Complete">Complete</Select.Option>
          <Select.Option value="Canceled">Canceled</Select.Option>
        </Select>
        <br />
        <br />
        <br />
        <Flex>
          <Button background="#9E9E9E" onClick={onCancel}>
            Cancel
          </Button>
          <Button background="#4CAF50" onClick={() => onSubmit(this.state)}>
            Save
          </Button>
        </Flex>
      </Pad10>
    );
  }
}

export default class RideCard extends Component {
  state = {
    isEditing: false
  };

  render() {
    const {
      id,
      user,
      driver,
      passenger,
      status,
      pickupStreetAddress,
      apptStreetAddress,
      apptStart,
      numMiles,
      pickupTime,
      updateRide
    } = this.props;
    if (this.state.isEditing)
      return (
        <EditRide
          onCancel={() => {
            this.setState({ isEditing: false });
          }}
          onSubmit={ride => {
            this.setState({ isEditing: false });
            updateRide(id, ride);
          }}
          {...this.props}
        />
      );
    return (
      <Fragment>
        <GoogleMap
          origin={pickupStreetAddress}
          destination={apptStreetAddress}
        />
        <Flex3>
          <Pad10>
            <Flex>
              <Avatar name={`${passenger.firstName} ${passenger.lastName}`} />
              <Pad8>
                <b>
                  {passenger.firstName} {passenger.lastName}
                </b>
                <PhoneNumber href={`tel:${passenger.phone}`}>
                  {passenger.phone}
                </PhoneNumber>
              </Pad8>
              <Popover
                placement="bottomRight"
                content={
                  <MoreMenuList>
                    <li>
                      <a onClick={() => this.setState({ isEditing: true })}>
                        Edit Ride
                      </a>
                    </li>
                    {['Unverified', 'Pending', 'Scheduled'].includes(
                      status
                    ) && (
                      <li>
                        <a
                          onClick={() => updateRide(id, { status: 'Canceled' })}
                        >
                          Cancel Ride
                        </a>
                      </li>
                    )}
                  </MoreMenuList>
                }
                trigger="click"
              >
                <MoreButton>
                  <More />
                </MoreButton>
              </Popover>
            </Flex>
            <DateAndTimeRow>
              <Flex>
                <Calendar size={42} />
                <PadLeft8>
                  <div>Date</div>
                  <b>{moment(apptStart).format('MM-DD')}</b>
                </PadLeft8>
              </Flex>
              <Flex>
                <AccessAlarm size={42} />
                <PadLeft8>
                  <div>Time:</div>
                  <b>{moment(apptStart).format('HH:mm')}</b>
                </PadLeft8>
              </Flex>
            </DateAndTimeRow>
            <DateAndTimeRow>
              <Flex>
                <EditLocation size={42} />
                <PadLeft8>
                  <div>Distance:</div>
                  <b>{numMiles ? numMiles : '?'}</b>
                </PadLeft8>
              </Flex>
              <Flex>
                <AlarmOn size={42} />
                <PadLeft8>
                  <div>Pickup:</div>
                  <b>{moment(pickupTime).format('HH:mm')}</b>
                </PadLeft8>
              </Flex>
            </DateAndTimeRow>
          </Pad10>
          <DriverInfo>
            <DetailPanel
              id={id}
              updateRide={updateRide}
              driver={driver}
              user={user}
              status={status}
              apptStart={apptStart}
              pickupTime={pickupTime}
            />
          </DriverInfo>
        </Flex3>
      </Fragment>
    );
  }
}
