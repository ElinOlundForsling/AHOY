import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import { getDepartments } from '../../store/actions/departmentActions';

const SignUpForm = ({
  signUp,
  departments,
  getDepartments,
  auth,
  authError,
}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    department: '',
    team: '',
  });
  const [department, setDepartment] = useState('HR');

  useEffect(() => {
    getDepartments().then(res => console.log(res));
  }, [getDepartments]);

  const handleSubmit = event => {
    event.preventDefault();
    signUp(credentials);
  };

  const handleInputChange = event => {
    setCredentials(credentials => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  };
  if (auth.uid) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit} className='white'>
          <h5 className='grey-text text-darken-3'>Sign Up</h5>
          <div className='input-field'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              onChange={handleInputChange}
              value={credentials.email}
            />
          </div>
          <div className='input-field'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={handleInputChange}
              value={credentials.password}
            />
          </div>
          <div className='input-field'>
            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              onChange={handleInputChange}
              value={credentials.firstName}
            />
          </div>
          <div className='input-field'>
            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              onChange={handleInputChange}
              value={credentials.lastName}
            />
          </div>
          <div class='input-field col s12'>
            <select className='browser-default'>
              <option value='' disabled selected>
                Departments
              </option>
              {departments.map(dep => {
                return <option value={dep.name}>{dep.name}</option>;
              })}
            </select>
          </div>
          <div className='input-field'>
            <label>Team</label>
            <input
              type='text'
              name='team'
              onChange={handleInputChange}
              value={credentials.team}
            />
          </div>
          <div className='input-field'>
            <button type='submit' className='btn pink lighten-1 z-depth-0'>
              Sign Up
            </button>
            <div className='red-text center'>
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    departments: state.departments.departments,
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
    getDepartments: () => dispatch(getDepartments()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
