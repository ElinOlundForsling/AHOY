import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, getMessages } from '../store/actions/messageActions';
import { connect } from 'react-redux';
import '../stylesheets/chat.css';

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
  const [chatText, setChatText] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    setChatText('');
    sendMessage(params);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    getMessages(chatId);
  }, [chatId, sendMessage, messages]);

  const handleInputChange = event => {
    setChatText(event.target.value);
    setParams({
      chatId,
      senderId: auth.uid,
      senderName: profile.firstName,
      recipientId: profileData.id,
      text: event.target.value,
    });
  };

  return (
    <div className='chat-page'>
      <div className='chat-container'>
        <div className='chat-messages'>
          {messages &&
            messages.map(message => {
              if (message.senderId === auth.uid) {
                return (
                  <p className='sender-msg msg-bubble'>{message.text} :You</p>
                );
              } else {
                return (
                  <p className='recepient-msg msg-bubble'>
                    {message.senderName}: {message.text}
                  </p>
                );
              }
            })}
        </div>
        <form onSubmit={handleSubmit} className='chat-form'>
          <textarea
            value={chatText}
            type='text'
            onChange={handleInputChange}
            name='message'
            className='chat-text-area'
            placeholder='Start a discussion...'
          />
          <button type='submit' className='chat-button'>
            Send Message
          </button>
        </form>
      </div>
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
