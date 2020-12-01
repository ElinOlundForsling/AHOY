import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import { GiCoffeeCup } from 'react-icons/gi';
import Sidebar from '../components/layout/Sidebar';
import Avatar from '../components/layout/Avatar';
import ProfileModal from '../components/layout/ProfileModal';
import {
  updateProfile,
  updateProfileImage,
  getProfileById,
} from '../store/actions/profileActions';
import { getChat } from '../store/actions/messageActions';
import '../stylesheets/profilePage.css';
import '../stylesheets/modal.css';
import '../stylesheets/card.css';

const Profile = ({
  auth,
  profile,
  profileData,
  updateProfile,
  updateProfileImage,
  getProfileById,
  getChat,
  chatId,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const profileId = useParams().userId;

  Notification.requestPermission().then(function (result) {
    console.log(result);
  });

  function openModal() {
    setModalIsOpen(true);
  }
  useEffect(() => {
    console.log('welp');
    getProfileById(profileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, profileId]);

  useEffect(() => {
    if (profileData.id) {
      getChat(auth.uid, profileData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

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
                    <p>{profileData.title}</p>
                  </div>
                </div>
                <p>
                  Department: {profileData.department} <br></br> Team:{' '}
                  {profileData.team}
                  <br></br> Email: {profileData.email}
                </p>
                <div className='profile-location'>
                  <p>
                    <MdLocationOn />{' '}
                    {profileData.location
                      ? profileData.location
                      : 'Add your location here.'}
                  </p>
                </div>
                {auth.uid !== profileId && (
                  <Link to={`/chat/${chatId}`}>
                    <button className='chat-button'>CHAT</button>
                  </Link>
                )}
                <span className='profile-fika'>
                  <GiCoffeeCup />{' '}
                  {profileData.availableForFika
                    ? 'Available For Fika'
                    : 'Not available for Fika'}
                  {profileData.availableForFika && auth.uid !== profileId ? (
                    <button>ASK FOR FIKA</button>
                  ) : (
                    ''
                  )}
                </span>
                <div className='profile-bio'>
                  <p>
                    {profileData.bio ? profileData.bio : 'Add your bio here.'}
                  </p>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (userId, userData) =>
      dispatch(updateProfile(userId, userData)),
    updateProfileImage: (userId, file) =>
      dispatch(updateProfileImage(userId, file)),
    getProfileById: userId => dispatch(getProfileById(userId)),
    getChat: (id1, id2) => dispatch(getChat(id1, id2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
