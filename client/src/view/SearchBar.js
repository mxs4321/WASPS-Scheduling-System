//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Search } from './icons';

type Props = {
  /** Call back for when the search bar is Focused */
  onFocus: Function,
  /** Call back for when the search bar is Blured */
  onBlur: Function
};

const SearchBarBackground = styled.div`
  position: relative;
  width: 70%;
  height: 28px;
  margin: 0 auto;
  border-radius: 2px;
`;
const SearchBarInput = styled.input`
  width: 100%;
  height: 28px;
  border: none;
  border-radius: 2px;
  padding-left: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  :hover,
  :focus {
    background-color: rgba(255, 255, 255, 0.3);
  }
  ::placeholder {
    color: white;
  }
`;
const SearchIcon = styled(Search)`
  position: absolute;
  top: 12px;
  left: 18px;
`;

class SearchBar extends Component {
  props: Props;
  state = {
    isFocused: false
  };
  render() {
    const { onFocus, onBlur } = this.props;
    return (
      <SearchBarBackground {...this.props}>
        <SearchIcon />
        <SearchBarInput
          onFocus={() => {
            this.setState({ isFocused: true });
            onFocus();
          }}
          onBlur={() => {
            this.setState({ isFocused: false });
            onBlur();
          }}
          placeholder="Search..."
        />
      </SearchBarBackground>
    );
  }
}

export default SearchBar;
