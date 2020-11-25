import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { GiCoffeeCup } from 'react-icons/gi';
import ProfileModal from '../components/layout/ProfileModal';
import {
  updateProfile,
  updateProfileImage,
  getProfileById,
} from '../store/actions/profileActions';
import '../stylesheets/profilePage.css';
import '../stylesheets/modal.css';
import '../stylesheets/Card.css';

const Profile = ({
  auth,
  profile,
  profileData,
  updateProfile,
  updateProfileImage,
  getProfileById,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const profileId = useParams().userId;

  function openModal() {
    setModalIsOpen(true);
  }

  useEffect(() => {
    getProfileById(profileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData, profile]);

  if (!auth.uid) {
    return <Redirect to='/signin' />;
  }

  return (
    <div className='profile-page'>
      <section>
        {profileData.firstName && (
          <>
            {/* <div className='profile-welcome'>
              <h4>
                Welcome, {profileData.firstName} {profileData.lastName}!
              </h4>
            </div> */}
            <div className='profile-info'>
              <div className='profile-image'>
                <img
                  src={
                    profileData.imgURL
                      ? profileData.imgURL
                      : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                  }
                  alt=''
                />
              </div>
              <div className='card-title'>
                <div className='profile-pen' id='edit-profile-pen'>
                  {auth.uid === profileId && <FaPen onClick={openModal} />}
                </div>
                <h5>
                  {profileData.firstName} {profileData.lastName}
                </h5>
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
  );
};

const mapStateToProps = state => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
