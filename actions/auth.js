import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const signup = (user) => {
  const fetchOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  console.log(fetchOpt.body);
  return fetch(`${API}/auth/signup`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
