import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../model/auth';
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

export class LoginForm extends Component {
  render() {
    const { user, login, location } = this.props;
    const useReferrer = location.state && location.state.referrer !== '/login';
    const referrer = useReferrer ? location.state.referrer : '/';
    if (user) {
      return <Redirect to={referrer} />;
    }
    return (
      <Card>
        <input onChange={console.log.bind(console)} />
        <input onChange={console.log.bind(console)} />
        <Button
          background="#4396E3"
          onClick={() =>
            login({
              email: 'passenger@websterwasps.com',
              password: 'passenger',
              referrer
            })
          }
        >
          Signin
        </Button>
      </Card>
    );
  }
}

export default withRouter(
  connect(
    ({ auth }) => ({
      user: auth.user
    }),
    dispatch => ({
      login: ({ email, password, referrer }) => {
        dispatch(login({ email, password, referrer }));
      }
    })
  )(LoginForm)
);
