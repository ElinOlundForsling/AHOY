import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import {
  getDepartments,
  getTeamByDepartment,
} from '../../store/actions/departmentActions';
import { v4 as uuid } from 'uuid';

const SignUpForm = ({
  signUp,
  teams,
  departments,
  getTeamByDepartment,
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

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(credentials);
    signUp(credentials);
  };

  const handleInputChange = event => {
    if (event.target.name === 'department') {
      getTeamByDepartment(event.target.value);
    }
    setCredentials(credentials => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  };
  if (auth.uid) {
    return <Redirect to='/' />;
  }
  console.log('Teams: ', teams);
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
          <div className='input-field col s12'>
            <select
              onChange={handleInputChange}
              name='department'
              defaultValue='Department'
              className='browser-default'>
              <option value='' disabled selected>
                Departments
              </option>
              {departments.map(dep => {
                return (
                  <option key={uuid()} value={dep.name}>
                    {dep.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='input-field col s12'>
            <select
              onChange={handleInputChange}
              name='team'
              defaultValue='Team'
              className='browser-default'>
              <option value='' disabled selected>
                Team
              </option>
              {teams &&
                teams.map(team => {
                  return (
                    <option
                      name={team.teamName}
                      key={uuid()}
                      value={team.teamName}>
                      {team.teamName}
                    </option>
                  );
                })}
            </select>
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
    teams: state.departments.teams,
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
    getDepartments: () => dispatch(getDepartments()),
    getTeamByDepartment: department =>
      dispatch(getTeamByDepartment(department)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
