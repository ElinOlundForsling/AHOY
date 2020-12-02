import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getRandomMember } from '../../store/actions/profileActions';
import { sendPersonalNotification } from '../../store/actions/notificationActions';
import '../../stylesheets/fikaModal.css';

const FikaModal = ({
  auth,
  profile,
  modalIsOpen,
  setModalIsOpen,
  getRandomMember,
  randomMember,
  sendPersonalNotification,
}) => {
  useEffect(() => {
    getRandomMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  Modal.setAppElement('#root');
  function closeModal() {
    setModalIsOpen(false);
  }

  const handleShuffle = event => {
    getRandomMember();
    event.preventDefault();
  };

  const handleRequest = event => {
    const today = new Date();
    const params = {
      senderId: auth.uid,
      senderName: profile.firstName,
      senderImgUrl: profile.imgURL,
      recipientId: randomMember.id,
      type: 'fikaRequest',
      expirationDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7,
      ),
    };
    sendPersonalNotification(params);
    event.preventDefault();
  };

  return (
    <Modal
      className='fika-modal'
      overlayClassName='Overlay'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Example Modal'>
      <h4>Random Fika with:</h4>
      <p>
        {randomMember.firstName} {randomMember.lastName}
      </p>
      <span>{randomMember.department}</span>
      <img
        src={
          randomMember.imgURL
            ? randomMember.imgURL
            : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
        }
        alt=''
      />
      <div className='fika-modal-button'>
        <button type='submit' onClick={handleShuffle}>
          Shuffle
        </button>
        <button type='submit' onClick={handleRequest}>
          Ask
        </button>

        <button onClick={closeModal}>close</button>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    randomMember: state.profileData.randomMember,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomMember: () => dispatch(getRandomMember()),
    sendPersonalNotification: params =>
      dispatch(sendPersonalNotification(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FikaModal);
