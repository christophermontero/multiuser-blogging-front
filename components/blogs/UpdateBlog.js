import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { singleBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import Editor from '../Editor';

const UpdateBlog = ({ router }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [body, setBody] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCat, setCheckedCat] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);
  const [values, setValues] = useState({
    error: '',
    formData: '',
    title: ''
  });

  const { title, photo } = values;

  useEffect(() => {
    setEditorLoaded(true);
    initBlog();
    initCategories();
    initTags();
    setValues({ ...values, formData: new FormData() });
  }, [editorLoaded, router]);

  const handleBody = (e) => {
    setBody(e);
    values.formData.set('body', e);
  };

  const editBlog = (e) => {
    console.log('update blog');
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    values.formData.append(name, value);
    setValues({
      ...values,
      [name]: value,
      formData,
      error: ''
    });
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group mb-2">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group mb-2 ckeditor">
          <Editor
            value={body}
            onChange={handleBody}
            editorLoaded={editorLoaded}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    );
  };

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    const categories = [];
    blogCategories.map((category) => {
      categories.push(category._id);
    });
    setCheckedCat(categories);
  };

  const setTagsArray = (blogTags) => {
    const tags = [];
    blogTags.map((tag) => {
      tags.push(tag._id);
    });
    setCheckedTag(tags);
  };

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

  const handleCatToggle = (category) => () => {
    const clickedCategory = checkedCat.indexOf(category);
    const allCategories = [...checkedCat];
    if (clickedCategory === -1) {
      allCategories.push(category);
    } else {
      allCategories.splice(clickedCategory, 1);
    }
    values.formData.append('categories', allCategories);
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
    values.formData.append('tags', allTags);
    setValues({ ...values, error: '' });
    setCheckedTag(allTags);
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
              checked={checkedCat.indexOf(category._id) !== -1}
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
              checked={checkedTag.indexOf(tag._id) !== -1}
              className="form-check-input me-2"
              type="checkbox"
            />
            <label className="form-check-label">{tag.name}</label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="container-fluid pb-2">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">
            <p>Show success and error msg</p>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />
              <div>
                <label className="btn btn-outline-info me-2">
                  Upload featured image
                  <input
                    onChange={handleChange('photo')}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </label>
                {photo ? (
                  <div className="p-1">
                    <small className="text-muted">{photo.name}</small>
                  </div>
                ) : (
                  <div className="p-1">
                    <small className="text-muted">Max size: 1 Mb</small>
                  </div>
                )}
              </div>
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
    </div>
  );
};

export default withRouter(UpdateBlog);
