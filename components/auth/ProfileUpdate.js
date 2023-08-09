import { useEffect, useState } from 'react';
import { getCookie } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: ''
  });

  const token = getCookie('token');
  const {
    username,
    name,
    email,
    password,
    about,
    error,
    success,
    loading,
    photo,
    userData
  } = values;

  const init = () =>
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.user.username,
          name: data.user.name,
          email: data.user.email,
          about: data.user.about
        });
      }
    });

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();

    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false
        });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          success: true,
          loading: false
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit} className="pe-4">
      <div className="form-group my-1">
        <label className="text-muted">Profile photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange('photo')}
          className="form-control"
        />
      </div>
      <div className="form-group  my-1">
        <label className="text-muted">Username</label>
        <input
          type="text"
          onChange={handleChange('username')}
          value={username}
          className="form-control"
        />
      </div>
      <div className="form-group my-1">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange('name')}
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group my-1">
        <label className="text-muted">Email</label>
        <input
          type="text"
          onChange={handleChange('email')}
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group my-1">
        <label className="text-muted">About</label>
        <textarea
          type="text"
          onChange={handleChange('about')}
          value={about}
          className="form-control"
        />
      </div>
      <div className="form-group my-1">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange('password')}
          value={password}
          className="form-control"
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary my-1">
          Update profile
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      All fields are required
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? '' : 'none' }}
    >
      Profile updated
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? '' : 'none' }}
    >
      Loading...
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${API}/user/photo/${username}`}
              className="img img-fluid img-thumbnail mb-3"
              style={{ maxHeight: 'auto', maxWidth: '100%' }}
              alt="profile photo"
            />
          </div>
          <div className="col-md-8 mb-5">
            <h2>Update profile</h2>
            {showSuccess()}
            {showError()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
