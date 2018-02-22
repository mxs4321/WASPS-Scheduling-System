import 'whatwg-fetch';

export const getJSON = url =>
  fetch(url, { credentials: 'same-origin' }).then(res => res.json());

export const postJSON = (url, body) =>
  fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());

export const putJSON = (url, body) =>
  fetch(url, {
    credentials: 'same-origin',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());

export const deleteJSON = (url, body) =>
  fetch(url, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
