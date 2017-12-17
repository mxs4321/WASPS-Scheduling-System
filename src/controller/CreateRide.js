import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Breadcrumb from '../view/Breadcrumb';
import CreateUserForm from '../view/forms/CreateUserForm';

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

export default class CreateRide extends Component {
  constructor(props) {
    super(props);
    this.overlayContainer = document.createElement('div');
    document.body.appendChild(this.overlayContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.overlayContainer);
  }

  render() {
    const { onModalClick = NoOp } = this.props;
    return ReactDOM.createPortal(
      <ModalBackground onClick={onModalClick}>
        <Card onClick={e => e.stopPropagation()}>
          <CardHeader>
            <Breadcrumb style={{ flex: 4 }}>
              <li>Select User</li>
              <li>Enter Address</li>
              <li>Assign Driver</li>
              <li>Verify ride</li>
            </Breadcrumb>
            <Button style={{ flex: 1 }}>Next</Button>
          </CardHeader>
          <Flex>
            <Flex1>
              <h3>Find User</h3>
            </Flex1>
            <Flex1>
              <h3>Create User</h3>
              <CreateUserForm />
            </Flex1>
          </Flex>
        </Card>
      </ModalBackground>,
      this.overlayContainer
    );
  }
}
