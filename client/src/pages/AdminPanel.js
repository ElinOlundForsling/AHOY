import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getAllMembers,
  updateProfileAdmin,
} from '../store/actions/profileActions';
import '../stylesheets/admin-panel.css';

const Collapse = props => {
  return (
    <div
      className='collapse'
      style={{
        maxHeight: props.isOpen ? 350 : 0,
      }}>
      <div>{props.children}</div>
    </div>
  );
};

const AdminPanel = ({
  auth,
  profile,
  allMembers,
  getAllMembers,
  updateProfileAdmin,
}) => {
  // const [changes, setChanges] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  useEffect(() => {
    getAllMembers();
    setIsOpen2(
      allMembers.map(mem => {
        return { memberid: mem.id, isOpen: false };
      }),
    );
  }, [getAllMembers]);

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const handleDelete = e => {
    e.preventDefault();
    console.log(e.target.name);
  };

  return (
    <section className='admin-memberlist'>
      {allMembers &&
        allMembers.map(member => {
          return (
            <article>
              <button onClick={toggle} className='toggle-button'>
                <img src={member.imgURL} className='avatar-small' />
                {member.firstName}&nbsp;{member.lastName}
              </button>
              <Collapse isOpen={isOpen}>
                <section className='sample-content'>
                  <form class='myForm'>
                    <div class='row'>
                      <div class='column'>
                        <div class='input-group'>
                          <label for='first_name'>First Name </label>
                          <input
                            id='first_name'
                            placeholder={member.firstName}
                          />
                        </div>
                        <div class='input-group'>
                          <label for='last_name'>Last Name </label>
                          <input
                            type='tel'
                            id='last_name'
                            placeholder={member.lastName}
                          />
                        </div>
                        <div class='input-group'>
                          <label for='email_address'>Email </label>
                          <input
                            type='email'
                            id='email_address'
                            placeholder={member.email}
                          />
                        </div>
                        <div class='input-group'>
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
                        <div class='input-group'>
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
                      <div class='column'>
                        <fieldset class='taxi'>
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

                        <fieldset class='extras'>
                          <legend>Extra field?</legend>
                          <label>
                            {' '}
                            <input
                              type='checkbox'
                              id='extras_baby'
                              value='baby'
                            />{' '}
                            Baby{' '}
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

                    <div class='row'>
                      <button id='submit'>Update user</button>&nbsp;
                      <button name={member.id} onClick={handleDelete}>
                        Delete user
                      </button>
                    </div>
                  </form>
                </section>
              </Collapse>
            </article>
          );
        })}
    </section>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    allMembers: state.profileData.allMembers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllMembers: () => dispatch(getAllMembers()),
    updateProfileAdmin: (userId, userData) =>
      dispatch(updateProfileAdmin(userId, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
