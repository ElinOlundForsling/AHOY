import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getAllMembers,
  updateProfileAdmin,
} from '../store/actions/profileActions';
import '../stylesheets/admin-panel.css';
import Collapse from '../components/layout/Collapse';

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
            <article key={member.id}>
              <button onClick={toggle} id={member.id} className='toggle-button'>
                <img src={member.imgURL} className='avatar-small' />
                {member.firstName}&nbsp;{member.lastName}
              </button>
              <Collapse isOpen={member.isOpen} member={member} />
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
