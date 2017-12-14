import React from 'react';
import { storiesOf } from '@storybook/react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { withInfo } from '@storybook/addon-info';
import ExpansionPanel from 'material-expansion-panel';

import Navigation from '../view/Navigation';
import StatusFilter from '../view/StatusFilter';
import Avatar from '../view/Avatar';
import Toolbar from '../view/Toolbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'material-expansion-panel/dist/material-expansion-panel.min.css';

BigCalendar.momentLocalizer(moment);

storiesOf('Navigation', module)
  .addDecorator((story, context) =>
    withInfo(`
    A Sidebar which changes depending on user privileges. 
    `)(story)(context)
  )
  .add('Dispatcher', () => <Navigation isDispatcher={true} />)
  .add('Driver', () => <Navigation isDriver={true} />)
  .add('Passanger', () => <Navigation />);

storiesOf('StatusFilter', module)
  .addDecorator((story, context) =>
    withInfo(`
    A Sidebar which changes depending on user privileges. 
    `)(story)(context)
  )
  .add('Dispatcher', () => <StatusFilter isDispatcher={true} />)
  .add('Driver', () => <StatusFilter isDriver={true} />)
  .add('Passanger', () => <StatusFilter />);

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
  ));

var aIcons = [
  {
    icon: 'delete',
    callback: null,
    additionalParams: null
  }
];
var aButtons = [
  {
    buttonText: 'Save',
    callback: null,
    additionalParams: null
  },
  {
    buttonText: 'Cancel',
    callback: null,
    additionalParams: null,
    toggleExpand: true
  }
];

storiesOf('Expandable Card', module)
  .addDecorator((story, context) =>
    withInfo(`
    A Listview which expands on item click
    `)(story)(context)
  )
  .add('Single', () => (
    <ExpansionPanel
      title="Title"
      expandedTitle="Expanded Title"
      titleIcon="done_all"
      actionButtons={aButtons}
      actionIcons={aIcons}
    >
      <div>Example Content</div>
    </ExpansionPanel>
  ))
  .add('List', () => (
    <div>
      <ExpansionPanel
        titleIcon="done_all"
        title="Panel Title"
        expandedTitle="Expanded Panel Title"
      />
      <ExpansionPanel
        titleIcon="done_all"
        title="Panel Title"
        expandedTitle="Expanded Panel Title"
        actionButtons={aButtons}
        actionIcons={aIcons}
      >
        Content
      </ExpansionPanel>
      <ExpansionPanel
        titleIcon="done_all"
        title="Panel Title"
        expandedTitle="Expanded Panel Title"
      />
    </div>
  ));
