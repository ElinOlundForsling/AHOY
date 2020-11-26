import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getRandomMember } from '../../store/actions/profileActions';

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
    event.preventDefault();
  };

  return (
    <Modal
      className='Modal'
      overlayClassName='Overlay'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Example Modal'>
      <h4>Random Fika</h4>
      <p>{randomMember.name}</p>
      <button type='submit' onClick={handleShuffle}>
        Shuffle
      </button>
      <button type='submit' onClick={handleRequest}>
        Request
      </button>
      <p></p>
      <button onClick={closeModal}>close</button>
      <p></p>
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
