import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, getMessages } from '../store/actions/messageActions';
import { connect } from 'react-redux';

export const Chat = ({
  auth,
  profileData,
  profile,
  chatId,
  sendMessage,
  getMessages,
  messages,
}) => {
  const [params, setParams] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    sendMessage(params);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    getMessages(chatId);
  }, [chatId, sendMessage]);

  const handleInputChange = event => {
    setParams({
      chatId,
      senderId: auth.uid,
      senderName: profile.firstName,
      recipientId: profileData.id,
      text: event.target.value,
    });
  };

  return (
    <div>
      {messages &&
        messages.map(message => {
          return (
            <p>
              {message.senderName}: {message.text}
            </p>
          );
        })}
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
    messages: state.chat.messages,
    profile: state.firebase.profile,
    profileData: state.profileData.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: params => dispatch(sendMessage(params)),
    getMessages: chatId => dispatch(getMessages(chatId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
