import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTeamMembers } from '../../store/actions/profileActions';
import '../../stylesheets/myTeam.css';
import Card from '../layout/Card';
import Avatar from '../layout/Avatar';

const MyTeam = ({ profile, getTeamMembers, teamMembers }) => {
  useEffect(() => {
    getTeamMembers(profile.team);
  }, [profile]);

  return (
    <Card heading="My Team" subHeading={profile.team}>
      <div className="teamMembers">
        {teamMembers.map((member) => {
          return (
            <Avatar
              id={member.id}
              imgURL={member.imgURL}
              firstName={member.firstName}
              lastName={member.lastName}
              isOnline={member.isOnline}
            />
          );
        })}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    teamMembers: state.profileData.teamMembers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTeamMembers: (team) => dispatch(getTeamMembers(team)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam);
