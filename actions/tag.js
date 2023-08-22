import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

export const createTag = (tag, token) => {
  const fetchOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tag)
  };
  return fetch(`${API}/tag`, fetchOpt)
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getTags = () => {
  const fetchOpt = {
    method: 'GET'
  };
  return fetch(`${API}/tag`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeTag = (name, token) => {
  const fetchOpt = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${API}/tag/${name}`, fetchOpt)
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleTag = (name) => {
  const fetchOpt = {
    method: 'GET'
  };
  return fetch(`${API}/tag/${name}`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
