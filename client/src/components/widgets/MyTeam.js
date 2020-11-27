import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTeamMembers } from '../../store/actions/profileActions';
import '../../stylesheets/myTeam.css';
import Card from '../layout/Card';
import { Link } from 'react-router-dom';

const MyTeam = ({ profile, getTeamMembers, teamMembers }) => {
  useEffect(() => {
    getTeamMembers(profile.team);
  }, [profile]);

  return (
    <Card
      heading='My Team'
      subHeading={profile.team}
      className='team-component'>
      <div className='teamMembers'>
        {teamMembers.map(member => {
          return (
            <div key={member.id}>
              <div className='member-card'>
                <Link to={`/profiles/${member.id}`}>
                  <div className='member-avatar'>
                    <img
                      src={
                        member.imgURL
                          ? member.imgURL
                          : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                      }
                    />
                  </div>
                  <div className='member-name'>
                    {' '}
                    {member.firstName} {member.lastName}{' '}
                  </div>
                </Link>
              </div>
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
