import { indexBy, prop } from 'ramda';
import { getJSON } from '../util/fetch';
import { updateRequest } from './ajax';
import type { User } from './types/user';

type State = {
  byId: Array<User>
};

const DEFAULT_STATE = {
  byId: []
};
const NAMESPACE = 'USERS';
const ADD_USERS = `${NAMESPACE}/ADD_USERS`;

export const addUsers = (users: Array<User>) => ({
  type: ADD_USERS,
  payload: users
});

export const fetchUsers = () => dispatch => {
  dispatch(updateRequest('GET /api/users.php', 'Pending'));
  return getJSON('/api/users.php')
    .then(users => {
      dispatch(updateRequest('GET /api/users.php', 'Success'));
      dispatch(addUsers(users));
    })
    .catch(err => dispatch(updateRequest('GET /api/users.php', 'Error', err)));
};

export default (state: State = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_USERS:
      return {
        byId: {
          ...state.byId,
          ...indexBy(prop('id'), action.payload)
        }
      };
    default:
      return state;
  }
};
