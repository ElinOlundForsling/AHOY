import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getDepartments,
  getTeamByDepartment,
} from '../../store/actions/departmentActions';
import Select from 'react-select';
import Button from '../layout/Button';
import '../../stylesheets/form.css';

const AddNotifications = ({
  teams,
  departments,
  getTeamByDepartment,
  getDepartments,
}) => {
  const [notificationInfo, setNotificationInfo] = useState({
    subject: '',
    text: '',
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
  };

  const handleDepartmentChange = selectedOption => {
    setDepartmentOption(selectedOption);
    setTeamOption('Team');
    setNotificationInfo(notificationInfo => ({
      ...notificationInfo,
      department: selectedOption.name,
    }));
    getTeamByDepartment(selectedOption.name);
  };

  const handleTeamChange = selectedOption => {
    setTeamOption(selectedOption);
    setNotificationInfo(notificationInfo => ({
      ...notificationInfo,
      team: selectedOption.name,
    }));
  };

  const handleInputChange = event => {
    setNotificationInfo(notificationInfo => ({
      ...notificationInfo,
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
                <label>Subject</label>
              </td>
              <td>
                <input
                  className='input-form'
                  autocorrect='off'
                  type='text'
                  name='subject'
                  onChange={handleInputChange}
                  value={notificationInfo.subject}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Text</label>
              </td>
              <td>
                <input
                  className='input-form'
                  autocorrect='off'
                  type='text'
                  name='text'
                  onChange={handleInputChange}
                  value={notificationInfo.text}
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
              <Button type='submit'>Add Notification</Button>
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
    getDepartments: () => dispatch(getDepartments()),
    getTeamByDepartment: department =>
      dispatch(getTeamByDepartment(department)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNotifications);
