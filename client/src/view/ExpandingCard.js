import React, { Component } from 'react';
import styled from 'styled-components';
import { Warning, Scheduled, Complete, Canceled, Help } from './icons';
import AvailableDrivers from './AvailableDrivers';
import AssignedDriver from './AssignedDriver';
import AcceptRide from './AcceptRide';

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
  margin: ${props => (props.isOpen ? '24px' : '0')} 0;
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

const iconsForStatus = {
  Unverified: <Help color={colorForStatus['Unverified']} />,
  Pending: <Warning color={colorForStatus['Pending']} />,
  Scheduled: <Scheduled color={colorForStatus['Scheduled']} />,
  Complete: <Complete color={colorForStatus['Complete']} />,
  Canceled: <Canceled color={colorForStatus['Canceled']} />
};

const Panel = ({ user, status, isOpen }) => {
  if (status === 'Unverified') {
    return (
      <AvailableDrivers
        origin="1900 empire blvd, Webster, NY"
        destination="55 North Ave, Webster, NY"
        drivers={['Niharika Nakka', 'Brett Lamy', 'Mohammad Suhail']}
      />
    );
  }
  if (status === 'Unverified' && user.role === 'driver') {
    return (
      <AcceptRide
        onAccept={() => console.log('accept')}
        onDecline={() => console.log('decline')}
        origin="1900 empire blvd, Webster, NY"
        destination="55 North Ave, Webster, NY"
      />
    );
  }
  return (
    <AssignedDriver
      isOpen={isOpen}
      origin="1900 empire blvd, Webster, NY"
      destination="55 North Ave, Webster, NY"
      users={['Niharika Nakka']}
    />
  );
};

export default class ExpandingCard extends Component {
  state = { isOpen: false };

  render() {
    const {
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
        <Panel isOpen={isOpen} />
      </Wrapper>
    );
  }
}
