import React, { useEffect, useState, useRef } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import { connect } from 'react-redux';
import {
  getUnreadNotifications,
  deleteNotifications,
} from '../../store/actions/notificationActions';

const Notifications = ({
  auth,
  getUnreadNotifications,
  deleteNotifications,
  unreadNotifications,
}) => {
  const [msg, setMsg] = useState(unreadNotifications);
  useEffect(() => {
    getUnreadNotifications(auth.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMsg(unreadNotifications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadNotifications]);

  const handleDelete = notification => {
    console.log('handleDelete: ', notification.id, auth.uid);
    deleteNotifications(notification.id, auth.uid);
  };

  return (
    <Card heading='Notifications' className='notifications-component'>
      <h3 className='sub-title'>Unread</h3>
      <ul className='split-list'>
        {msg.length > 0 ? (
          msg.map(unread => {
            if (unread.type === 'fikaRequest') {
              return (
                <li>
                  <span>{unread.senderName} wants to have a fika! </span>
                  <span>
                    {console.log(unread.chatId)}
                    <Button size='small' to={`/chat/${unread.chatId}`}>
                      Accept
                    </Button>
                    &nbsp;
                    <Button
                      size='small'
                      danger='danger'
                      name={unread.id}
                      onClick={handleDelete}>
                      X
                    </Button>
                  </span>
                </li>
              );
            } else if (unread.type === 'fika') {
              return (
                <li>
                  {unread.senderName} wants to play Pong!{' '}
                  <button>Accept</button>
                  <button>Decline</button>
                </li>
              );
            } else {
              return <p>{unread.senderName} wants to chat!</p>;
            }
          })
        ) : (
          <p>
            <i>No unread notifications</i>
          </p>
        )}
      </ul>
      <h3 className='sub-title'>Read</h3>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    unreadNotifications: state.notifications.unreadNotifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUnreadNotifications: id => dispatch(getUnreadNotifications(id)),
    deleteNotifications: (notificationId, userId) =>
      dispatch(deleteNotifications(notificationId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
