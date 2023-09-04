import { useState, useEffect } from 'react';
import { isAuth, signup } from '../../actions/auth';

const SignupComponent = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    message: '',
    loading: false,
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = user;

  useEffect(() => {
    isAuth() && router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true, error: false });
    const u = { name, email, password };
    signup(u).then((data) => {
      if (data.error) {
        setUser({
          ...user,
          error: data.error,
          loading: false
        });
      } else {
        setUser({
          ...user,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false
        });
      }
    });
  };

  const handleChange = (attr) => (e) => {
    setUser({
      ...user,
      error: false,
      [attr]: e.target.value
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : '';

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <input
            value={name}
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>
        <div className="form-group mb-2">
          <input
            value={email}
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group mb-4">
          <input
            value={password}
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            placeholder="Type your password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
      <br />
      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger bt-sm">Forgot password</a>
      </Link>
    </>
  );
};

export default SignupComponent;
