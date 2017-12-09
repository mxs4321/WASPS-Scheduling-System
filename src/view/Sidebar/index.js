import React from 'react';
import Navigation from './Navigation';
import StatusFilter from './StatusFilter';
import type { Status } from './StatusFilter';

type Props = {
  isDriver: boolean,
  isDispatcher: boolean,
  status: Status
};

export default ({ isDriver = false, isDispatcher = false, status }: Props) => (
  <div>
    <Navigation isDispatcher={isDispatcher} isDriver={isDriver} />
    <StatusFilter
      isDispatcher={isDispatcher}
      isDriver={isDriver}
      status={status}
    />
  </div>
);
