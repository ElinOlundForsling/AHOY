import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import { GiCoffeeCup } from 'react-icons/gi';
import Sidebar from '../components/layout/Sidebar';
import Avatar from '../components/layout/Avatar';
import Button from '../components/layout/Button';
import ProfileModal from '../components/layout/ProfileModal';
import {
  updateProfile,
  updateProfileImage,
  getProfileById,
  getTeamMembers,
} from '../store/actions/profileActions';
import { getChat } from '../store/actions/messageActions';
import '../stylesheets/profilePage.css';
import '../stylesheets/modal.css';
import '../stylesheets/index.css';
import '../stylesheets/card.css';

const Profile = ({
  auth,
  profile,
  profileData,
  updateProfile,
  updateProfileImage,
  getProfileById,
  getTeamMembers,
  teamMembers,
  getChat,
  chatId,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const profileId = useParams().userId;

  function openModal() {
    setModalIsOpen(true);
  }
  useEffect(() => {
    getProfileById(profileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, profileId]);

  useEffect(() => {
    if (profileData.id) {
      getChat(auth.uid, profileData.id);
      getTeamMembers(profileData.team);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);
  console.log('data', profileData.team);

  if (!auth.uid) {
    return <Redirect to='/signin' />;
  }

  return (
    <>
      <section className='sidebar-layout'>
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
        />
      </section>
      <div className='profile-page'>
        <section>
          {profileData.firstName && (
            <>
              <div className='profile-info'>
                <div className='profile-image'>
                  <Avatar
                    imgURL={profileData.imgURL}
                    className='normal-size'
                    isOnline={profileData.isOnline}
                    workFromHome={profileData.workFromHome}
                  />
                </div>
                <div className='card-title profile-header'>
                  <div className='header-info'>
                    <div className='profile-pen' id='edit-profile-pen'>
                      {auth.uid === profileId && <FaPen onClick={openModal} />}
                    </div>
                    <h5>
                      {profileData.firstName} {profileData.lastName}
                    </h5>
                  </div>
                </div>

                <div className='profile-container top-content'>
                  <div className='profile-container-title'>
                    <h3>info:</h3>
                    <p>
                      <p>
                        Department: {profileData.department} <br></br> Team:{' '}
                        {profileData.team}
                        <br></br> Title: {profileData.title}
                        <br></br> Email: {profileData.email}
                      </p>

                      {auth.uid !== profileId && (
                        <Link to={`/chat/${chatId}`}>
                          <button>CHAT</button>
                        </Link>
                      )}
                    </p>
                  </div>
                </div>

                <div className='profile-container'>
                  <div className='profile-container-title'>
                    <h3>Location:</h3>
                    <p>
                      <MdLocationOn className='profile-icon' />{' '}
                      {profileData.location
                        ? profileData.location
                        : 'Add your location here.'}
                    </p>
                  </div>
                </div>

                <div className='profile-container'>
                  <div className='profile-container-title'>
                    <h3>Coffee:</h3>
                    <p>
                      <GiCoffeeCup className='profile-icon' />{' '}
                      {profileData.availableForFika
                        ? 'Available For Fika'
                        : 'Not available for Fika'}
                      {profileData.availableForFika &&
                      auth.uid !== profileId ? (
                        <button>ASK FOR FIKA</button>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                </div>

                <div className='profile-container'>
                  <div className='profile-container-title'>
                    <h3>Bio:</h3>
                    <p>
                      {profileData.bio ? profileData.bio : 'Add your bio here.'}
                    </p>
                  </div>
                </div>

                <div>
                  <div className='profile-container'>
                    <div className='profile-container-title'>
                      <h3>My team:</h3>
                    </div>
                    <div className='profile-container-content'>
                      {teamMembers.map(teamMember => {
                        return (
                          <Avatar
                            key={teamMember.id}
                            id={teamMember.id}
                            imgURL={teamMember.imgURL}
                            firstName={teamMember.firstName}
                            lastName={teamMember.lastName}
                            isOnline={teamMember.isOnline}
                            workFromHome={teamMember.workFromHome}
                            className='normal-size'
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        <ProfileModal
          auth={auth}
          profile={profile}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          updateProfile={updateProfile}
          updateProfileImage={updateProfileImage}
        />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    chatId: state.chat.chatId,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    profileData: state.profileData.profileData,
    teamMembers: state.profileData.teamMembers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (userId, userData) =>
      dispatch(updateProfile(userId, userData)),
    updateProfileImage: (userId, file) =>
      dispatch(updateProfileImage(userId, file)),
    getTeamMembers: team => dispatch(getTeamMembers(team)),
    getProfileById: userId => dispatch(getProfileById(userId)),
    getChat: (id1, id2) => dispatch(getChat(id1, id2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
