import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Calendar, AccessAlarm, AlarmOn } from './icons';
import GoogleMap from './GoogleMap';
import Avatar from './Avatar';
import AvailableDriversList from '../controller/AvailableDriversList';
import * as moment from 'moment';

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

export default ({
  id,
  user,
  driver,
  passenger,
  status,
  pickupStreetAddress,
  apptStreetAddress,
  apptStart,
  pickupTime,
  updateRide
}) => (
  <Fragment>
    <GoogleMap origin={pickupStreetAddress} destination={apptStreetAddress} />
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
