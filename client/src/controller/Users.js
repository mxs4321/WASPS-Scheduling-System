import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchUsers, updateUser } from '../model/users';
import ExpandingCard from '../view/ExpandingCard';
import Avatar, { computeColor } from '../view/Avatar';
import UserCard from '../view/UserCard';

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
        {this.props.users.map(({ id, firstName, lastName, role, ...props }) => (
          <ExpandingCard
            key={id}
            icon={<Avatar size={36} name={`${firstName} ${lastName}`} />}
            description={`${firstName} ${lastName}`}
            detailText={role}
            accentColor={computeColor(`${firstName} ${lastName}`)}
          >
            <UserCard
              updateUser={changes => this.props.updateUser(id, changes)}
              {...{ id, firstName, lastName, role, ...props }}
            />
          </ExpandingCard>
        ))}
      </ExpansionList>
    );
  }
}

export default connect(
  ({ users }) => ({
    users: Object.values(users.byId)
  }),
  dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    updateUser: (id, changes) => dispatch(updateUser(id, changes))
  })
)(Drivers);
