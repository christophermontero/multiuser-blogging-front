import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';

export const ReadBlog = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  const loadBlogs = () => {
    list(username)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setBlogs(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBlog = (slug) => {
    const answer = window.confirm('Are you sure you want to delete your blog?');
    if (answer) {
      removeBlog(slug, token)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setMessage(data.message);
            loadBlogs();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && !isAuth().role) {
      return (
        <Link href={`/user/blogs/${blog.slug}`}>
          <a className="btn btn-sm btn-warning mx-2">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/blogs/${blog.slug}`}>
          <a className="btn btn-sm btn-warning mx-2">Update</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () =>
    blogs.map((blog, i) => (
      <div key={i} className="pb-5">
        <h3>{blog.title}</h3>
        <p className="mark">
          Written by {blog.postedBy.name} | Published on{' '}
          {moment(blog.updatedAt).fromNow()}
        </p>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteBlog(blog.slug)}
        >
          Delete
        </button>
        {showUpdateButton(blog)}
      </div>
    ));

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </>
  );
};

export default ReadBlog;
