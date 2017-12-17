//@flow
type State = {
  isPassanger: boolean,
  isDriver: boolean,
  isDispatcher: boolean
};

const DEFAULT_STATE = {
  isPassanger: false,
  isDriver: false,
  isDispatcher: false
};

const NAMESPACE = 'auth';

const LOGIN = `${NAMESPACE}/LOGIN`;
const LOGOUT = `${NAMESPACE}/LOGOUT`;

export const login = ({ isDriver, isDispatcher, isPassanger }) => ({
  type: LOGIN,
  payload: { isDriver, isDispatcher, isPassanger }
});

export const logout = () => ({
  type: LOGOUT
});

export default function authentication(state: State = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...action.payload
      };
    case LOGOUT:
      return {
        isDriver: false,
        isDispatcher: false,
        isPassanger: false
      };
    default:
      return state;
  }
}
