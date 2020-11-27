import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
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
        <div className="container">
          <form onSubmit={handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={credentials.email}
              />
            </div>
            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={credentials.password}
              />
            </div>
            <div className="input-field">
              <button type="submit" className="btn pink lighten-1 z-depth-0">
                Login
              </button>
              <div className="red-text center">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </form>
        </div>
        <Card
          className="section"
          // img='././img/we_developer.png'
          title="About the Company"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur."
        />
        <Card
          className="section"
          // img='././img/we_developer.png'
          title="Our Mission"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur."
        />
        <ContactContainer />
      </div>
    </>
  );
};

const Header = () => {
  return (
    <div className="header">
      <span className="header-title">AHOY</span>
      <br />
      <span className="header-text">To Onboarding and beyond ...</span>
    </div>
  );
};

const Card = (props) => {
  return (
    <div className={props.className}>
      {/* <div className="small-div">
              <i className={props.className}></i>
              <img src={props.img} alt=''/>
          </div> */}

      <div className="big-div">
        <span className="div-title">{props.title}</span>
        <br />
        <span>{props.description}</span>
      </div>
    </div>
  );
};

const ContactContainer = () => {
  return (
    <div className="contact-container bg-grey">
      <span className="div-title">Contact us</span>
      <div className="contact-form">
        <div id="sect1">
          <span>Contact us and we will get back to you within 24 hours.</span>
          <span>
            <i className="fas fa-map-marker-alt"></i>
            Stockholm, Sweden
          </span>
          <span>
            <i className="fas fa-mobile-alt"></i>
            +46 778 800 900
          </span>
          <span>
            <i className="far fa-envelope"></i>
            ahoy.global@gmail.com
          </span>
        </div>

        <div id="sect2">
          <span>Contact</span>

          <input
            type="text"
            placeholder="email address"
            className="input-field"
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="comment"
          ></textarea>
          <button className="contact-btn">Send</button>
        </div>
      </div>
    </div>
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
    signIn: (creds, auth) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
