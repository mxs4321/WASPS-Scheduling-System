// @flow
const NAMESPACE = 'AJAX';
const UPDATE_REQUEST = `${NAMESPACE}/UPDATE_REQUEST`;

type RequestStatus = 'Pending' | 'Success' | 'Failed';

type State = {
  [string]: {
    status: RequestStatus,
    lastUpdated: date,
    err?: Error
  }
};

const DEFAULT_STATE = {};

export const updateRequest = (name, status: RequestStatus, err) => ({
  type: UPDATE_REQUEST,
  payload: { name, status, err }
});

export default (state: State = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return {
        ...state,
        [action.payload.name]: {
          status: action.payload.status,
          err: action.payload.err,
          lastUpdated: new Date()
        }
      };
    default:
      return state;
  }
};
