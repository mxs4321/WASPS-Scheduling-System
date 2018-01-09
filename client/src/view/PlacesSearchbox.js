import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';

type Props = {
  /** The text which appears above the search box */
  title: string,
  /** Function called when they select an address from the search box. */
  addressPicked: Function
};

const NoOp = () => {};

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  margin: 0 auto;
`;
const Title = styled.b`
  margin-top: 5px;
  margin-left: 5px;
  font-size: 12px;
`;

class PlacesSearchBox extends Component {
  props: Props;
  state = { address: '' };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address }, () => {
      const { onAddressPicked = NoOp } = this.props;
      onAddressPicked(address);
    });
  };

  render() {
    const { title } = this.props;
    const { address } = this.state;
    return (
      <Wrapper>
        <Title>{title}</Title>
        <PlacesAutocomplete
          googleLogo={false}
          onSelect={this.handleSelect}
          styles={{
            input: {
              width: '260px',
              height: '11px',
              fontSize: '16px',
              border: '2px solid rgba(0, 0, 0, 0.6)',
              borderRadius: '4px',
              marginBottom: '5px'
            },
            autocompleteContainer: {
              zIndex: 1000
            }
          }}
          inputProps={{
            type: 'text',
            value: address,
            onChange: this.handleChange,
            placeholder: 'Search Places'
          }}
        />
      </Wrapper>
    );
  }
}

export default PlacesSearchBox;
