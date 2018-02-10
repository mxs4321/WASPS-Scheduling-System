import 'whatwg-fetch';

export const getJSON = url => fetch(url).then(res => res.json());

export const postJSON = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());

export const deleteJSON = (url, body) =>
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
