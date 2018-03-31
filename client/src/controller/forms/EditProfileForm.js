import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { User } from '../../view/icons';
import { updateProfile } from '../../model/auth';

const Wrapper = styled.div`
  font-weight: bold;
  width: 70%;
  height: 100%;
`;
const Heading = styled.div`
  color: #004d99;
  font-size: 1.3em;
  border-bottom: 1px solid #004d99;
  margin: 15px;
`;
const Input = styled.input`
  display: block;
  background-color: #e8e8e8;
  width: 235px;
  height: 25px;
  margin: 6px;
  font-size: 14px;
  color: #a9a9a9;
  border: none;
`;
const Label = styled.label`
  width: 200px;
  display: inline-block;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
`;
const Field = styled.div`
  width: 200px;
  display: inline-block;
  text-align: left;
`;
const Checkbox = styled(props => <input type="checkbox" {...props} />)`
  cursor: pointer;
  margin-top: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 25px;
  height: 25px;
  background-color: #e8e8e8;
  cursor: pointer;
  &:checked {
    background-color: white;
    width: 10px;
    height: 20px;
    border: solid green;
    border-width: 0 4px 4px 0;
    transform: rotate(45deg);
  }
`;
const Save = styled.button`
  height: 40px;
  width: 150px;
  background-color: #0073e6;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
`;
const EditDiv = styled.div`
  position: relative;
  left: 200px;
  top: 10px;
`;

export class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    const {
      id,
      firstName,
      lastName,
      phone,
      email,
      wantsSMS,
      wantsEmail
    } = this.props;
    this.state = {
      id,
      firstName,
      lastName,
      phone,
      email,
      wantsSMS,
      wantsEmail
    };
  }
  render() {
    const {
      firstName,
      lastName,
      phone,
      email,
      wantsSMS,
      wantsEmail,
      onSave
    } = this.props;
    return (
      <Wrapper>
        <Heading>
          <User />Edit Profile
        </Heading>

        <EditDiv>
          <Label>First Name</Label>
          <Field>
            <Input
              defaultValue={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </Field>
          <br />
          <Label>Last Name</Label>
          <Field>
            <Input
              defaultValue={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </Field>
          <br />
          <Label>Phone</Label>
          <Field>
            <Input
              defaultValue={phone}
              onChange={e => this.setState({ phone: e.target.value })}
            />
          </Field>
          <br />
          <Label>Email Address</Label>
          <Field>
            <Input
              defaultValue={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </Field>
          <br />
          <Label>Current Password</Label>
          <Field>
            <Input
              onChange={e => this.setState({ currentPassword: e.target.value })}
            />
          </Field>
          <br />
          <Label>New Password</Label>
          <Field>
            <Input
              onChange={e => this.setState({ newPassword: e.target.value })}
            />
          </Field>
          <br />
          <Label>Wants SMS</Label>
          <Field>
            <Checkbox
              defaultChecked={wantsSMS}
              onChange={e => this.setState({ wantsSMS: e.target.value })}
            />
          </Field>
          <br />
          <Label>Wants Email</Label>
          <Field>
            <Checkbox
              defaultChecked={wantsEmail}
              onChange={e => this.setState({ wantsEmail: e.target.value })}
            />
          </Field>
          <br />
        </EditDiv>

        <Save onClick={() => onSave(this.state)}>SAVE</Save>
      </Wrapper>
    );
  }
}

export default connect(
  ({ auth }) => ({ ...auth.user }),
  dispatch => ({
    onSave: user => dispatch(updateProfile(user.id, user))
  })
)(EditProfileForm);
