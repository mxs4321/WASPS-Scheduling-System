import { indexBy, prop, map, reduce } from 'ramda';
import { getJSON } from '../util/fetch';
import { updateRequest } from './ajax';
import { addUsers } from './users';
import type { Ride } from './types/ride';

type State = {
  byId: Array<Ride>
};

const DEFAULT_STATE = {
  byId: []
};
const NAMESPACE = 'RIDES';
const ADD_RIDES = `${NAMESPACE}/ADD_RIDES`;

export const addRides = rides => ({
  type: ADD_RIDES,
  payload: rides
});

/**
 * Will Make an AJAX Request to the server and keep the redux store in sync with eacy step of the process.
 */
export const fetchRides = () => dispatch => {
  dispatch(updateRequest('GET /api/rides.php?populate=true', 'Pending'));
  return getJSON('/api/rides.php?populate=true')
    .then(rides => {
      dispatch(updateRequest('GET /api/rides.php?populate=true', 'Success'));
      // Replace the references to users with just their id
      const replaceUsersWithRefs = map(ride => ({
        passengerID: ride.passenger.id,
        driverID: ride.driver ? ride.driver.id : undefined,
        ...ride,
        driver: null,
        passenger: null
      }));
      // Get a list of all users
      const getAllUsers = reduce(
        (users, ride) => [...users, ride.passenger, ride.driver],
        []
      );
      dispatch(addUsers(getAllUsers(rides).filter(user => user)));
      dispatch(addRides(replaceUsersWithRefs(rides)));
    })
    .catch(err =>
      dispatch(updateRequest('GET /api/rides.php?populate=true', 'Error', err))
    );
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
