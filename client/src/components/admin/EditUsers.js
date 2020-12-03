import React, { useState, useEffect } from 'react';
import Collapse from '../layout/Collapse';
import { connect } from 'react-redux';
import { getAllMembers } from '../../store/actions/profileActions';

const EditUsers = ({ allMembers, getAllMembers }) => {
  const [members, setMembers] = useState(allMembers);

  useEffect(() => {
    getAllMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMembers(allMembers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                &nbsp;
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
    allMembers: state.profileData.allMembers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllMembers: () => dispatch(getAllMembers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUsers);
