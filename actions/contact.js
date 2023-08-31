import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const sendContactForm = (emailPayload) => {
  let buildEmailEndpoint;
  const fetchOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(emailPayload)
  };

  if (emailPayload.authorEmail) {
    buildEmailEndpoint = `${API}/contact/author`;
  } else {
    buildEmailEndpoint = `${API}/contact`;
  }

  return fetch(buildEmailEndpoint, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
