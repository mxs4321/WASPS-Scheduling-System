import React, { Component } from 'react';
import ExpansionPanel from 'material-expansion-panel';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchUsers } from '../model/users';

const ExpansionList = styled.div`
  width: 100%;
  margin: 20px 60px;
`;

class Drivers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <ExpansionList>
        {this.props.drivers.map(({ firstName, lastName }) => (
          <ExpansionPanel
            title={`${firstName} ${lastName}`}
            expandedTitle={`${firstName} ${lastName}`}
          >
            Content
          </ExpansionPanel>
        ))}
      </ExpansionList>
    );
  }
}

export default connect(
  ({ users }) => ({
    drivers: Object.values(users.byId).filter(
      ({ userRole }) => userRole === 'driver'
    )
  }),
  dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
  })
)(Drivers);
