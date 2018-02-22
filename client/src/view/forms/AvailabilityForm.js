import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AvailabilityInput from '../AvailabilityInput';
import TimePicker from '../TimePicker';
import { Close } from '../../view/icons';
import InputBox from '../../view/InputBox';
import {
  fetchDriverAvailability,
  updateDriverAvailability,
  createDriverAvailability,
  deleteDriverAvailability
} from '../../model/availability';

const Flex = styled.div`
  display: Flex;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  border-radius: 4px;
  color: #4396e3;
  :hover {
    background: #fafafa;
  }
`;
const Input = styled.input`
  display: block;
  width: 160px;
  height: 30px;
  font-size: 16px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  margin-bottom: 5px;
  margin: 4px;
`;
const Padding = styled.div`
  margin: 20px 0 20px 20px;
`;

export class AvaliabilityForm extends Component {
  componentDidMount() {
    this.props.fetchDriverAvailability();
  }

  render() {
    const {
      availabilities = [],
      driverID,
      onSubmit,
      updateDriverAvailability,
      createDriverAvailability,
      deleteDriverAvailability
    } = this.props;
    return (
      <Fragment>
        {availabilities.map(availability => (
          <Fragment>
            <Flex>
              <Padding>
                <AvailabilityInput
                  days={availability.days.split(',')}
                  onChange={days => {
                    updateDriverAvailability({
                      ...availability,
                      days: days.join(',')
                    });
                  }}
                />
                <Flex>
                  <Input
                    value={availability.start}
                    onChange={({ target }) => {
                      updateDriverAvailability({
                        ...availability,
                        start: target.value
                      });
                    }}
                  />
                  <Input
                    value={availability.end}
                    onChange={({ target }) => {
                      updateDriverAvailability({
                        ...availability,
                        end: target.value
                      });
                    }}
                  />
                </Flex>
              </Padding>
              <Close
                onClick={() => {
                  deleteDriverAvailability(availability);
                }}
              />
            </Flex>
          </Fragment>
        ))}
        <Button
          onClick={() =>
            createDriverAvailability({
              driverID,
              days: 'Mon,Tue,Wed,Thu,Fri',
              start: '09:00:00',
              end: '05:00:00'
            })
          }
        >
          ADD ANOTHER SET OF DAYS
        </Button>
      </Fragment>
    );
  }
}

export default connect(
  ({ availability, auth }) => ({
    availabilities: Object.values(availability.byId).filter(
      ({ driverID }) => driverID === auth.user.id
    ),
    driverID: auth.user.id
  }),
  dispatch => ({
    fetchDriverAvailability: () => dispatch(fetchDriverAvailability()),
    updateDriverAvailability: availability =>
      dispatch(updateDriverAvailability(availability)),
    createDriverAvailability: availability =>
      dispatch(createDriverAvailability(availability)),
    deleteDriverAvailability: availability =>
      dispatch(deleteDriverAvailability(availability))
  })
)(AvaliabilityForm);
