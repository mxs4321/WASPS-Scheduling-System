import React from 'react';
import styled from 'styled-components';
import { Destination, Phone, Calendar, Vertical } from '../icons';
import Avatar from '../Avatar';
import GoogleMap from '../GoogleMap';

const Accept = styled.button`
  height: 50px;
  width: 300px;
  background-color: #00b33c;
  color: white;
  font-weight: bold;
  font-size: 30px;
`;

const Decline = styled.button`
  height: 50px;
  width: 300px;
  background-color: #cc0000;
  color: white;
  font-weight: bold;
  font-size: 30px;
`;
const Buttons = styled.div`
  position: absolute;
  top: 10px;
  padding: 10px;
  padding-left: 80px;
  display: inline;
`;

const Flex = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
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

const WrapperTop = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: gray;
  width: 100%;
  display: flex;
`;
const DivLeft = styled.div`
  flex: 3;
`;
const AvailableDiv = styled.div`
  width: 70%;
  height: 17%;
  top: 217px;
  font-weight: bold;
  background-color: #f2f2f2;
`;
const Status = styled.p`
  font-size: 12px;
  display: block;
  padding-left: 60px;
  top: 30px;
`;
const Map = styled.iframe`
  flex: 5;
  z-index: 1;
`;

export default ({
  isOpen,
  driver,
  onReply,
  phone,
  pickupStreetAddress,
  apptStreetAddress,
  apiKey = 'AIzaSyBvobiFxMVC72Zbd2YmfcxawWMpwG_QLKs',
  ...otherArgs
}) => {
  return (
    <Wrapper isOpen={isOpen}>
      <WrapperTop>
        <GoogleMap
          origin={pickupStreetAddress}
          destination={apptStreetAddress}
        />
        <DivLeft>
          <Flex>
            <Calendar />
            <div>
              Nov 15th<br />
            </div>
          </Flex>
          <br />
          <Calendar />10:00 am<br />
          <br />
          <Phone />
          {phone}
          <br />
          <br />
          <AvailableDiv>
            <Buttons>
              <Accept onClick={() => {}}>ACCEPT RIDE</Accept>
              <Decline onClick={() => {}}>DECLINE RIDE</Decline>
            </Buttons>
          </AvailableDiv>
        </DivLeft>
      </WrapperTop>
    </Wrapper>
  );
};
