import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../../stylesheets/authform.css';

const SignInForm = ({
  handleSubmit,
  handleInputChange,
  credentials,
  authError,
}) => {
  return (
    <div class="auth-card">
      <form autoComplete="off" className="auth-form" onSubmit={handleSubmit}>
        <div class="input-border">
          <input
            autoComplete="off"
            type="email"
            name="email"
            className="input-text"
            onChange={handleInputChange}
            value={credentials.email}
            required
          />
          <label>Email</label>
          <div class="border"></div>
        </div>

        <div class="input-border">
          <input
            autoComplete="off"
            type="password"
            name="password"
            className="input-text"
            onChange={handleInputChange}
            value={credentials.password}
            required
          />
          <label>Password</label>
          <div class="border"></div>
        </div>

        <button className="btn" value="Log In">
          Login
        </button>

        <div className="red-text center">
          {authError ? <p>{authError}</p> : null}
        </div>
      </form>
      <Link className="not-a-member-link" to={'/signup'}>
        {' '}
        Not a member? Contact us.
      </Link>
    </div>
  );
};

export default SignInForm;
