import React from 'react';

export const Help = ({ size = '24', color = '#EB5757', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
  </svg>
);

export const Warning = ({ size = '24', color = '#F2994A', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

export const Scheduled = ({ size = '24', color = '#6FCF97', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Complete = ({ size = '24', color = '#27AE60', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);

export const Canceled = ({ size = '24', color = '#828282', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Schedule = ({ size = '24', color = '#EE7A35', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z" />
  </svg>
);

export const Car = ({ size = '24', color = '#4688F1', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

export const Group = ({ size = '24', color = '#1D9C5A', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export const Timer = ({ size = '24', color = '#27AE60', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

export const Menu = ({ size = '24', color = '#fff', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export const Add = ({ size = '24', color = '#fff', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Search = ({ size = '24', color = '#fff', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Close = ({ size = '24', color = '#000', ...args }) => (
  <svg fill={color} viewBox="0 0 24 24" width={size} height={size} {...args}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Settings = ({ size = '25', color = '#ffffff', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);

export const Logout = ({ size = '25', color = '#ffffff', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

export const User = ({ size = '35', color = '#004d99', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size} {...args}>
    <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Destination = ({ size = '30', color = '#808080', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size} {...args}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Calendar = ({ size = '24', color = '#808080', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size} {...args}>
    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Phone = ({ size = '30', color = '#808080', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

export const Vertical = ({ size = '30', color = '#808080', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size} {...args}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export const BarChart = ({ size = '24', color = '#808080', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const Download = ({ size = '24', color = '#808080', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const AccessAlarm = ({ size = '24', color = '#808080', ...args }) => (
  <svg fill={color} height={size} viewBox="0 0 24 24" width={size}>
    <path d="M-618-568H782v3600H-618zM0 0h24v24H0z" fill="none" />
    <path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />
  </svg>
);
