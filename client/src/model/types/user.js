// @flow
export type UserRole = 'admin' | 'driver' | 'dispatcher' | 'passanger';

export type User = {
  id: string,
  userRole: UserRole,
  firstName: string,
  lastName: string,
  phone: string,
  email: stirng,
  registered: Date,
  lastLogin: boolean,
  wantsSMS: boolean,
  wantsEmails: boolean
};
