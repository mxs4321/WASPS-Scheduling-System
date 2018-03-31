import React, { Component } from 'react';
import InputBox from '../../view/InputBox';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createUser } from '../../model/users';
const NoOp = () => {};

const Form = styled.form`
  position: relative;
  width: 260px;
  height: 100%;
`;

const Submit = styled.button`
  display: block;
  width: 90px;
  height: 30px;
  color: white;
  background-color: #27ae60;
  position: absolute;
  right: 0px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
`;

class CreateUserForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phone: ''
  };
  render() {
    const { onSubmit = NoOp } = this.props;
    return (
      <Form>
        <InputBox
          name="First Name"
          onChange={firstName => {
            this.setState({ firstName });
          }}
        />
        <InputBox
          name="Last Name"
          onChange={lastName => {
            this.setState({ lastName });
          }}
        />
        <InputBox
          type="password"
          name="Password"
          onChange={password => {
            this.setState({ password });
          }}
        />
        <InputBox
          name="E-Mail"
          onChange={email => {
            this.setState({ email });
          }}
        />
        <InputBox
          name="Phone Number"
          onChange={phone => {
            this.setState({ phone });
          }}
        />
        <Submit
          type="submit"
          onClick={e => {
            e.preventDefault();
            onSubmit(this.state);
          }}
        >
          Create User
        </Submit>
      </Form>
    );
  }
}

export default connect(null, dispatch => ({
  onSubmit: user => dispatch(createUser(user))
}))(CreateUserForm);
