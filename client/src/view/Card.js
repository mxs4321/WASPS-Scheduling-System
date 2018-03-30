import React, { Component } from 'react';
import styled from 'styled-components';
import GoogleMap from './GoogleMap';
import Avatar from './Avatar';
import {
  Warning,
  Scheduled,
  Complete,
  Canceled,
  Help,
  Calendar,
  AccessAlarm,
  AlarmOn
} from './icons';

const colorForStatus = {
  Unverified: '#EB5757',
  Pending: '#F2994A',
  Scheduled: '#6FCF97',
  Complete: '#27AE60',
  Canceled: '#828282'
};

const Icon = styled.span`
  margin: 0 6px;
`;
const Wrapper = styled.div`
  background: ${props =>
    props.isOpen
      ? `linear-gradient(${colorForStatus[props.status]} 20%, #DDDDDD 30% )`
      : 'white'};
  transition: all 0.3s;
  margin: ${props => (props.isOpen ? '10px' : '0')} 0;
`;
const Row = styled.div`
  height: 46px;
  line-height: 46px;
  color: ${props => (props.isOpen ? 'white' : 'black')};
  border-bottom: ${props => (props.isOpen ? 'none' : '1px solid #dddddd')};
`;
const AlignRight = styled.span`
  text-align: right;
  margin-right: 20px;
  flex: 1;
`;
const Address = styled.span`
  flex: 5;
  width: 100%;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const Name = styled.b`
  flex: 2;
`;
const CardWrapper = styled.div`
  opacity: ${props => (props.isOpen ? '100%' : '0')};
  border-bottom: ${props => (props.isOpen ? 'none' : '1px solid #e0e0e0')};
  transform: ${props =>
    props.isOpen
      ? 'translateY(-10px) scale(1, 1)'
      : 'translateY(0) scale(.97, .97)'};
  width: ${props => (props.isOpen ? 'calc(100% - 20px)' : '100%')};
  margin: ${props => (props.isOpen ? '10px' : '0')};
  height: ${props => (props.isOpen ? 'auto' : '0px')};
  max-height: 500px;
  transition: all 0s, transform 0.3s, margin 0.3s, height 0.3s;
  background-color: white;
  transform-origin: right;
  overflow: hidden;
  display: flex;
  box-shadow: ${props =>
    props.isOpen
      ? '0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
      : 'none'};
`;
const Flex3 = styled.div`
  flex: 3;
`;

const DriverInfo = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #fafafa;
`;
const RideInfo = styled.div`
  padding: 10px;
`;
const Pad8 = styled.div`
  padding: 8px;
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
const PadLeft8 = styled.div`
  padding-left: 8px;
`;

const iconsForStatus = {
  Unverified: <Help color={colorForStatus['Unverified']} />,
  Pending: <Warning color={colorForStatus['Pending']} />,
  Scheduled: <Scheduled color={colorForStatus['Scheduled']} />,
  Complete: <Complete color={colorForStatus['Complete']} />,
  Canceled: <Canceled color={colorForStatus['Canceled']} />
};

export default class ExpandingCard extends Component {
  state = { isOpen: false };

  render() {
    const {
      passenger,
      driver,
      status,
      pickupStreetAddress,
      apptStreetAddress,
      pickupTime
    } = this.props;
    const { isOpen } = this.state;
    return (
      <Wrapper status={status} isOpen={isOpen}>
        <Row isOpen={isOpen} onClick={() => this.setState({ isOpen: !isOpen })}>
          <Flex>
            <Icon>{iconsForStatus[status]}</Icon>
            <Name>
              {passenger.firstName}&nbsp;{passenger.lastName}
            </Name>
            <Address>
              {pickupStreetAddress} {'\u2192'} {apptStreetAddress}
            </Address>
            <AlignRight>{pickupTime}</AlignRight>
          </Flex>
        </Row>

        <CardWrapper isOpen={isOpen}>
          <GoogleMap
            origin={pickupStreetAddress}
            destination={apptStreetAddress}
          />
          <Flex3>
            <RideInfo>
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
            </RideInfo>
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
        </CardWrapper>
      </Wrapper>
    );
  }
}
