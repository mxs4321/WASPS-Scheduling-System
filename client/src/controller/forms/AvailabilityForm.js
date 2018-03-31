import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AvailabilityInput from '../../view/AvailabilityInput';
import { Close } from '../../view/icons';
import {
  fetchDriverAvailability,
  updateDriverAvailability,
  createDriverAvailability,
  deleteDriverAvailability
} from '../../model/availability';
import { TimePicker } from 'antd';
import moment from 'moment';

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
                  <TimePicker
                    value={
                      availability.start
                        ? moment(availability.start, 'HH:mm')
                        : null
                    }
                    use12Hours
                    format="h:mm a"
                    onChange={startTime => {
                      if (startTime) {
                        updateDriverAvailability({
                          ...availability,
                          start: startTime.format('HH:mm')
                        });
                      }
                    }}
                  />
                  <TimePicker
                    value={
                      availability.end
                        ? moment(availability.end, 'HH:mm')
                        : null
                    }
                    use12Hours
                    format="h:mm a"
                    onChange={endTime => {
                      if (endTime) {
                        updateDriverAvailability({
                          ...availability,
                          end: endTime.format('HH:mm')
                        });
                      }
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
