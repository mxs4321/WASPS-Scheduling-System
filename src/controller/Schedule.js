import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const Card = styled.div`
  position: relative;
  top: 5%;
  left: 5%;
  width: 80%;
  height: 80%;
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

BigCalendar.momentLocalizer(moment);
class Schedule extends Component {
  render() {
    return (
      <Card>
        <BigCalendar
          startAccessor="start"
          endAccessor="end"
          events={[
            {
              title: 'All Day Event very long title',
              allDay: true,
              start: new Date(2017, 11, 11),
              end: new Date(2017, 11, 11)
            },
            {
              title: 'Long Event',
              start: new Date(2017, 11, 11, 2, 45, 0),
              end: new Date(2017, 11, 11, 3, 0, 0)
            }
          ]}
        />
      </Card>
    );
  }
}

export default Schedule;
