import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GiCoffeeCup } from "react-icons/gi";
import Modal from "react-modal";
import { updateProfile } from "../store/actions/profileActions";
import "../stylesheets/profilePage.css";
import { storage } from "../config/fbConfig";
import firebase from "../config/fbConfig";

const ProfilePage = ({ auth, profile, updateProfile }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [info, setInfo] = useState("");
  const allInputs = { imgUrl: "" };
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  useEffect(() => {
    setInfo(profile);
  }, [profile]);

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
    console.log(info);
    event.preventDefault();
    updateProfile(auth.uid, info);
    closeModal();
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
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          firebase
            .firestore()
            .collection("users")
            .doc(auth.uid)
            .set(
              {
                imgURL: url,
              },
              { merge: true }
            )
            .then(() => {
              setURL("");
            });
        });
    });
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
              <h2>
                Welcome, {profile.firstName} {profile.lastName}!
              </h2>
            </div>
            <div className="profile-info">
              <div className="profile-pen">
                <FaPen onClick={openModal} />
              </div>
              <div className="profile-image">
                <img src={profile.imgURL ? profile.imgURL : ""} alt="" />
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
              <span>
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
          <p>
            <button type="submit">Save Changes</button>
          </p>
          <p>
            <button onClick={closeModal}>close</button>
          </p>
        </form>
        <div>
          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleChange} />
            <button disabled={!file}>upload to firebase</button>
          </form>
        </div>
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
