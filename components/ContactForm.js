import React, { useState } from 'react';
import { sendContactForm } from '../actions/contact';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    message: '',
    name: '',
    email: ''
  });

  const [formStatus, setFormStatus] = useState({
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: ''
  });

  const { message, name, email } = formData;
  const { buttonText, success, error } = formStatus;

  const clickSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      ...formStatus,
      buttonText: 'Sending...'
    });

    sendContactForm({ name, email, message })
      .then((data) => {
        if (data.error) {
          setFormStatus({ ...formStatus, error: data.error });
        } else {
          setFormData({
            message: '',
            name: '',
            email: ''
          });

          setFormStatus({
            sent: true,
            buttonText: 'Sent',
            success: data.success,
            error: ''
          });
        }
      })
      .catch((error) => {
        console.error('Error sending contact form:', error);
        setFormStatus({
          ...formStatus,
          error: 'An error occurred while sending the form.'
        });
      });
  };

  const handleChange = (name) => (e) => {
    setFormData({
      ...formData,
      [name]: e.target.value
    });

    setFormStatus({
      ...formStatus,
      success: false,
      buttonText: 'Send Message',
      error: ''
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Thank you for contacting us.</div>
    );

  const showErrorMessage = () =>
    error && <div className="alert alert-danger">{error}</div>;

  return (
    <>
      {showSuccessMessage()}
      {showErrorMessage()}
      <form onSubmit={clickSubmit} className="pb-5">
        <div className="form-group py-3">
          <label className="lead">Message</label>
          <textarea
            onChange={handleChange('message')}
            className="form-control"
            value={message}
            required
            rows="10"
          />
        </div>
        <div className="form-group pb-3">
          <label className="lead">Name</label>
          <input
            type="text"
            onChange={handleChange('name')}
            className="form-control"
            value={name}
            required
          />
        </div>
        <div className="form-group pb-3">
          <label className="lead">Email</label>
          <input
            type="email"
            onChange={handleChange('email')}
            className="form-control"
            value={email}
            required
          />
        </div>
        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
