import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  sendMessage,
  getMessagesListener,
  getUserIds,
} from '../store/actions/messageActions';
import Sidebar from '../components/layout/Sidebar';
import { connect } from 'react-redux';
import '../stylesheets/chat.css';
import Button from '../components/layout/Button';

export const Chat = ({
  auth,
  profile,
  sendMessage,
  getMessagesListener,
  getUserIds,
  userIds,
  messages,
}) => {
  const [params, setParams] = useState({});
  const [chatText, setChatText] = useState('');
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const handleSubmit = event => {
    event.preventDefault();
    setChatText('');
    sendMessage(params);
  };

  const isFirstRun = useRef(true);
  const chat = useParams().chatId;

  useEffect(() => {
    getUserIds(chat);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMessagesListener(chat, 'subscribe');
    return function cleanup() {
      getMessagesListener(chat, 'unsubscribe');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = event => {
    setChatText(event.target.value);
    setParams({
      chatId: chat,
      senderId: auth.uid,
      senderName: profile.firstName,
      recipientId: userIds[0] === auth.uid ? userIds[0] : userIds[1],
      text: event.target.value,
    });
  };

  return (
    <>
      <section className='sidebar-layout'>
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
          sidebarIsOpen={sidebarIsOpen}
          isDashboard={false}
        />
      </section>
      <main
        className={`chat-layout
      ${sidebarIsOpen ? 'chat-sidebar' : 'chat-fullscreen'}
    `}>
        <div className='chat-page'>
          <div className='chat-container'>
            <div className='chat-messages'>
              {messages &&
                messages.map(message => {
                  if (message.senderId === auth.uid) {
                    return (
                      <p className='sender-msg msg-bubble' key={message.date}>
                        You: {message.text}
                      </p>
                    );
                  } else {
                    return (
                      <p
                        className='recepient-msg msg-bubble'
                        key={message.date}>
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
              <Button type='submit' className='small'>
                Send Message
              </Button>
            </form>
            <br></br>
            <Button to={`/profiles/${userIds[0]}`}>Close</Button>
          </div>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    messages: state.chat.messages,
    userIds: state.chat.userIds,
    profile: state.firebase.profile,
    profileData: state.profileData.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: params => dispatch(sendMessage(params)),
    getMessagesListener: (chatId, status) =>
      dispatch(getMessagesListener(chatId, status)),
    getUserIds: chatId => dispatch(getUserIds(chatId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
