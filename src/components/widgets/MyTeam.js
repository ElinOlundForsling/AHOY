import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getTeamMembers } from '../../store/actions/profileActions';
import '../../stylesheets/myTeam.css';
import Card from '../layout/Card';
import Avatar from '../layout/Avatar';

const MyTeam = ({ profile, getTeamMembers, teamMembers }) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    getTeamMembers(profile.team);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Card
      heading='My Team'
      subHeading={profile.team}
      className='team-component'>
      <div className='members'>
        {teamMembers.map(member => {
          return (
            <div key={member.id}>
              <Avatar
                key={member.id}
                id={member.id}
                imgURL={member.imgURL}
                firstName={member.firstName}
                lastName={member.lastName}
                isOnline={member.isOnline}
                workFromHome={member.workFromHome}
                className='normal-size'
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    teamMembers: state.profileData.teamMembers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTeamMembers: team => dispatch(getTeamMembers(team)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam);
