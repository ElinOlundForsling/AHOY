import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { GiCoffeeCup } from 'react-icons/gi';
import '../../stylesheets/profile-modal.css';
import Button from '../layout/Button';

const ProfileModal = ({
  auth,
  profile,
  modalIsOpen,
  setModalIsOpen,
  updateProfile,
  updateProfileImage,
}) => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState(profile);

  useEffect(() => {
    setInfo(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  Modal.setAppElement('#root');

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

    updateProfileImage(auth.uid, file);
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
    <Modal
      className="Modal"
      overlayClassName="Overlay"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <h3 className="profile-modal-heading">Update your profile</h3>
      <div>
        <form onSubmit={handleUpload} className="profile-form">
          <label htmlFor="file">Profile Image</label>
          <div className="file-upload-wrapper" data-text="Select your file!">
            <input
              name="file-upload-field"
              type="file"
              className="file-upload-field"
              onChange={handleChange}
              value=""
            />
          </div>
          <br></br>
          <Button size="small" disabled={!file}>
            upload
          </Button>
        </form>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-input">
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
              profile.location ? profile.location : 'Add your location here.'
            }
          />
        </div>

        <textarea
          type="text"
          onChange={handleInputChange}
          name="bio"
          placeholder="Your bio here."
        />
        <label>
          <div className="fika-checkbox">
            <input
              type="checkbox"
              onChange={handleAvailability}
              defaultChecked={profile.availableForFika}
            />
            <GiCoffeeCup />{' '}
            <span className="fika-span">Available For Fika</span>
          </div>
        </label>
        <br></br>
        <hr />
        <Button size="small" type="submit">
          Save Changes
        </Button>
      </form>

      <p></p>
      <Button size="small" onClick={closeModal}>
        close
      </Button>
      <p></p>
    </Modal>
  );
};

export default ProfileModal;
