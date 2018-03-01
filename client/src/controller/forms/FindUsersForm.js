//@flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Avatar from '../../view/Avatar';
import { Search } from '../../view/icons';
import { fetchUsers } from '../../model/users';

type Props = {
  onSearchChanged: Function,
  users: string[]
};

const Flex = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;
const Box = styled.div`
  border: 1px solid black;
  margin: 10px;
  border-radius: 4px;
`;
const Input = styled.input`
  width: 100%;
  border: none;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  background-color: ${props => (props.active ? '#0070D2' : 'transparent')};
  color: ${props => (props.active ? 'white' : 'black')};
`;

class FindUserForm extends Component {
  state = {
    searchText: '',
    selectedUserId: 0
  };

  render() {
    const { onSearchChanged, didPickUser, users = [] } = this.props;
    const searchText = this.state.searchText.toUpperCase();
    const searchedUsers = users.filter(
      ({ firstName, lastName }) =>
        firstName.toUpperCase().startsWith(searchText) ||
        lastName.toUpperCase().startsWith(searchText) ||
        `${firstName.toUpperCase()} ${lastName.toUpperCase()}`.startsWith(
          searchText
        )
    );
    return (
      <Box>
        <Flex>
          <Search color="#c1c1c1" />
          <Input
            onChange={event => {
              this.setState({ searchText: event.target.value });
              onSearchChanged(event.target.value);
            }}
          />
        </Flex>
        <List>
          {searchText !== '' &&
            searchedUsers.map(({ id, firstName, lastName }) => (
              <ListItem
                active={this.state.selectedUserId === id}
                onClick={() => {
                  didPickUser(id);
                  this.setState({ selectedUserId: id });
                }}
              >
                <Avatar size={24} name={`${firstName} ${lastName}`} />
                {firstName} {lastName}
              </ListItem>
            ))}
        </List>
      </Box>
    );
  }
}

export default connect(
  state => ({
    users: Object.values(state.users.byId).filter(
      ({ role }) => role === 'passenger'
    )
  }),
  dispatch => ({
    onSearchChanged: () => dispatch(fetchUsers())
  })
)(FindUserForm);
