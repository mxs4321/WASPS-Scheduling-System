// @flow
import type { RideStatus } from './types/ride';

type State = {
  isSidebarOpen: boolean,
  rideFilter: RideStatus
};

const NAMESPACE = 'APP';

const TOGGLE_SIDEBAR = `${NAMESPACE}/TOGGLE_SIDEBAR`;
const CHANGE_RIDE_FILTER = `${NAMESPACE}/CHANGE_RIDE_FILTER`;

const DEFAULT_STATE: State = {
  isSidebarOpen: true,
  rideFilter: ''
};

export const toggleSidebar = () => ({ type: TOGGLE_SIDEBAR });

export const changeRideFilter = (filter: RideStatus) => ({
  type: CHANGE_RIDE_FILTER,
  payload: filter
});

export default (state: State = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      };
    case CHANGE_RIDE_FILTER:
      return {
        ...state,
        rideFilter: action.payload
      };
    default:
      return state;
  }
};
