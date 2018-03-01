import React, { Component } from 'react';
import PlacesSearchBox from '../../view/PlacesSearchbox';
import styled from 'styled-components';

type Props = {
  /** Google Maps API key */
  apiKey: string,
  /** (address: string) => null */
  onOriginChanged: Function,
  /** (address: string) => null */
  onDestinationChanged: Function,
  /** ({ origin, destination }: { origin: string, destination: string }) => null */
  onRouteChanged: Function
};

const NoOp = () => {};

const Flex = styled.div`
  display: flex;
  z-index: 2;
`;
const Wrapper = styled.div`
  position: absolute;
  padding-top: 20px;
  width: 100%;
  height: calc(100% - 80px);
`;
const Iframe = styled.iframe`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
  z-index: 1;
`;

class GoogleRoutesForm extends Component {
  props: Props;
  state = {
    origin: 'Webster NY, United States',
    destination: ''
  };

  setOrigin = address => {
    this.setState({ origin: address }, () => {
      const { onOriginChanged = NoOp, onRouteChanged = NoOp } = this.props;
      const { origin, destination } = this.state;
      onOriginChanged(address);
      if (destination !== '') {
        onRouteChanged({ origin, destination });
      }
    });
  };

  setDestination = address => {
    this.setState({ destination: address }, () => {
      const { onDestinationChanged = NoOp, onRouteChanged = NoOp } = this.props;
      const { origin, destination } = this.state;
      onDestinationChanged(address);
      if (origin !== 'Webster NY, United States' && origin !== '') {
        onRouteChanged({ origin, destination });
      }
    });
  };

  render() {
    const { apiKey = window.REACT_APP_PLACES_API_KEY } = this.props;
    const { origin, destination } = this.state;
    const placeIframe = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${origin}`;
    const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
    return (
      <Wrapper>
        <Iframe
          title="directions"
          frameborder="0"
          src={destination === '' ? placeIframe : directionIframe}
          allowfullscreen
        />
        <Flex>
          <PlacesSearchBox title="Start" onAddressPicked={this.setOrigin} />
          <PlacesSearchBox
            title="Destination"
            onAddressPicked={this.setDestination}
          />
        </Flex>
      </Wrapper>
    );
  }
}

export default GoogleRoutesForm;
