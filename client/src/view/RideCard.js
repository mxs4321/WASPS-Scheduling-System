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

export default ({
  driver,
  passenger,
  pickupStreetAddress,
  apptStreetAddress
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
      {driver && (
        <DriverInfo>
          <Flex>
            <Avatar name={`${driver.firstName} ${driver.lastName}`} />
            <Pad8>
              <b>
                {driver.firstName} {driver.lastName}
              </b>
              <PhoneNumber href={`tel:${driver.phone}`}>
                {driver.phone}
              </PhoneNumber>
            </Pad8>
          </Flex>
        </DriverInfo>
      )}
    </Flex3>
  </Fragment>
);
