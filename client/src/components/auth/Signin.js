import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import Header from '../layout/Header';
import SignInForm from '../layout/SignInForm';
import '../../stylesheets/landingpage.css';

const Signin = ({ authError, signIn, auth }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn(credentials);
  };

  const handleInputChange = (event) => {
    setCredentials((credentials) => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  };
  if (auth.uid) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div id="body">
        <Header />

        <div className="landing-page-content">
          <div className="landing-page-form">
            <h1 className="landing-page-heading">
              To Onboarding and beyond ...
            </h1>
            <SignInForm
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              credentials={credentials}
              authError={authError}
            />
          </div>

          <img
            className="landing-image"
            src="/img/video_call.png"
            alt="landing-page-image"
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
