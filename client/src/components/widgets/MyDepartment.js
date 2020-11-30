import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDepartmentMembers } from '../../store/actions/profileActions';
import Card from '../layout/Card';
import Avatar from '../layout/Avatar';
import '../../stylesheets/myDepartment.css';

const MyDepartment = ({ profile, getDepartmentMembers, departmentMembers }) => {
  useEffect(() => {
    getDepartmentMembers(profile.department);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Card heading="My department" subHeading={profile.department} className='department-component'>
      <div className="members">
        {departmentMembers.map((member) => {
          return (
            <div key={member.id}>
              <Avatar
                id={member.id}
                imgURL={member.imgURL}
                firstName={member.firstName}
                lastName={member.lastName}
                isOnline={member.isOnline}
                className="normal-size"
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    departmentMembers: state.profileData.departmentMembers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartmentMembers: (department) =>
      dispatch(getDepartmentMembers(department)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDepartment);
