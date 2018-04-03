import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, refreshUserInfo } from '../model/auth';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

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
  width: 100%;
  margin: 10px auto;
  color: white;
  background-color: ${props => props.background};
`;

export class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };
  componentDidMount() {
    const { location } = this.props;
    const useReferrer = location.state && location.state.referrer !== '/login';
    const referrer = useReferrer ? location.state.referrer : '/';
    this.props.refreshUserInfo({ referrer });
  }

  render() {
    const { user, login, location } = this.props;
    const useReferrer = location.state && location.state.referrer !== '/login';
    const referrer = useReferrer ? location.state.referrer : '/';
    if (user) {
      return <Redirect to={referrer} />;
    }
    return (
      <Card>
        <Input.Group>
          <Input
            placeholder="Email or Phone Number"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({ email: e.target.value })}
          />

          <br />
          <br />
          <Input
            type="password"
            placeholder="Password"
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Input.Group>
        <Button
          background="#4CAF50"
          onClick={() =>
            login({
              email: this.state.email,
              password: this.state.password,
              referrer
            })
          }
        >
          Sign In
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
      },
      refreshUserInfo: ({ referrer }) => {
        dispatch(refreshUserInfo({ referrer }));
      }
    })
  )(SignIn)
);
