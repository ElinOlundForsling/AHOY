import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GiCoffeeCup } from "react-icons/gi";
import Modal from "react-modal";
import {
  updateProfile,
  updateProfileImage,
} from "../store/actions/profileActions";
import "../stylesheets/profilePage.css";
import "../stylesheets/modal.css";

const ProfilePage = ({ auth, profile, updateProfile, updateProfileImage }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [info, setInfo] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setInfo(profile);
  }, [profile]);

  Modal.setAppElement('#root')

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
    closeModal();
    updateProfile(auth.uid, info);
  };

  const handleInputChange = (event) => {
    setInfo((info) => ({
      ...info,
      [event.target.name]: event.target.value,
    }));
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();

    updateProfileImage(auth.uid, file)
  }

  const handleAvailability = (event) => {
    if (profile.availableForFika) {
      setInfo((info) => ({
        ...info,
        availableForFika: !profile.availableForFika,
      }));
    } else {
      setInfo((info) => ({
        ...info,
        availableForFika: true,
      }));
    }
  };

  return (
    <div className="profile-page">
      <section>
        {profile.isLoaded && (
          <>
            <div className="profile-welcome">
              <h4>
                Welcome, {profile.firstName} {profile.lastName}!
              </h4>
            </div>
            <div className="profile-info">
              <div className="profile-image">
                <img
                  src={
                    profile.imgURL
                      ? profile.imgURL
                      : "https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png"
                  }
                  alt=""
                />
              </div>
              <div className="profile-pen" id="edit-profile-pen">
                <FaPen onClick={openModal} />
              </div>
              <p>
                Department: {profile.department} <br></br> Team: {profile.team}
                <br></br> Email: {profile.email}
              </p>
              <div className="profile-location">
                <p>
                  <MdLocationOn />{" "}
                  {profile.location
                    ? profile.location
                    : "Add your location here."}
                </p>
              </div>
              <span className="profile-fika">
                <GiCoffeeCup />{" "}
                {profile.availableForFika
                  ? "Available For Fika"
                  : "Not available for Fika"}
              </span>
              <div className="profile-bio">
                <p>{profile.bio ? profile.bio : "Add your bio here."}</p>
              </div>
            </div>
          </>
        )}
      </section>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h4>Update your profile.</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInputChange}
            name="firstName"
            placeholder={profile.firstName}
          />
          <input
            type="text"
            onChange={handleInputChange}
            name="lastName"
            placeholder={profile.lastName}
          />
          <input
            type="text"
            onChange={handleInputChange}
            name="location"
            placeholder={
              profile.location ? profile.location : "Add your location here."
            }
          />

          <textarea type="text" onChange={handleInputChange} name="bio" />

          <label>
            <input
              type="checkbox"
              onChange={handleAvailability}
              defaultChecked={profile.availableForFika}
            />
            <span>
              <GiCoffeeCup /> Available For Fika
            </span>
          </label>
          <button type="submit">Save Changes</button>
        </form>
        <div>
          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleChange} />
            <br></br>
            <button disabled={!file}>upload to firebase</button>
          </form>
        </div>
        <p>
        
        </p>
          <button onClick={closeModal}>close</button>
        <p>
        </p>
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
    updateProfileImage: (userId, file) =>
      dispatch(updateProfileImage(userId, file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
