import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getDepartments,
  getTeamByDepartment,
} from '../../store/actions/departmentActions';
import { updateProfileAdmin } from '../../store/actions/profileActions';
import '../../stylesheets/admin-panel.css';
import Select from 'react-select';

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

  useEffect(() => {
    getDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = event => {
    console.log(member.id, userData);
    event.preventDefault();
    updateProfileAdmin(member.id, userData);
  };

  const handleChange = event => {
    setUserData(userData => ({
      ...userData,
      [event.target.name]: event.target.value,
    }));
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

  return (
    <div
      className='collapse'
      style={{
        maxHeight: isOpen ? 400 : 0,
      }}>
      <div>
        <section className='sample-content'>
          <form className='myForm' onSubmit={handleSubmit}>
            <div className='row'>
              <div className='column'>
                <div className='input-group'>
                  <label htmlFor='first_name'>First Name </label>
                  <input
                    id='first_name'
                    onChange={handleChange}
                    name='firstName'
                    placeholder={member.firstName}
                  />
                </div>
                <div className='input-group'>
                  <label htmlFor='last_name'>Last Name </label>
                  <input
                    type='tel'
                    id='last_name'
                    onChange={handleChange}
                    name='lastName'
                    placeholder={member.lastName}
                  />
                </div>
                <div className='input-group'>
                  <label htmlFor='admin_form_department'>Department</label>

                  <div className='input-field col s12'>
                    <Select
                      value={departmentOption}
                      onChange={handleDepartmentChange}
                      options={createDepartmentOptions()}
                    />
                  </div>
                </div>
                <div className='input-group'>
                  <label htmlFor='admin_form_teams'>Team</label>
                  {departmentOption && (
                    <div className='input-field col s12'>
                      <Select
                        value={teamOption}
                        onChange={handleTeamChange}
                        options={createTeamOptions()}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='column'>
                <fieldset className='taxi'>
                  <legend>Employment Type</legend>
                  <label>
                    {' '}
                    <input
                      type='radio'
                      name='employmentType'
                      id='intern'
                      value='Intern'
                      onChange={handleChange}
                    />{' '}
                    Intern{' '}
                  </label>
                  <label>
                    {' '}
                    <input
                      type='radio'
                      name='employmentType'
                      id='full-time'
                      value='Full-time'
                      onChange={handleChange}
                    />{' '}
                    Full-time{' '}
                  </label>
                  <label>
                    {' '}
                    <input
                      type='radio'
                      name='employmentType'
                      id='part-time'
                      value='Part-Time'
                      onChange={handleChange}
                    />{' '}
                    Part-time{' '}
                  </label>
                  <label>
                    {' '}
                    <input
                      type='radio'
                      name='employmentType'
                      id='consultant'
                      value='Consultant'
                      onChange={handleChange}
                    />{' '}
                    Consultant{' '}
                  </label>
                </fieldset>

                <div className='input-group'>
                  <label htmlFor='title'>Title </label>
                  <input
                    onChange={handleChange}
                    name='title'
                    type='text'
                    id='title'
                    placeholder={member.title}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <button id='submit'>Update user</button>&nbsp;
            </div>
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
