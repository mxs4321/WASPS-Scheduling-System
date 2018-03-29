import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Warning,
  Scheduled,
  Complete,
  Canceled,
  Help,
  Calendar
} from '../icons';
import AvailableDrivers from './AvailableDrivers';
import AssignedDriver from './AssignedDriver';
import AcceptRide from './AcceptRide';
import GoogleMap from '../GoogleMap';

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
`;
const Name = styled.b`
  flex: 2;
`;

const InnerCard = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: gray;
  width: 100%;
  display: flex;
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
  transition: all 0s, transform 0.3s, margin 0.3s, height 0.3s;
  background-color: white;
  transform-origin: top;
  overflow: hidden;
  box-shadow: ${props =>
    props.isOpen
      ? '0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
      : 'none'};
`;
const Flex3 = styled.div`
  flex: 3;
`;
const iconsForStatus = {
  Unverified: <Help color={colorForStatus['Unverified']} />,
  Pending: <Warning color={colorForStatus['Pending']} />,
  Scheduled: <Scheduled color={colorForStatus['Scheduled']} />,
  Complete: <Complete color={colorForStatus['Complete']} />,
  Canceled: <Canceled color={colorForStatus['Canceled']} />
};

const Panel = ({
  user,
  status,
  isOpen,
  pickupStreetAddress,
  apptStreetAddress
}) => {
  if (status === 'Unverified') {
    return (
      <AvailableDrivers
        isOpen={isOpen}
        pickupStreetAddress={pickupStreetAddress}
        apptStreetAddress={apptStreetAddress}
        drivers={['Niharika Nakka', 'Brett Lamy', 'Mohammad Suhail']}
      />
    );
  }
  if (status === 'Pending' && user.role === 'driver') {
    return (
      <AcceptRide
        isOpen={isOpen}
        onAccept={() => console.log('accept')}
        onDecline={() => console.log('decline')}
        pickupStreetAddress={pickupStreetAddress}
        apptStreetAddress={apptStreetAddress}
      />
    );
  }
  return (
    <AssignedDriver
      isOpen={isOpen}
      pickupStreetAddress={pickupStreetAddress}
      apptStreetAddress={apptStreetAddress}
      users={['Niharika Nakka']}
    />
  );
};

export default class ExpandingCard extends Component {
  state = { isOpen: false };

  render() {
    const {
      user,
      status,
      firstName,
      lastName,
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
              {firstName}&nbsp;{lastName}
            </Name>
            <Address>
              {pickupStreetAddress} {'\u2192'} {apptStreetAddress}
            </Address>
            <AlignRight>{pickupTime}</AlignRight>
          </Flex>
        </Row>

        <CardWrapper isOpen={isOpen}>
          <InnerCard>
            <GoogleMap
              origin={pickupStreetAddress}
              destination={apptStreetAddress}
            />
            <Flex3>
              <Flex>
                <Calendar />
                <div>
                  Nov 15th<br />
                </div>
              </Flex>
              <br />
              <Calendar />10:00 am<br />
              <br />
              {/* <Phone />
              {phone}
              <br />
              <br /> */}
              {/* <AvailableDiv>
                Available Drivers<br />
                {drivers.map(username => <Avatar size={45} name={username} />)}
                {drivers.map(username => (
                  <Status>
                    {username}
                    <br />Pending Since Today, 10PM
                  </Status>
                ))}
              </AvailableDiv> */}
            </Flex3>
          </InnerCard>
        </CardWrapper>

        <Panel
          pickupStreetAddress={pickupStreetAddress}
          apptStreetAddress={apptStreetAddress}
          user={user}
          status={status}
          isOpen={isOpen}
        />
      </Wrapper>
    );
  }
}
