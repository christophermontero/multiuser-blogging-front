import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Router from 'next/router';
import { API } from '../config';

export const handleResponse = (response) => {
  if (response.status === 401) {
    signout(() =>
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session is expired. Please signin again.'
        }
      })
    );
  } else {
    return;
  }
};

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

export const signout = (next) => {
  const token = getCookie('token');
  removeCookie('token');
  removeLocalStorage('user');
  next();
  return fetch(`${API}/auth/signout`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      console.log('Signout success!');
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
    return cookie.get(key);
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

export const updateUser = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'));
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth));
      next();
    }
  }
};

export const forgotPassword = (email) => {
  const fetchOpt = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  };
  return fetch(`${API}/auth/forgot-password`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (resetPayload) => {
  const fetchOpt = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetPayload)
  };
  return fetch(`${API}/auth/reset-password`, fetchOpt)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
