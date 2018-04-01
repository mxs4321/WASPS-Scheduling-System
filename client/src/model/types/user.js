// @flow
export type UserRole = 'admin' | 'driver' | 'dispatcher' | 'passanger';

export type User = {
  id: string,
  role: UserRole,
  firstName: string,
  lastName: string,
  phone: string,
  email: stirng,
  registered: Date
};
