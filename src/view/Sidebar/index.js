import React from 'react';
import Navigation from './Navigation';
import StatusFilter from './StatusFilter';
import type { Status } from './StatusFilter';

type Props = {
  /** Should the sidebar show tabs accociated with drivers */
  isDriver: boolean,
  /** Should the sidebar show tabs accociated with dispatchers */
  isDispatcher: boolean,
  /** Filter to apply to the status */
  status?: Status
};
const Sidebar = ({ isDriver = false, isDispatcher = false, status }: Props) => (
  <div>
    <Navigation isDispatcher={isDispatcher} isDriver={isDriver} />
    <StatusFilter
      isDispatcher={isDispatcher}
      isDriver={isDriver}
      status={status}
    />
  </div>
);

export default Sidebar;
