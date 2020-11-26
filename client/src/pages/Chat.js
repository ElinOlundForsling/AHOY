import React, { useState } from 'react';
import { sendMessage } from '../store/actions/messageActions';
import { connect } from 'react-redux';

export const Chat = ({ auth, profileData, profile, chatId, sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    sendMessage(chatId, auth.uid, profileData.id, message);
  };

  const handleInputChange = event => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea type='text' onChange={handleInputChange} name='message' />
        <button type='submit'>Send Message</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    chatId: state.chat.chatId,
    profile: state.firebase.profile,
    profileData: state.profileData.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (senderId, senderName, recipientId, text) =>
      dispatch(sendMessage(senderId, senderName, recipientId, text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
