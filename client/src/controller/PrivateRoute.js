import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ user, allowedRoles, ...args }) => {
  if (allowedRoles.includes(user.userRole)) {
    return <Route {...args} />;
  }
  return null;
};

export default connect(({ auth, app }) => ({
  user: auth.user
}))(PrivateRoute);
