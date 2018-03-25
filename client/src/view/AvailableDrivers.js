import React from 'react';
import styled from 'styled-components';
import { Destination, Phone, Calendar, Vertical } from './icons';
import Avatar from './Avatar';

const WrapperTop = styled.div``;
const DivLeft = styled.div``;

const Map = styled.div``;

const AvailableDiv = styled.div``;

const Iframe = styled.iframe``;

const Text = styled.a``;

export default ({
  drivers,
  phone,
  onReply,
  origin,
  destination,
  apiKey = 'AIzaSyBvobiFxMVC72Zbd2YmfcxawWMpwG_QLKs',
  ...otherArgs
}) => {
  const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
  const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
  //const { apiKey = window.REACT_APP_PLACES_API_KEY } = this.props;

  return (
    <div>
      <WrapperTop>
        <DivLeft>
          <Vertical />
          {origin}k<br />
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

        <Map>
          Map
          <Iframe
            key={apiKey}
            title="directions"
            frameborder="0"
            src={destination === '' ? placeIframe : directionIframe}
            allowfullscreen
          />
        </Map>
      </WrapperTop>

      <AvailableDiv>
        Available Drivers<br />
        {drivers.map(name => <Avatar size={45} name={name} />)}
      </AvailableDiv>
    </div>
  );
};
