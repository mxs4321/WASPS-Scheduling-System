import React, { Component } from 'react';
import styled from 'styled-components';
import { Popover, Input, Select } from 'antd';
import { More } from './icons';

const Pad10 = styled.div`
  padding: 10px;
`;
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Cell = styled.div`
  width: 33%;
  padding: 10px;
`;
const MoreButton = styled.a`
  position: absolute;
  top: 5px;
  right: 5px;
`;
const MoreMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  > li {
    padding: 10px 0;
  }
`;
const Button = styled.button`
  flex: 1;
  background-color: ${props => props.background};
  color: white;
`;

export default class UserCard extends Component {
  state = {
    isEditing: false
  };

  renderUserDetails() {
    const user = this.props;
    return (
      <Flex>
        <Cell>
          <span>id</span>
          <br />
          <b>{user.id}</b>
          <br />
        </Cell>
        <Cell>
          <span>Name</span>
          <br />
          <b>
            {user.firstName} {user.lastName}
          </b>
          <br />
        </Cell>
        <Cell>
          <span>Role</span>
          <br />
          <b>{user.role}</b>
          <br />
        </Cell>
        <Cell>
          <span>Phone</span>
          <br />
          <b>{user.phone}</b>
          <br />
        </Cell>
        <Cell>
          <span>Registered</span>
          <br />
          <b>{user.registered}</b>
          <br />
        </Cell>
        <Cell>
          <span>Email</span>
          <br />
          <b>{user.email}</b>
          <br />
        </Cell>
        <Popover
          placement="bottomRight"
          content={
            <MoreMenuList>
              <li>
                <a onClick={() => this.setState({ isEditing: true })}>
                  Edit User
                </a>
              </li>
            </MoreMenuList>
          }
          trigger="click"
        >
          <MoreButton>
            <More />
          </MoreButton>
        </Popover>
      </Flex>
    );
  }

  renderEdit() {
    const user = this.props;
    return (
      <Pad10>
        <div>
          <b>First Name</b>
          <Input
            defaultValue={user.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <br />
        </div>

        <div>
          <b>Last Name</b>
          <Input
            defaultValue={user.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <br />
        </div>

        <div>
          <b>Role</b> <br />
          <Select
            defaultValue={user.role}
            onChange={role => this.setState({ role })}
          >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="dispatcher">Dispatcher</Select.Option>
            <Select.Option value="driver">Driver</Select.Option>
            <Select.Option value="passenger">Passenger</Select.Option>
          </Select>
          <br />
        </div>

        <div>
          <b>Phone</b>
          <Input
            defaultValue={user.phone}
            onChange={e => this.setState({ phone: e.target.value })}
          />
          <br />
        </div>

        <div>
          <b>Email</b>
          <Input
            defaultValue={user.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <br />
        </div>
        <br />

        <Flex>
          <Button
            background="#9E9E9E"
            onClick={() => this.setState({ isEditing: false })}
          >
            Cancel
          </Button>
          <Button
            background="#4CAF50"
            onClick={() => {
              this.props.updateUser(this.state);
              this.setState({ isEditing: false });
            }}
          >
            Save
          </Button>
        </Flex>
      </Pad10>
    );
  }

  render() {
    return this.state.isEditing ? this.renderEdit() : this.renderUserDetails();
  }
}
