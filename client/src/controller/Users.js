import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchUsers } from '../model/users';
import ExpandingCard from '../view/ExpandingCard';
import Avatar, { computeColor } from '../view/Avatar';
import DriverCard from '../view/DriverCard';

const ExpansionList = styled.div`
  width: 100%;
  padding: 20px 60px;
`;

class Drivers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <ExpansionList>
        {this.props.drivers.map(({ id, firstName, lastName, role }) => (
          <ExpandingCard
            key={id}
            icon={<Avatar size={36} name={`${firstName} ${lastName}`} />}
            title={`${firstName} ${lastName}`}
            detailText={role}
            accentColor={computeColor(`${firstName} ${lastName}`)}
          >
            <DriverCard />
          </ExpandingCard>
        ))}
      </ExpansionList>
    );
  }
}

export default connect(
  ({ users }) => ({
    drivers: Object.values(users.byId)
  }),
  dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
  })
)(Drivers);
