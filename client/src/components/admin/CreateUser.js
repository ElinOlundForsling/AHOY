import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import {
  getDepartments,
  getTeamByDepartment,
} from '../../store/actions/departmentActions';
import Select from 'react-select';
import Button from '../layout/Button';
import '../../stylesheets/form.css';

const CreateUser = ({
  signUp,
  teams,
  departments,
  getTeamByDepartment,
  getDepartments,
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

  return (
    <>
      <div className='container-form'>
        <form onSubmit={handleSubmit} className='white'>
          <table className='table-form'>
            <tr>
              <td>
                <label>Email&nbsp;</label>
              </td>
              <td>
                <input
                  className='input-form'
                  autocorrect='off'
                  type='email'
                  name='email'
                  onChange={handleInputChange}
                  value={credentials.email}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>First Name&nbsp;</label>
              </td>
              <td>
                <input
                  className='input-form'
                  autocorrect='off'
                  type='text'
                  name='firstName'
                  onChange={handleInputChange}
                  value={credentials.firstName}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Last Name</label>
              </td>
              <td>
                <input
                  className='input-form'
                  autocorrect='off'
                  type='text'
                  name='lastName'
                  onChange={handleInputChange}
                  value={credentials.lastName}
                />
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <Select
                  value={departmentOption}
                  onChange={handleDepartmentChange}
                  options={createOptions()}
                />
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                {departmentOption && (
                  <div className='input-field col s12'>
                    <Select
                      value={teamOption}
                      onChange={handleTeamChange}
                      options={createTeams()}
                    />
                  </div>
                )}
              </td>
            </tr>
            <div className='input-field'>
              <Button type='submit'>Add User</Button>
              <div className='red-text center'></div>
            </div>
          </table>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    departments: state.departments.departments,
    teams: state.departments.teams,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
