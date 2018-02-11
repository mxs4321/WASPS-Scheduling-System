import { indexBy, prop } from 'ramda';
import { getJSON } from '../util/fetch';
import { updateRequest } from './ajax';
import type { Ride } from './types/ride';

type State = {
  byId: Array<Ride>
};

const DEFAULT_STATE = {
  byId: []
};
const NAMESPACE = 'RIDES';
const ADD_RIDES = `${NAMESPACE}/ADD_RIDES`;

export const fetchRides = () => dispatch => {
  dispatch(updateRequest('GET /api/rides.php', 'Pending'));
  return getJSON('/api/rides.php')
    .then(rides => {
      dispatch(updateRequest('GET /api/rides.php', 'Success'));
      dispatch({ type: ADD_RIDES, payload: rides });
    })
    .catch(err => dispatch(updateRequest('GET /api/rides.php', 'Error', err)));
};

export default (state: State = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_RIDES:
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
