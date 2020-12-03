import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getDepartments,
  getTeamByDepartment,
} from '../../store/actions/departmentActions';
import { updateProfileAdmin } from '../../store/actions/profileActions';
import '../../stylesheets/admin-panel.css';
import Select from 'react-select';
import Button from '../layout/Button';

const Collapse = ({
  isOpen,
  member,
  departments,
  teams,
  updateProfileAdmin,
  getDepartments,
  getTeamByDepartment,
}) => {
  const [userData, setUserData] = useState({
    email: member.email,
    firstName: member.firstName,
    lastName: member.lastName,
    department: member.department,
    team: member.team,
    title: member.title,
    employmentType: member.employmentType || 'Full-time',
  });
  const [teamOption, setTeamOption] = useState(null);
  const [departmentOption, setDepartmentOption] = useState(null);
  const [adminOption, setAdminOption] = useState(null);

  useEffect(() => {
    getDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    updateProfileAdmin(member.id, userData);
  };

  const handleChange = event => {
    setUserData(userData => ({
      ...userData,
      [event.target.name]: event.target.value,
    }));
  };

  const createAdminOptions = () => {
    return [
      { name: 'Admin', label: 'Admin', value: 'admin' },
      { name: 'HR', label: 'HR', value: 'hr' },
      {
        name: 'Department Lead',
        label: 'Department Lead',
        value: 'department-lead',
      },
      { name: 'Team Lead', label: 'Team Lead', value: 'team-lead' },
    ];
  };

  const createDepartmentOptions = () => {
    const options = departments.map(dep => {
      return {
        label: dep.name,
        name: dep.name,
        value: dep.name.toLowerCase(),
      };
    });
    return options;
  };

  const createTeamOptions = () => {
    const options = teams
      ? teams.map(team => {
          return {
            label: team.teamName,
            name: team.teamName,
            value: team.teamName.toLowerCase(),
          };
        })
      : {
          label: 'Select Department first',
          name: 'Select Department first',
          value: 'selectDepFirst',
        };
    return options;
  };

  const handleDepartmentChange = selectedOption => {
    setDepartmentOption(selectedOption);
    setTeamOption('Team');
    setUserData(userData => ({
      ...userData,
      department: selectedOption.name,
    }));
    getTeamByDepartment(selectedOption.name);
  };

  const handleTeamChange = selectedOption => {
    setTeamOption(selectedOption);
    setUserData(userData => ({
      ...userData,
      team: selectedOption.name,
    }));
  };

  const handleAdminChange = selectedOption => {
    setAdminOption(selectedOption);
    setUserData(userData => ({
      ...userData,
      adminRights: selectedOption.name,
    }));
  };

  return (
    <div
      className='collapse'
      style={{
        maxHeight: isOpen ? 500 : 0,
      }}>
      <div>
        <section className='container-form'>
          <form className='myForm' onSubmit={handleSubmit}>
            <table className='table-form'>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor='first_name'>First Name </label>
                  </td>
                  <td>
                    <input
                      id='first_name'
                      onChange={handleChange}
                      className='input-form'
                      name='firstName'
                      placeholder={member.firstName}
                    />
                  </td>
                  <td colspan='2' rowspan='2'>
                    <fieldset className='fieldset-form'>
                      <legend>Employment Type</legend>
                      <label>
                        <input
                          type='radio'
                          name='employmentType'
                          id='intern'
                          value='Intern'
                          onChange={handleChange}
                        />
                        &nbsp;Intern&nbsp;&nbsp;
                      </label>
                      <label>
                        <input
                          type='radio'
                          name='employmentType'
                          id='full-time'
                          value='Full-time'
                          onChange={handleChange}
                        />
                        &nbsp;Full-time&nbsp;&nbsp;
                      </label>
                      <label>
                        <input
                          type='radio'
                          name='employmentType'
                          id='part-time'
                          value='Part-Time'
                          onChange={handleChange}
                        />
                        &nbsp;Part-time&nbsp;&nbsp;
                      </label>
                      <label>
                        <input
                          type='radio'
                          name='employmentType'
                          id='consultant'
                          value='Consultant'
                          onChange={handleChange}
                        />
                        &nbsp;Consultant
                      </label>
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor='last_name'>Last Name </label>
                  </td>
                  <td>
                    <input
                      type='tel'
                      id='last_name'
                      className='input-form'
                      onChange={handleChange}
                      name='lastName'
                      placeholder={member.lastName}
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan='2'>
                    <Select
                      value={departmentOption}
                      onChange={handleDepartmentChange}
                      options={createDepartmentOptions()}
                    />
                  </td>
                  <td>
                    <label htmlFor='title'>Title </label>
                  </td>
                  <td className='right'>
                    <input
                      onChange={handleChange}
                      name='title'
                      type='text'
                      className='input-form'
                      id='title'
                      placeholder={member.title}
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan='2'>
                    <Select
                      value={teamOption}
                      onChange={handleTeamChange}
                      options={createTeamOptions()}
                    />
                  </td>
                  <td colspan='2'>
                    <Select
                      value={adminOption}
                      onChange={handleAdminChange}
                      options={createAdminOptions()}
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan='4'>
                    <div className='row'>
                      <Button id='submit'>Update user</Button>&nbsp;
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    allMembers: state.profileData.allMembers,
    departments: state.departments.departments,
    teams: state.departments.teams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDepartments: () => dispatch(getDepartments()),
    getTeamByDepartment: department =>
      dispatch(getTeamByDepartment(department)),
    updateProfileAdmin: (userId, userData) =>
      dispatch(updateProfileAdmin(userId, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collapse);
