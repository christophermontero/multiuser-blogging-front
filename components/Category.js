import { useEffect, useState } from 'react';
import { getCookie } from '../actions/auth';
import {
  createCategory,
  getCategories,
  removeCategory
} from '../actions/category';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error
        });
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((category, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(category.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary my-2 me-1"
        >
          {category.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (answer) deleteCategory(slug);
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error
          });
        } else {
          setValues({
            ...values,
            name: '',
            removed: true,
            reload: !reload
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, token)
      .then((data) => {
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
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value
    });
  };

  const showSuccess = () => {
    if (success) return <p className="text-success">Category was created</p>;
  };

  const showError = () => {
    if (error) return <p className="text-danger">Category already exists</p>;
  };

  const showRemoved = () => {
    if (removed) return <p className="text-danger">Category was removed</p>;
  };

  const mouseMoveHandler = () => {
    setValues({ ...values, error: false, success: false, removed: false });
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted mb-2">Category name</label>
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
        {newCategoryForm()}
        {showCategories()}
      </div>
    </>
  );
};

export default Category;
