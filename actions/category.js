import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

export const createCategory = (category, token) => {
  const fetchOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  };
  return fetch(`${API}/category`, fetchOpt)
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  const fetchOpt = {
    method: 'GET'
  };
  return fetch(`${API}/category`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeCategory = (slug, token) => {
  const fetchOpt = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(`${API}/category/${slug}`, fetchOpt)
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleCategory = (slug) => {
  const fetchOpt = {
    method: 'GET'
  };
  return fetch(`${API}/category/${slug}`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
