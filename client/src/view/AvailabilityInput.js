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

class AvailabilityInput extends Component {
  state = {
    sunday: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false
  };
  render() {
    const { onChange = NoOp } = this.props;
    return (
      <Flex>
        <DayOfTheWeekBox
          selected={this.state.sunday}
          onClick={() =>
            this.setState(
              ({ sunday }) => ({ sunday: !sunday }),
              () => onChange(this.state)
            )
          }
        >
          SUN
        </DayOfTheWeekBox>
        <DayOfTheWeekBox
          selected={this.state.monday}
          onClick={() =>
            this.setState(
              ({ monday }) => ({ monday: !monday }),
              () => onChange(this.state)
            )
          }
        >
          MON
        </DayOfTheWeekBox>
        <DayOfTheWeekBox
          selected={this.state.tuesday}
          onClick={() =>
            this.setState(
              ({ tuesday }) => ({ tuesday: !tuesday }),
              () => onChange(this.state)
            )
          }
        >
          TUE
        </DayOfTheWeekBox>
        <DayOfTheWeekBox
          selected={this.state.wednesday}
          onClick={() =>
            this.setState(
              ({ wednesday }) => ({ wednesday: !wednesday }),
              () => onChange(this.state)
            )
          }
        >
          WED
        </DayOfTheWeekBox>
        <DayOfTheWeekBox
          selected={this.state.thursday}
          onClick={() =>
            this.setState(
              ({ thursday }) => ({ thursday: !thursday }),
              () => onChange(this.state)
            )
          }
        >
          THU
        </DayOfTheWeekBox>
        <DayOfTheWeekBox
          selected={this.state.friday}
          onClick={() =>
            this.setState(
              ({ friday }) => ({ friday: !friday }),
              () => onChange(this.state)
            )
          }
        >
          FRI
        </DayOfTheWeekBox>
        <DayOfTheWeekBox
          selected={this.state.saturday}
          onClick={() =>
            this.setState(
              ({ saturday }) => ({ saturday: !saturday }),
              () => onChange(this.state)
            )
          }
        >
          SAT
        </DayOfTheWeekBox>
      </Flex>
    );
  }
}

export default AvailabilityInput;
