import React from 'react';
import { storiesOf } from '@storybook/react';

import Sidebar from '../view/Sidebar';
import Avatar from '../view/Avatar';

storiesOf('Sidebar', module)
  .add('Dispatcher', () => <Sidebar isDispatcher={true} />)
  .add('Driver', () => <Sidebar isDriver={true} />)
  .add('Passanger', () => <Sidebar />);

storiesOf('avatar', module)
  .add('Brett Lamy', () => <Avatar name="Brett Lamy" />)
  .add('foo bar', () => <Avatar name="foo bar" />)
  .add('NT', () => <Avatar name="NT" />)
  .add('MM', () => <Avatar name="MM" />);
