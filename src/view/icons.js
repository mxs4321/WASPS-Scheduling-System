import React from 'react';

export const Help = ({ size = '24', color = '#EB5757' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
  </svg>
);

export const Warning = ({ size = '24', color = '#F2994A' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

export const Scheduled = ({ size = '24', color = '#6FCF97' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Complete = ({ size = '24', color = '#27AE60' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);

export const Canceled = ({ size = '24', color = '#828282' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

export const Schedule = ({ size = '24', color = '#EE7A35' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z" />
  </svg>
);

export const Car = ({ size = '24', color = '#4688F1' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

export const Group = ({ size = '24', color = '#1D9C5A' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export const Timer = ({ size = '24', color = '#27AE60' }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);
