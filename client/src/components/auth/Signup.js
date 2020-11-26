import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import {
  getDepartments,
  getTeamByDepartment,
} from '../../store/actions/departmentActions';
import Select from 'react-select';

const Signup = ({
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
  const [teamOption, setTeamOption] = useState(null);
  const [departmentOption, setDepartmentOption] = useState(null);

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  const createOptions = () => {
    const options = departments.map(dep => {
      return {
        label: dep.name,
        name: dep.name,
        value: dep.name.toLowerCase(),
      };
    });
    return options;
  };

  const createTeams = () => {
    const options =
      teams &&
      teams.map(team => {
        return {
          label: team.teamName,
          name: team.teamName,
          value: team.teamName.toLowerCase(),
        };
      });
    return options;
  };

  const handleSubmit = event => {
    event.preventDefault();
    signUp(credentials);
  };

  const handleDepartmentChange = selectedOption => {
    setDepartmentOption(selectedOption);
    setTeamOption('Team');
    setCredentials(credentials => ({
      ...credentials,
      department: selectedOption.name,
    }));
    getTeamByDepartment(selectedOption.name);
  };

  const handleTeamChange = selectedOption => {
    setTeamOption(selectedOption);
    setCredentials(credentials => ({
      ...credentials,
      team: selectedOption.name,
    }));
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
          <div className='input-field col s12'>
            <Select
              value={departmentOption}
              onChange={handleDepartmentChange}
              options={createOptions()}
              className='browser-default'
            />
          </div>
          <div className='input-field col s12'>
            {departmentOption && (
              <div className='input-field col s12'>
                <Select
                  value={teamOption}
                  onChange={handleTeamChange}
                  options={createTeams()}
                  className='browser-default'
                />
              </div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
