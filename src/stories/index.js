import React from 'react';
import { storiesOf } from '@storybook/react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Sidebar from '../view/Sidebar';
import Avatar from '../view/Avatar';
import Toolbar from '../view/Toolbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

storiesOf('Sidebar', module)
  .add('Dispatcher', () => <Sidebar isDispatcher={true} />)
  .add('Driver', () => <Sidebar isDriver={true} />)
  .add('Passanger', () => <Sidebar />);

storiesOf('Avatar', module)
  .add('Example', () => <Avatar name="Brett Lamy" />)
  .add('Small', () => <Avatar name="NT" size={24} />)
  .add('Extra Small', () => <Avatar name="MM" size={16} />)
  .add('Large', () => <Avatar name="MM" size={56} />);

storiesOf('Toolbar', module)
  .add('Dispatcher', () => <Toolbar isDispatcher={true} />)
  .add('Driver', () => <Toolbar isDriver={true} />)
  .add('Passanger', () => <Toolbar />);

storiesOf('Calendar', module).add('Basic', () => (
  <BigCalendar
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
      },
      {
        title: 'DTS STARTS',
        start: new Date(2017, 2, 13, 0, 0, 0),
        end: new Date(2017, 2, 20, 0, 0, 0)
      },

      {
        title: 'DTS ENDS',
        start: new Date(2017, 10, 6, 0, 0, 0),
        end: new Date(2017, 10, 13, 0, 0, 0)
      },

      {
        title: 'Some Event',
        start: new Date(2017, 3, 9, 0, 0, 0),
        end: new Date(2017, 3, 9, 0, 0, 0)
      },
      {
        title: 'Conference',
        start: new Date(2017, 3, 11),
        end: new Date(2017, 3, 13),
        desc: 'Big conference for important people'
      },
      {
        title: 'Meeting',
        start: new Date(2017, 3, 12, 10, 30, 0, 0),
        end: new Date(2017, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
      }
    ]}
    startAccessor="start"
    endAccessor="end"
  />
));
