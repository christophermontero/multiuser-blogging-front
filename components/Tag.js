import { useEffect, useState } from 'react';
import { getCookie } from '../actions/auth';

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log('Load tags', data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((tag, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(tag.name)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary my-2 me-1"
        >
          {tag.name}
        </button>
      );
    });
  };

  const deleteConfirm = (name) => {
    let answer = window.confirm('Are you sure you want to delete this tag?');
    if (answer) deleteTag(name);
  };

  const deleteTag = (name) => {
    removeTag(name, token).then((data) => {
      if (data.error) {
        console.log('Delete tag', data.error);
      } else {
        setValues({
          ...values,
          name: '',
          removed: true,
          reload: !reload
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    createTag({ name }, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error
        });
      } else {
        setValues({
          ...values,
          name: '',
          success: true,
          reload: !reload
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value
    });
  };

  const showSuccess = () => {
    if (success) return <p className="text-success">Tag was created</p>;
  };

  const showError = () => {
    if (error) return <p className="text-danger">Tag already exists</p>;
  };

  const showRemoved = () => {
    if (removed) return <p className="text-danger">Tag was removed</p>;
  };

  const mouseMoveHandler = () => {
    setValues({ ...values, error: false, success: false, removed: false });
  };

  const newTagForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted mb-2">Name</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            value={name}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Create
        </button>
      </form>
    );
  };

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </>
  );
};

export default Tag;
