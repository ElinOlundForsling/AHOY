import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getAllMembers,
  updateProfileAdmin,
} from '../store/actions/profileActions';
import '../stylesheets/admin-panel.css';

const Collapse = props => {
  console.log(props.isOpen);
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
  const [members, setMembers] = useState(allMembers);

  const isFirstRun = useRef(true);
  useEffect(() => {
    getAllMembers();
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  }, [getAllMembers]);

  useEffect(() => {
    setMembers(allMembers);
  }, [allMembers]);

  const toggle = e => {
    const newMembers = members.map(mem => {
      if (mem.id === e.target.id) {
        if (mem.isOpen) {
          mem.isOpen = false;
        } else {
          mem.isOpen = true;
        }
      }
      return mem;
    });

    setMembers(newMembers);
  };

  return (
    <section className='admin-memberlist'>
      {members &&
        members.map(member => {
          return (
            <article>
              <button onClick={toggle} id={member.id} className='toggle-button'>
                <img src={member.imgURL} className='avatar-small' />
                {member.firstName}&nbsp;{member.lastName}
              </button>
              <Collapse isOpen={member.isOpen}>
                <section className='sample-content'>
                  <form className='myForm'>
                    <div className='row'>
                      <div className='column'>
                        <div className='input-group'>
                          <label for='first_name'>First Name </label>
                          <input
                            id='first_name'
                            placeholder={member.firstName}
                          />
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

                    <div className='row'>
                      <button id='submit'>Update user</button>&nbsp;
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
