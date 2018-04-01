// @flow
import { push } from 'react-router-redux';
import { postJSON, deleteJSON, putJSON } from '../util/fetch';
import { updateRequest } from './ajax';
import type { User } from './types/user';

type State = { user: ?User };

const NAMESPACE = 'AUTH';

const LOGIN_SUCCESSFUL = `${NAMESPACE}/LOGIN_SUCCESSFUL`;
export const ATTEMPT_LOGOUT = `${NAMESPACE}/ATTEMPT_LOGOUT`;

export const login = ({ email, password, referrer }) => dispatch => {
  dispatch(updateRequest('POST /login.php', 'Pending'));
  return postJSON('/login.php', { email, password })
    .then(user => {
      dispatch(updateRequest('POST /login.php', 'Success'));
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: user
      });
      dispatch(push(referrer));
    })
    .catch(err => dispatch(updateRequest('POST /login.php', 'Error', err)));
};

export const logout = () => dispatch => {
  dispatch({ type: ATTEMPT_LOGOUT });
  dispatch(updateRequest('DELETE /logout.php', 'Pending'));
  return deleteJSON('/logout.php')
    .then(() => dispatch(updateRequest('DELETE /logout.php', 'Success')))
    .catch(err => dispatch(updateRequest('DELETE /logout.php', 'Error', err)));
};

export const updateProfile = (id, user) => dispatch => {
  const url = `/api/users.php?id=${id}`;
  dispatch(updateRequest(`PUT ${url}`, 'Pending'));
  return putJSON(url, user)
    .then(() => dispatch(updateRequest(`PUT ${url}`, 'Success')))
    .catch(err => dispatch(updateRequest(`PUT ${url}`, 'Error', err)));
};

export default function authentication(state: State = { user: null }, action) {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return { user: action.payload };
    case ATTEMPT_LOGOUT:
      return { user: null };
    default:
      return state;
  }
}
