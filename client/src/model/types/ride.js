// @flow
export type RideStatus =
  | 'Unverified'
  | 'Pending'
  | 'Scheduled'
  | 'Complete'
  | 'Canceled';

export type Ride = {
  id: number,
  userID: number,
  driverID: number,
  apptStart: string,
  apptEnd: string,
  numMiles: number,
  totalMinutes: number,
  pickupTime: string,
  wheelchairVan: boolean,
  status: RideStatus,
  pickupStreetAddress: string,
  pickupCity: string,
  apptStreetAddress: string,
  apptCity: string,
  created: string,
  modified: string
};
