import React from 'react';
import { storiesOf } from '@storybook/react';

import StatusFilter from '../view/StatusFilter';
import Avatar from '../view/Avatar';

storiesOf('Status Filter', module).add('Basic', () => <StatusFilter />);

storiesOf('avatar', module)
  .add('Brett Lamy', () => <Avatar name="Brett Lamy" />)
  .add('Gabby ODell', () => <Avatar name="Gabby ODell" />)
  .add('NT', () => <Avatar name="NT" />)
  .add('MM', () => <Avatar name="MM" />);
