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
      isPassanger: auth.isPassanger,
      isDispatcher: auth.isDispatcher,
      isDriver: auth.isDriver
    }),
    dispatch => ({
      login: ({ isPassanger, isDispatcher, isDriver }) => {
        dispatch(login({ isPassanger, isDispatcher, isDriver }));
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
                  isDispatcher: true,
                  isDriver: false,
                  isPassanger: false
                })
              }
            >
              Dispatcher
            </Button>
            <Button
              background="#27AE60"
              onClick={() =>
                login({
                  isDispatcher: false,
                  isDriver: true,
                  isPassanger: false
                })
              }
            >
              Driver
            </Button>
            <Button
              background="#4396E3"
              onClick={() =>
                login({
                  isDispatcher: false,
                  isDriver: false,
                  isPassanger: true
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
