import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getRandomMember } from '../../store/actions/profileActions';
// import '../../stylesheets/modal.css';
import '../../stylesheets/fikaModal.css';

const FikaModal = ({
  modalIsOpen,
  setModalIsOpen,
  getRandomMember,
  randomMember,
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
    event.preventDefault();
  };

  const handleRequest = event => {
    getRandomMember();
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
        <button type='submit' onClick={handleRequest}>
          Shuffle
        </button>
        <button type='submit' onClick={handleShuffle}>
          Request
        </button>

        <button onClick={closeModal}>close</button>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    randomMember: state.profileData.randomMember,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomMember: () => dispatch(getRandomMember()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FikaModal);
