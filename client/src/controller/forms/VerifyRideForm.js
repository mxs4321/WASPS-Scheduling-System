import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createRide } from '../../model/rides';
import styled from 'styled-components';
import Avatar from '../../view/Avatar';
import { Calendar } from '../../view/icons';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;
const Flex = styled.div`
  display: flex;
`;
const Margin = styled.div`
  margin: 10px;
  width: 320px;
  height: 100%;
`;

const User = ({
  user = { firstName: 'N', lastName: 'A', role: 'passenger' }
}) => (
  <Flex>
    <Avatar size={34} name={`${user.firstName} ${user.lastName}`} />
    <p>
      {user.role}
      <br />
      {user.firstName} {user.lastName}
    </p>
  </Flex>
);

const VerifyRideForm = ({
  origin,
  destination,
  apptStart,
  apptEnd,
  driverID,
  passengerID,
  createRide,
  onVerified,
  users,
  apiKey = window.REACT_APP_PLACES_API_KEY
}) => {
  const directionIframe = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
  return (
    <Fragment>
      <Wrapper>
        <Margin>
          <Flex>
            <Calendar />
            <p>
              <b>Appointment Start:</b>
              <br />
              {apptStart}
            </p>
          </Flex>
          <Flex>
            <Calendar />
            <p>
              <b>Appointment End:</b>
              <br />
              {apptEnd}
            </p>
          </Flex>
          <User user={users[driverID]} />
          <User user={users[passengerID]} />
        </Margin>
        <iframe
          title="directions"
          frameborder="0"
          src={directionIframe}
          allowfullscreen
        />
      </Wrapper>
    </Fragment>
  );
};
export default connect(
  ({ users }) => ({
    users: users.byId
  }),
  dispatch => ({
    createRide: (...args) => dispatch(createRide(...args))
  })
)(VerifyRideForm);
