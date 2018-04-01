import { indexBy, prop, map, reduce } from 'ramda';
import { getJSON, postJSON } from '../util/fetch';
import { updateRequest } from './ajax';
import { addUsers } from './users';
import type { Ride } from './types/ride';
import { ATTEMPT_LOGOUT } from './auth';

// type State = {
//   byId: Array<Ride>
// };

const DEFAULT_STATE = {
  ride: [],
  driver: []
};
const NAMESPACE = 'REPORTS';
const ADD_REPORTS = `${NAMESPACE}/ADD_REPORTS`;

export const addReports = (type, report) => ({
  type: ADD_REPORTS,
  payload: { type, report }
});

/**
 * Will Make an AJAX Request to the server and keep the redux store in sync with eacy step of the process.
 */
export const fetchReport = type => dispatch => {
  const url = `/api/reports.php?info=${type}`;
  dispatch(updateRequest(`GET ${url}`, 'Pending'));
  return getJSON(url)
    .then(report => {
      dispatch(updateRequest(`GET ${url}`, 'Success'));
      dispatch(addReports(type, report));
    })
    .catch(err => dispatch(updateRequest(`GET ${url}`, 'Error', err)));
};

export const exportReport = type => dispatch => {
  window.open(`http://localhost:8000/api/reports.php?info=${type}&export=true`);
  //   dispatch(updateRequest(`GET ${url}`, "Pending"));
  //   return getJSON(url)
  //     .then(rides => {
  //       dispatch(updateRequest(`GET ${url}`, "Success"));
  //     })
  //     .catch(err => dispatch(updateRequest(`GET ${url}`, "Error", err)));
};

export default (state: State = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_REPORTS:
      return {
        ...state,
        [action.payload.type]: action.payload.report
      };
    case ATTEMPT_LOGOUT:
      return DEFAULT_STATE;
    default:
      return state;
  }
};
