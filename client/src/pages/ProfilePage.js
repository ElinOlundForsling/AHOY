import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Modal from "react-modal";
import { updateProfile } from "../store/actions/profileActions";
import "../stylesheets/profilePage.css";

const ProfilePage = ({ auth, profile, updateProfile }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [info, setInfo] = useState('');
 
  useEffect(() => {
    setInfo(profile)
  }, [profile])

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(auth.uid, info);
    closeModal();
  };

  const handleInputChange = (event) => {
    setInfo(info => ({
      ...info,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="profile-page">
      <section>
        {profile.isLoaded && (
          <>
            <div className="profile-welcome">
              <h2>
                Welcome, {profile.firstName} {profile.lastName}!
              </h2>
            </div>
            <div className="profile-info">
              <div className="profile-pen">
                <FaPen onClick={openModal} />
              </div>
              <p>
                Department: {profile.department} <br></br> Team: {profile.team}
                <br></br> Email: {profile.email}
              </p>
              <div className="profile-bio">
                <p>{profile.bio ? profile.bio : "Add your bio here."}</p>
              </div>
            </div>
          </>
        )}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleInputChange} name="firstName" placeholder={profile.firstName} />
          <input type="text" onChange={handleInputChange} name="lastName" placeholder={profile.lastName} />
          <textarea type="text" onChange={handleInputChange} name="bio" />
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (userId, userData) =>
      dispatch(updateProfile(userId, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
