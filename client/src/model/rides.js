import { indexBy, prop, map, reduce } from 'ramda';
import { getJSON, postJSON, putJSON } from '../util/fetch';
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
const ACCEPT_RIDE = `${NAMESPACE}/ACCEPT_RIDE`;

export const addRides = rides => ({
  type: ADD_RIDES,
  payload: rides
});

export const updateRide = (id, changedValues) => dispatch => {
  const url = `/api/rides.php?id=${id}`;
  dispatch(updateRequest(`PUT ${url}`, 'Pending'));
  return putJSON(url, changedValues)
    .then(ride => {
      dispatch(updateRequest(`GET ${url}`, 'Success'));
      debugger;
      dispatch(addRides([ride]));
    })
    .catch(err => dispatch(updateRequest(`GET ${url}`, 'Error', err)));
};

export const createRide = ({
  passengerID,
  driverID,
  apptStart,
  apptEnd,
  origin,
  destination
}) => (dispatch, getState) => {
  const url = '/api/rides.php';
  dispatch(updateRequest(`GET ${url}`, 'Pending'));
  const [pickupStreetAddress, pickupCity] = origin.split(', ');
  const [apptStreetAddress, apptCity] = destination.split(', ');
  return postJSON(url, {
    passengerID,
    apptStart,
    apptEnd,
    pickupTime: apptStart,
    pickupStreetAddress,
    pickupCity,
    apptStreetAddress,
    apptCity,
    wheelchairVan: false,
    driverID
  })
    .then(rides => {
      dispatch(updateRequest(`GET ${url}`, 'Success'));
      dispatch(
        addRides([
          {
            id: 100,
            passengerID,
            apptStart,
            apptEnd,
            status: 'Pending',
            pickupTime: apptStart,
            pickupStreetAddress,
            pickupCity,
            apptStreetAddress,
            apptCity,
            wheelchairVan: false,
            driverID
          }
        ])
      );
    })
    .catch(err => dispatch(updateRequest(`GET ${url}`, 'Error', err)));
};

/**
 * Will Make an AJAX Request to the server and keep the redux store in sync with eacy step of the process.
 */
export const fetchRidesWithUsers = () => dispatch => {
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
