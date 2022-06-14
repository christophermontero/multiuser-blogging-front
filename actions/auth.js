import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie';

export const signup = (user) => {
  const fetchOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  return fetch(`${API}/auth/signup`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const fetchOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  return fetch(`${API}/auth/signin`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const setCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== 'undefined') {
    cookie.get(key);
  }
};

export const removeCookie = (key) => {
  if (typeof window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  next();
};

export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked && localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return false;
    }
  }
};
