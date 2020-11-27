import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getDepartments,
  getTeamByDepartment,
} from '../../store/actions/departmentActions';
import { updateProfileAdmin } from '../../store/actions/profileActions';
import '../../stylesheets/admin-panel.css';

const Collapse = ({ isOpen, member }) => {
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    department: '',
    team: '',
  });

  const [teamOption, setTeamOption] = useState(null);
  const [departmentOption, setDepartmentOption] = useState(null);

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
        maxHeight: isOpen ? 350 : 0,
      }}>
      <div>
        <section className='sample-content'>
          <form className='myForm'>
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
                  <label for='admin_form_department'>Department</label>
                  <select id='admin_form_department'>
                    <option value='' selected='selected' disabled>
                      Department
                    </option>
                    <option value='hr'>HR</option>
                    <option value='hr'>HR</option>
                    <option value='hr'>HR</option>
                  </select>
                </div>
                <div className='input-group'>
                  <label for='admin_form_teams'>Team</label>
                  <select id='admin_form_teams'>
                    <option value='' selected='selected' disabled>
                      Team
                    </option>
                    <option value='hr'>HR</option>
                    <option value='hr'>HR</option>
                    <option value='hr'>HR</option>
                  </select>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDepartments: () => dispatch(getDepartments()),
    getTeamByDepartment: () => dispatch(getTeamByDepartment()),
    updateProfileAdmin: (userId, userData) =>
      dispatch(updateProfileAdmin(userId, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collapse);
