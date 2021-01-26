import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getRandomMember } from '../../store/actions/profileActions';
import { getChat } from '../../store/actions/messageActions';
import { sendPersonalNotification } from '../../store/actions/notificationActions';
import '../../stylesheets/fikaModal.css';

const FikaModal = ({
  auth,
  profile,
  getChat,
  chatId,
  modalIsOpen,
  setModalIsOpen,
  getRandomMember,
  randomMember,
  sendPersonalNotification,
}) => {
  Modal.setAppElement('#root');

  useEffect(() => {
    getRandomMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    getChat(auth.uid, randomMember.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomMember]);

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleShuffle = event => {
    getRandomMember();
    event.preventDefault();
  };

  const handleRequest = event => {
    event.preventDefault();
    const today = new Date();
    const params = {
      senderId: auth.uid,
      senderName: profile.firstName,
      senderImgUrl: profile.imgURL,
      recipientId: randomMember.id,
      type: 'fikaRequest',
      chatId,
      expirationDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7,
      ),
    };
    sendPersonalNotification(params);
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
    chatId: state.chat.chatId,
    profile: state.firebase.profile,
    randomMember: state.profileData.randomMember,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomMember: () => dispatch(getRandomMember()),
    getChat: (id1, id2) => dispatch(getChat(id1, id2)),
    sendPersonalNotification: params =>
      dispatch(sendPersonalNotification(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FikaModal);
