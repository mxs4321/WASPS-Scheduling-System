import React from 'react';
import styled from 'styled-components';

const Iframe = styled.iframe`
  flex: 5;
  z-index: 1;
`;

export default ({
  origin,
  destination,
  apiKey = 'AIzaSyBvobiFxMVC72Zbd2YmfcxawWMpwG_QLKs'
}) => {
  const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
  const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;

  return (
    <Iframe
      key={apiKey}
      title="directions"
      frameborder="0"
      src={destination === '' ? placeIframe : directionIframe}
      allowfullscreen
    />
  );
};
