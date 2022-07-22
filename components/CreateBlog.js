import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie } from '../actions/auth';
import { createBlog } from '../actions/blog';
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
  const [checkedCat, setCheckedCat] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });

  const token = getCookie('token');
  const { error, sizeError, success, formData, title, hidePublishButton } =
    values;

  useEffect(() => {
    setEditorLoaded(true);
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

  const handleCatToggle = (category) => () => {
    const clickedCategory = checkedCat.indexOf(category);
    const allCategories = [...checkedCat];
    if (clickedCategory === -1) {
      allCategories.push(category);
    } else {
      allCategories.splice(clickedCategory, 1);
    }
    formData.append('categories', allCategories);
    setValues({ ...values, error: '' });
    setCheckedCat(allCategories);
  };

  const handleTagToggle = (tag) => () => {
    const clickedTag = checkedTag.indexOf(tag);
    const allTags = [...checkedTag];
    if (clickedTag === -1) {
      allTags.push(tag);
    } else {
      allTags.splice(clickedTag, 1);
    }
    formData.append('tags', allTags);
    setValues({ ...values, error: '' });
    setCheckedTag(allTags);
  };

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error
        });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled ${data.title} was created`
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
  };

  const showCategories = categories && (
    <ul
      className="list-unstyled px-1"
      style={{ maxHeight: '200px', overflow: 'scroll' }}
    >
      {categories.map((category, i) => {
        return (
          <li key={i}>
            <input
              onChange={handleCatToggle(category._id)}
              className="form-check-input me-2"
              type="checkbox"
            />
            <label className="form-check-label">{category.name}</label>
          </li>
        );
      })}
    </ul>
  );

  const showTags = tags && (
    <ul
      className="list-unstyled px-1"
      style={{ maxHeight: '200px', overflow: 'scroll' }}
    >
      {tags.map((tag, i) => {
        return (
          <li key={i}>
            <input
              onChange={handleTagToggle(tag._id)}
              className="form-check-input me-2"
              type="checkbox"
            />
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
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />
              <label className="btn btn-outline-info me-2">
                Upload featured image
                <input
                  onChange={handleChange('photo')}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
              <small className="text-muted">Max size: 1 Mb</small>
            </div>
          </div>
          <h3>Categories</h3>
          <hr />
          {showCategories}
          <h3>Tags</h3>
          <hr />
          {showTags}
        </div>
      </div>
      {JSON.stringify(categories)}
      {JSON.stringify(tags)}
    </div>
  );
};

export default withRouter(CreateBlog);
