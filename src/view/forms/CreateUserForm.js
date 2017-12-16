import React from 'react';
import InputBox from '../InputBox';
import styled from 'styled-components';

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

const CreateUserForm = ({ onSubmit = NoOp }) => (
  <Form>
    <InputBox name="First Name" />
    <InputBox name="Last Name" />
    <InputBox name="E-Mail" />
    <InputBox name="Phone Number" />
    <Submit type="submit">Create User</Submit>
  </Form>
);

export default CreateUserForm;
