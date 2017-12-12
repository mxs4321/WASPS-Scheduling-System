import React, { Component } from 'react';
import styled from 'styled-components';
import Toolbar from '../view/Toolbar';
import Sidebar from '../view/Sidebar';
import ExpansionPanel from 'material-expansion-panel';
import { Add } from '../view/icons';

const Fullbleed = styled.div`
  postion: absolute:
  width: 100%;
  height: 100%;
`;
const Body = styled.div`
  display: flex;
`;
const ExpansionList = styled.div`
  width: 100%;
  margin: 20px 60px;
`;
const FAB = styled.button`
  padding: 20px;
  background-color: #f2c94c;
  border-radius: 100%;
  position: absolute;
  right: 10px;
  bottom: 10px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
`;

export default class App extends Component {
  render() {
    return (
      <Fullbleed>
        <Toolbar title="Passanger" />
        <Body>
          <Sidebar />
          <ExpansionList>
            <ExpansionPanel
              titleIcon="done_all"
              title="Panel Title"
              expandedTitle="Expanded Panel Title"
            />
            <ExpansionPanel
              titleIcon="done_all"
              title="Panel Title"
              expandedTitle="Expanded Panel Title"
            >
              Content
            </ExpansionPanel>
            <ExpansionPanel
              titleIcon="done_all"
              title="Panel Title"
              expandedTitle="Expanded Panel Title"
            />
          </ExpansionList>
        </Body>
        <FAB>
          <Add />
        </FAB>
      </Fullbleed>
    );
  }
}
