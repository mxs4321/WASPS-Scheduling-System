import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Breadcrumb, { Crumb } from '../view/Breadcrumb';
import CreateUserForm from '../view/forms/CreateUserForm';
import GoogleRoutesForm from '../view/forms/GoogleRoutesForm';
import Avatar from '../view/Avatar';

const NoOp = () => {};

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Card = styled.div`
  position: relative;
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
const Button = styled.button`
  border-radius: 30px;
  border: none;
  background-color: #e0e5ee;
  margin-left: 10px;
`;

const Step1 = () => (
  <Flex>
    <Flex1>
      <h3>Find User</h3>
    </Flex1>
    <Flex1>
      <h3>Create User</h3>
      <CreateUserForm />
    </Flex1>
  </Flex>
);

const Step2 = () => (
  <GoogleRoutesForm
    onOriginChanged={console.log.bind(console)}
    onDestinationChanged={console.log.bind(console)}
    onRouteChanged={console.log.bind(console)}
  />
);

const Step3 = () => (
  <ul>
    <li>
      <Avatar name="Brett Lamy" />Brett Lamy
    </li>
    <li>
      <Avatar name="Brett Lamy" />Brett Lamy
    </li>
    <li>
      <Avatar name="Brett Lamy" />Brett Lamy
    </li>
    <li>
      <Avatar name="Brett Lamy" />Brett Lamy
    </li>
  </ul>
);

export default class CreateRide extends Component {
  state = {
    step: 1
  };

  constructor(props) {
    super(props);
    this.overlayContainer = document.createElement('div');
    document.body.appendChild(this.overlayContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.overlayContainer);
  }

  renderStep = () => {
    switch (this.state.step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  render() {
    const { onModalClick = NoOp } = this.props;
    const { step } = this.state;
    debugger;
    return ReactDOM.createPortal(
      <ModalBackground onClick={onModalClick}>
        <Card onClick={e => e.stopPropagation()}>
          <CardHeader>
            <Breadcrumb style={{ flex: 4 }}>
              <Crumb done={step > 1} active={step === 1}>
                User
              </Crumb>
              <Crumb done={step > 2} active={step === 2}>
                Route
              </Crumb>
              <Crumb done={step > 3} active={step === 3}>
                Driver
              </Crumb>
              <Crumb done={step > 4} active={step === 4}>
                Verify
              </Crumb>
            </Breadcrumb>
            <Button
              style={{ flex: 1 }}
              onClick={() => this.setState(({ step }) => ({ step: step + 1 }))}
            >
              Next
            </Button>
          </CardHeader>
          {this.renderStep()}
        </Card>
      </ModalBackground>,
      this.overlayContainer
    );
  }
}
