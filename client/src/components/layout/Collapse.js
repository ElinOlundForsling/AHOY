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
  });
  const [teamOption, setTeamOption] = useState(null);
  const [departmentOption, setDepartmentOption] = useState(null);

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(userData);
    updateProfileAdmin(member.id, userData);
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
                  <label for='first_name'>First Name </label>
                  <input id='first_name' placeholder={member.firstName} />
                </div>
                <div className='input-group'>
                  <label for='last_name'>Last Name </label>
                  <input
                    type='tel'
                    id='last_name'
                    placeholder={member.lastName}
                  />
                </div>
                <div className='input-group'>
                  <label for='email_address'>Email </label>
                  <input
                    type='email'
                    id='email_address'
                    placeholder={member.email}
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
                      name='employment_type'
                      id='taxi_car'
                      value='car'
                    />{' '}
                    Intern{' '}
                  </label>
                  <label>
                    {' '}
                    <input
                      type='radio'
                      name='employment_type'
                      id='taxi_van'
                      value='van'
                    />{' '}
                    Full-time{' '}
                  </label>
                  <label>
                    {' '}
                    <input
                      type='radio'
                      name='employment_type'
                      id='taxi_van'
                      value='van'
                    />{' '}
                    Part-time{' '}
                  </label>
                  <label>
                    {' '}
                    <input
                      type='radio'
                      name='employment_type'
                      id='taxi_tuk'
                      value='tuktuk'
                    />{' '}
                    Consultant{' '}
                  </label>
                </fieldset>

                <fieldset className='extras'>
                  <legend>Extra field?</legend>
                  <label>
                    {' '}
                    <input
                      type='checkbox'
                      id='extras_baby'
                      value='baby'
                    /> Baby{' '}
                  </label>
                  <label>
                    {' '}
                    <input
                      type='checkbox'
                      id='extras_adult'
                      value='adult'
                    />{' '}
                    Adult{' '}
                  </label>
                </fieldset>
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
