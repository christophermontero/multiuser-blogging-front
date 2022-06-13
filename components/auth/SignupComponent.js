import { useState } from 'react';
import { signup } from '../../actions/auth';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password, error, message, loading, showForm });
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group">
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

  return <>{signupForm()}</>;
};

export default SignupComponent;
