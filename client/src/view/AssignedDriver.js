import React from 'react';
import styled from 'styled-components';
import { Destination, Phone, Calendar, Vertical } from './icons';
import Avatar from './Avatar';

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
const Iframe = styled.iframe`
  flex: 2;
  height: 210px;
  z-index: 1;
`;

export default ({
  isOpen,
  users,
  onReply,
  origin,
  phone,
  destination,
  apiKey = 'AIzaSyBvobiFxMVC72Zbd2YmfcxawWMpwG_QLKs',
  ...otherArgs
}) => {
  const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
  const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;

  return (
    <Wrapper isOpen={isOpen}>
      <WrapperTop>
        <DivLeft>
          <Vertical />
          {origin}
          <br />
          <br />
          <Destination />
          {destination}
          <br />
          <br />
          <Calendar />Nov 15th 10am<br />
          <br />
          <Phone />
          {phone}
          <br />
          <br />
        </DivLeft>

        <Iframe
          key={apiKey}
          title="directions"
          frameborder="0"
          src={destination === '' ? placeIframe : directionIframe}
          allowfullscreen
        />
      </WrapperTop>

      <AvailableDiv>
        Available Drivers<br />
        {users.map(username => <Avatar size={45} name={username} />)}
        {users.map(username => (
          <Status>
            {username}
            <br />Pending Since Today, 10PM
          </Status>
        ))}
      </AvailableDiv>
    </Wrapper>
  );
};
