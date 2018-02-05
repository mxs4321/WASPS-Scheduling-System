// @flow
import { post } from '../util/fetch';
import type { User } from './types/user';

type State = {
  loading: false,
  user: ?User,
  err: string
};

const DEFAULT_STATE = {
  loading: false,
  user: null,
  err: null
};

const NAMESPACE = 'auth';
const LOGIN_ATTEMPT = `${NAMESPACE}/LOGIN_ATTEMPT`;
const LOGIN_FAILED = `${NAMESPACE}/LOGIN_FAILED`;
const LOGIN_SUCCESSFUL = `${NAMESPACE}/LOGIN_SUCCESSFUL`;
const LOGOUT_ATTEMPT = `${NAMESPACE}/LOGOUT_ATTEMPT`;
const LOGOUT_FAILED = `${NAMESPACE}/LOGOUT_FAILED`;
const LOGOUT_SUCCESSFUL = `${NAMESPACE}/LOGOUT_SUCCESSFUL`;

const loginAttempt = () => ({ type: LOGIN_ATTEMPT });
const loginFailed = () => ({ type: LOGIN_FAILED });
const loginSuccessful = (user: User) => ({
  type: LOGIN_SUCCESSFUL,
  payload: user
});

const logoutAttempt = () => ({ type: LOGOUT_ATTEMPT });
const logoutFailed = () => ({ type: LOGOUT_FAILED });
const logoutSuccessful = () => ({ type: LOGOUT_SUCCESSFUL });

export const login = ({ email, password }) => dispatch => {
  dispatch(loginAttempt());
  return post('/login.php', { email, password })
    .then(user => dispatch(loginSuccessful(user)))
    .catch(err => dispatch(loginFailed(err)));
};

export const logout = () => dispatch => {
  dispatch(logoutAttempt());
  return post('/logout.php')
    .then(() => dispatch(logoutSuccessful()))
    .catch(err => dispatch(logoutFailed(err)));
};

export default function authentication(state: State = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return { loading: true };
    case LOGIN_SUCCESSFUL:
      return { loading: false, user: action.payload, err: null };
    case LOGIN_FAILED:
      return { loading: true, user: null, err: action.payload };
    case LOGOUT_ATTEMPT:
      return { loading: true };
    case LOGOUT_SUCCESSFUL:
      return { loading: false, user: null, err: null };
    case LOGOUT_FAILED:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
}
