import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../model/auth';
import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  top: 25%;
  transition: translateY(-50%);
  width: 300px;
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
const Button = styled.button`
  display: block;
  height: 40px;
  width: 80%;
  margin: 10px auto;
  color: white;
  background-color: ${props => props.background};
`;

export default withRouter(
  connect(
    ({ auth }) => ({
      user: auth.user
    }),
    dispatch => ({
      login: ({ email, password }) => {
        dispatch(login({ email, password }));
      }
    })
  )(
    class SignIn extends Component {
      render() {
        const { login } = this.props;
        return (
          <Card>
            <Button
              background="#EB5757"
              onClick={() =>
                login({
                  email: 'dispatcher@websterwasps.com',
                  password: 'dispatcher'
                })
              }
            >
              Dispatcher
            </Button>
            <Button
              background="#27AE60"
              onClick={() =>
                login({
                  email: 'driver@websterwasps.com',
                  password: 'driver'
                })
              }
            >
              Driver
            </Button>
            <Button
              background="#4396E3"
              onClick={() =>
                login({
                  email: 'passanger@websterwasps.com',
                  password: 'passanger'
                })
              }
            >
              Passanger
            </Button>
          </Card>
        );
      }
    }
  )
);
