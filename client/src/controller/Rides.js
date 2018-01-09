import React, { Component } from 'react';
import ExpansionPanel from 'material-expansion-panel';
import styled from 'styled-components';

const ExpansionList = styled.div`
  width: 100%;
  margin: 20px 60px;
`;

class Rides extends Component {
  render() {
    return (
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
    );
  }
}

export default Rides;
