import { groupBy, prop, map, reduce, flatten, indexBy } from 'ramda';
import { getJSON, postJSON, putJSON, deleteJSON } from '../util/fetch';
import { updateRequest } from './ajax';
import { addUsers } from './users';

type State = {
  byId: Array<Ride>
};

const DEFAULT_STATE = {
  byId: []
};

const NAMESPACE = 'AVAILABILITY';
const ADD_AVAILABILITY = `${NAMESPACE}/ADD_AVAILABILITY`;
const DELETE_AVAILABILITY = `${NAMESPACE}/DELETE_AVAILABILITY`;

export const addAvailability = availability => ({
  type: ADD_AVAILABILITY,
  payload: availability
});

export const deleteAvailability = availability => ({
  type: DELETE_AVAILABILITY,
  payload: availability
});

/**
 * Makes call to get list of driverAvailabilities
 */
export const fetchDriverAvailability = () => dispatch => {
  dispatch(updateRequest('GET /api/driverAvailabilities.php', 'Pending'));
  return getJSON('/api/driverAvailabilities.php')
    .then(availability => {
      dispatch(updateRequest('GET /api/driverAvailabilities.php', 'Success'));
      dispatch(addAvailability(availability));
    })
    .catch(err =>
      dispatch(updateRequest('GET /api/driverAvailabilities.php', 'Error', err))
    );
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
      dispatch(addAvailability([availability]));
    })
    .catch(err => dispatch(updateRequest(`PUT ${url}`, 'Error', err)));
};

/**
 * Create driver Availability on the server
 */
export const createDriverAvailability = availability => dispatch => {
  const url = '/api/driverAvailabilities.php';
  dispatch(updateRequest(`POST ${url}`, 'Pending'));
  return postJSON(url, availability)
    .then(availability => {
      dispatch(updateRequest(`POST ${url}`, 'Success'));
      dispatch(addAvailability([availability]));
    })
    .catch(err => dispatch(updateRequest(`POST ${url}`, 'Error', err)));
};

/**
 * Delete driver Availability on the server
 */
export const deleteDriverAvailability = availability => dispatch => {
  const url = `/api/driverAvailabilities.php?id=${availability.id}`;
  dispatch(updateRequest(`DELETE ${url}`, 'Pending'));
  return deleteJSON(url)
    .then(() => {
      dispatch(updateRequest(`DELETE ${url}`, 'Success'));
      dispatch(deleteAvailability(availability));
    })
    .catch(err => dispatch(updateRequest(`DELETE ${url}`, 'Error', err)));
};

export default (state: State = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_AVAILABILITY:
      return {
        byId: indexBy(
          prop('id'),
          flatten([...Object.values(state.byId), ...action.payload])
        )
      };
    case DELETE_AVAILABILITY:
      return {
        byId: indexBy(
          prop('id'),
          Object.values(state.byId).filter(({ id }) => id !== action.payload.id)
        )
      };
    default:
      return state;
  }
};
