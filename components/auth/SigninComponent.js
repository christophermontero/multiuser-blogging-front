import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { authenticate, isAuth, signin } from '../../actions/auth';

const SigninComponent = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
    message: '',
    loading: false,
    showForm: true
  });
  const router = useRouter();

  const { email, password, error, loading, message, showForm } = user;

  useEffect(() => {
    isAuth() && router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true, error: false });
    const u = { email, password };
    signin(u).then((data) => {
      if (data.error) {
        setUser({
          ...user,
          error: data.error,
          loading: false
        });
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            router.push(`/admin`);
          } else {
            router.push(`/user`);
          }
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

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
          <button className="btn btn-primary">Sign</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  );
};

export default SigninComponent;
