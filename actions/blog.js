import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { handleResponse, isAuth } from './auth';

export const createBlog = (blog, token) => {
  let buildBlogEndpoint;
  const fetchOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  };

  if (isAuth() && isAuth().role === 1) {
    buildBlogEndpoint = `${API}/blog`;
  } else if (isAuth() && !isAuth().role) {
    buildBlogEndpoint = `${API}/user/blog`;
  }

  return fetch(buildBlogEndpoint, fetchOpt)
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip
  };
  return fetch(`${API}/blog/categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'GET'
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelatedBlogs = (blog, limit) => {
  return fetch(`${API}/blog/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // send the blog id and limit to the backend
    body: JSON.stringify({ blog, limit })
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (username) => {
  let buildBlogEndpoint;

  if (username) {
    buildBlogEndpoint = `${API}/blog/${username}/blogs`;
  } else {
    buildBlogEndpoint = `${API}/blogs`;
  }

  return fetch(buildBlogEndpoint, {
    method: 'GET'
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
  let buildBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    buildBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && !isAuth().role) {
    buildBlogEndpoint = `${API}/user/blog/${slug}`;
  }

  return fetch(buildBlogEndpoint, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let buildBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    buildBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && !isAuth().role) {
    buildBlogEndpoint = `${API}/user/blog/${slug}`;
  }

  return fetch(buildBlogEndpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  const query = queryString.stringify(params);
  return fetch(`${API}/blog/search?${query}`, {
    method: 'GET'
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
