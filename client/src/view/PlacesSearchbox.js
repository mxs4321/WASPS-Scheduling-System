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
  margin: ${props => (props.left ? '' : '0 auto')};
`;
const Title = styled.b`
  margin-top: ${props => (props.left ? '' : '5px')};
  margin-left: ${props => (props.left ? '' : '5px')};
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
    const { title, left } = this.props;
    const { address } = this.state;
    return (
      <Wrapper left={left}>
        <Title left={left}>{title}</Title>
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
