//@flow
import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import { Search } from './icons';

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
`;
const ListItem = styled.li``;

export default ({ onSearchChanged, users }) => (
  <Box>
    <Flex>
      <Search />
      <Input onChange={event => onSearchChanged(event.target.value)} />
    </Flex>
    <List>
      {users.map(username => (
        <ListItem>
          <Avatar size={24} name={username} />
          {username}
        </ListItem>
      ))}
    </List>
  </Box>
);
