import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Calendar, AccessAlarm, AlarmOn } from './icons';
import GoogleMap from './GoogleMap';
import Avatar from './Avatar';

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

const AcceptRide = ({ id, updateRide }) => (
  <Flex>
    <button onClick={() => updateRide(id, { status: 'Scheduled' })}>
      Accept
    </button>
    <button onClick={() => updateRide(id, { status: 'Unverified' })}>
      Decline
    </button>
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

const DetailPanel = ({ updateRide, id, status, user, driver }) => {
  if (user && user.role === 'driver' && status === 'Pending') {
    return <AcceptRide id={id} updateRide={updateRide} />;
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
};

export default ({
  id,
  user,
  driver,
  passenger,
  status,
  pickupStreetAddress,
  apptStreetAddress,
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
              <div>Date:</div>
              <b>May 10th</b>
            </PadLeft8>
          </Flex>
          <Flex>
            <AccessAlarm size={42} />
            <PadLeft8>
              <div>Time:</div>
              <b>9:30 am</b>
            </PadLeft8>
          </Flex>
          <Flex>
            <AlarmOn size={42} />
            <PadLeft8>
              <div>Pickup:</div>
              <b>11:00 am</b>
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
        />
      </DriverInfo>
    </Flex3>
  </Fragment>
);
