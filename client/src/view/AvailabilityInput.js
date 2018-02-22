//@flow
import React, { Component } from 'react';
import styled from 'styled-components';

const NoOp = () => {};

const DayOfTheWeekBox = styled.div`
  padding: 10px;
  font-weight: 200;
  margin: 5px;
  text-align: center;
  background-color: ${props => (props.selected ? '#4396E3' : '#F5F5F5')};
  color: ${props => (props.selected ? 'white' : 'black')};
  user-select: none;
`;

const Flex = styled.div`
  display: flex;
`;

const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class AvailabilityInput extends Component {
  render() {
    const { days = [], onChange = NoOp } = this.props;
    return (
      <Flex>
        {daysOfTheWeek.map((day, i) => (
          <DayOfTheWeekBox
            key={i}
            selected={days.includes(day)}
            onClick={() => {
              if (days.includes(day)) {
                onChange(days.filter(_day => _day !== day));
              } else {
                onChange(
                  daysOfTheWeek.filter(_day => [...days, day].includes(_day))
                );
              }
            }}
          >
            {day}
          </DayOfTheWeekBox>
        ))}
      </Flex>
    );
  }
}

export default AvailabilityInput;
