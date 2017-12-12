import React from 'react';
import { storiesOf } from '@storybook/react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { withInfo } from '@storybook/addon-info';

import Sidebar from '../view/Sidebar';
import Avatar from '../view/Avatar';
import Toolbar from '../view/Toolbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

storiesOf('Sidebar', module)
  .addDecorator((story, context) =>
    withInfo(`
    A Sidebar which changes depending on user privileges. 
    `)(story)(context)
  )
  .add('Dispatcher', () => <Sidebar isDispatcher={true} />)
  .add('Driver', () => <Sidebar isDriver={true} />)
  .add('Passanger', () => <Sidebar />);

storiesOf('Avatar', module)
  .addDecorator((story, context) =>
    withInfo(`
    A Circle with Initials in the center used to identify users uniquely.
    `)(story)(context)
  )
  .add('Example', () => <Avatar name="Brett Lamy" />)
  .add('Small', () => <Avatar name="NT" size={24} />)
  .add('Extra Small', () => <Avatar name="MM" size={16} />)
  .add('Large', () => <Avatar name="MM" size={56} />);

storiesOf('Toolbar', module)
  .addDecorator((story, context) =>
    withInfo(`
    An AppBar which contains a search field, hamburger menu, title and avatar
    `)(story)(context)
  )
  .add('Dispatcher', () => <Toolbar isDispatcher={true} />)
  .add('Driver', () => <Toolbar isDriver={true} />)
  .add('Passanger', () => <Toolbar />);

storiesOf('Calendar', module)
  .addDecorator((story, context) =>
    withInfo(`
    Examples of react big cal
    `)(story)(context)
  )
  .add('Basic', () => (
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
        }
      ]}
      startAccessor="start"
      endAccessor="end"
    />
  ));
