import { groupBy, prop, map, reduce } from 'ramda';
import { getJSON, putJSON } from '../util/fetch';
import { updateRequest } from './ajax';
import { addUsers } from './users';

type State = {
  byDriverId: Array<Ride>
};

const DEFAULT_STATE = {
  byDriverId: []
};
const NAMESPACE = 'AVAILABILITY';
const ADD_AVAILABILITY = `${NAMESPACE}/ADD_AVAILABILITY`;

export const addAvailability = availability => ({
  type: ADD_AVAILABILITY,
  payload: availability
});

/**
 * Makes call to get list of driverAvailabilities
 */
export const fetchDriverAvailability = () => dispatch => {
  const url = '/api/driverAvailabilities.php';
  dispatch(updateRequest(`GET ${url}`, 'Pending'));
  return getJSON(url)
    .then(availability => {
      dispatch(updateRequest(`GET ${url}`, 'Success'));
      dispatch(addAvailability(availability));
    })
    .catch(err => dispatch(updateRequest(`GET ${url}`, 'Error', err)));
};

/**
 * Updates driver Availability on the server
 */
export const updateDriverAvailability = availability => dispatch => {
  const url = `/api/driverAvailabilities.php?id=${availability.id}`;
  dispatch(updateRequest(`PUT ${url}`, 'Pending'));
  return putJSON(url, availability)
    .then(availability => {
      dispatch(updateRequest(`PUT ${url}`, 'Success'));
    })
    .catch(err => dispatch(updateRequest(`PUT ${url}`, 'Error', err)));
};

export default (state: State = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_AVAILABILITY:
      return {
        byDriverId: groupBy(prop('driverID'), [
          ...Object.values(state.byDriverId),
          ...action.payload
        ])
      };
    default:
      return state;
  }
};
