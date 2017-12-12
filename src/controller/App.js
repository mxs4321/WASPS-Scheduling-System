import React, { Component } from 'react';
import styled from 'styled-components';
import Toolbar from '../view/Toolbar';
import Sidebar from '../view/Sidebar';

const Fullbleed = styled.div`
  postion: absolute:
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  display: flex;
`;

export default class App extends Component {
  render() {
    return (
      <Fullbleed>
        <Toolbar />
        <Body>
          <Sidebar />
        </Body>
      </Fullbleed>
    );
  }
}
