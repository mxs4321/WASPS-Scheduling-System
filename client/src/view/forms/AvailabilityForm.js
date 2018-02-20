import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import AvailabilityInput from '../AvailabilityInput';
import TimePicker from '../TimePicker';

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

export class AvaliabilityForm extends Component {
  render() {
    const { availabilities = [], onSubmit, onChange } = this.props;
    return (
      <Fragment>
        {availabilities.map(availability => (
          <Fragment>
            <AvailabilityInput
              days={availability.days.split(',')}
              onChange={days => {
                onChange({
                  ...availability,
                  days: days.join(',')
                });
              }}
            />
            <Flex>
              <input value={availability.start} />
              <input value={availability.end} />
            </Flex>
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

export default AvaliabilityForm;
