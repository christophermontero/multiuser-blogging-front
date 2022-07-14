import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCategories } from '../actions/category';
import { getTags } from '../actions/tag';
import Editor from './Editor';

const CreateBlog = ({ router }) => {
  const blogLocalStore = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState(blogLocalStore());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });

  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    initCategories();
    initTags();
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.append(name, value);
    setValues({
      ...values,
      [name]: value,
      formData,
      error: ''
    });
  };

  const handleBody = (data) => {
    formData.append('body', data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(data));
    }
    setBody(data);
  };

  const publishBlog = (e) => {
    e.preventDefault();
    console.log('ready to publish');
  };

  const showCategories = categories && (
    <ul
      className="list-unstyled"
      style={{ maxHeight: '200px', overflow: 'scroll' }}
    >
      {categories.map((category, i) => {
        return (
          <li key={i}>
            <input className="form-check-input me-2" type="checkbox" />
            <label className="form-check-label">{category.name}</label>
          </li>
        );
      })}
    </ul>
  );

  const showTags = tags && (
    <ul
      className="list-unstyled"
      style={{ maxHeight: '200px', overflow: 'scroll' }}
    >
      {tags.map((tag, i) => {
        return (
          <li key={i}>
            <input className="form-check-input me-2" type="checkbox" />
            <label className="form-check-label">{tag.name}</label>
          </li>
        );
      })}
    </ul>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group mb-2">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group mb-2">
          <Editor
            value={body}
            onChange={handleBody}
            editorLoaded={editorLoaded}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">{createBlogForm()}</div>
        <div className="col-md-4">
          <h3>Categories</h3>
          <hr />
          {showCategories}
          <h3>Tags</h3>
          <hr />
          {showTags}
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
