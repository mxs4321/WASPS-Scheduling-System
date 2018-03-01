import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { parse, stringify as queryify } from 'query-string';
import { DatePicker } from 'antd';
import Breadcrumb, { Crumb } from '../view/Breadcrumb';
import CreateUserForm from './forms/CreateUserForm';
import GoogleRoutesForm from './forms/GoogleRoutesForm';
import FindUsersForm from './forms/FindUsersForm';
import { TimePicker } from 'antd';
import moment from 'moment';
import DriverAvailabilityForm from './forms/DriverAvailabilityForm';
import VerifyRideForm from './forms/VerifyRideForm';
import { connect } from 'react-redux';
import { createRide } from '../model/rides';

const NoOp = () => {};

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Card = styled.div`
  position: relative;
  overflow: hidden;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 1000;
`;
const CardHeader = styled.div`
  display: flex;
  padding: 20px;
`;
const Flex = styled.div`
  display: flex;
  height: 70%;
`;
const Flex1 = styled.div`
  flex: 1;
  padding: 20px;
  height: 100%;
  :last-of-type {
    border-left: 1px solid #000;
  }
`;
const Button = styled.div`
  flex: 1;
  user-select: none;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  border-radius: 30px;
  border: none;
  background-color: ${props => (props.active ? '#0070D2' : '#e0e5ee')};
  color: ${props => (props.active ? 'white' : 'black')};
  margin-left: 10px;
`;

const UserForms = ({ onUserChanged }) => (
  <Flex>
    <Flex1>
      <h3>Find Passenger</h3>
      <FindUsersForm didPickUser={onUserChanged} />
    </Flex1>
    <Flex1>
      <h3>Create Passenger</h3>
      <CreateUserForm />
    </Flex1>
  </Flex>
);

const RenderForm = ({ step, query, push, onChange }) => {
  switch (step) {
    case 1:
      return (
        <UserForms onUserChanged={passengerID => onChange({ passengerID })} />
      );
    case 2:
      return (
        <DriverAvailabilityForm
          onChange={({ apptStart, apptEnd, driverID }) =>
            onChange({ ...query, apptStart, apptEnd, driverID })
          }
        />
      );
    case 3:
      return (
        <GoogleRoutesForm
          onRouteChanged={({ origin, destination }) => {
            onChange({ ...query, origin, destination });
          }}
        />
      );
    case 4:
      return <VerifyRideForm onVerified={() => push('/')} {...query} />;
    default:
      return null;
  }
};

class CreateRide extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.overlayContainer = document.createElement('div');
    document.body.appendChild(this.overlayContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.overlayContainer);
  }

  render() {
    const {
      location,
      step,
      history,
      createRide,
      onModalClick = NoOp
    } = this.props;
    const {
      passengerID,
      origin,
      destination,
      driverID,
      start,
      end
    } = this.state;
    let completedSteps = 0;
    if (passengerID) {
      completedSteps = 1;
    }
    if (driverID && start && end) {
      completedSteps = 2;
    }
    if (origin && destination) {
      completedSteps = 3;
    }

    return ReactDOM.createPortal(
      <ModalBackground onClick={onModalClick}>
        <Card onClick={e => e.stopPropagation()}>
          <CardHeader>
            <Breadcrumb style={{ flex: 4 }}>
              <Crumb done={step > 1} active={step === 1}>
                User
              </Crumb>
              <Crumb done={step > 2} active={step === 2}>
                Date & Time
              </Crumb>
              <Crumb done={step > 3} active={step === 3}>
                Route
              </Crumb>
              <Crumb done={step > 4} active={step === 4}>
                Verify
              </Crumb>
            </Breadcrumb>
            <Button
              onClick={() => {
                if (step === 4) {
                  console.log(parse(location.search));
                  debugger;
                  createRide(parse(location.search));
                  history.push('/');
                } else {
                  this.setState({}, () =>
                    history.push(`/create/${step + 1}?${queryify(this.state)}`)
                  );
                }
              }}
              active={step <= completedSteps || step === 4}
            >
              {step === 4 ? 'Create Ride' : 'Next'}
            </Button>
          </CardHeader>
          <RenderForm
            style={{ position: 'relative' }}
            step={step}
            query={parse(location.search)}
            push={url => this.props.history.push(url)}
            onChange={payload => {
              this.setState({ ...payload });
            }}
          />
        </Card>
      </ModalBackground>,
      this.overlayContainer
    );
  }
}

export default withRouter(
  connect(
    ({ users }) => ({
      users: users.byId
    }),
    dispatch => ({
      createRide: (...args) => dispatch(createRide(...args))
    })
  )(CreateRide)
);
