import React, { useEffect, useState } from 'react';
import Card from '../layout/Card';
import Button from '../layout/Button';
import { connect } from 'react-redux';
import { getUnreadNotifications } from '../../store/actions/notificationActions';

const Notifications = ({
  auth,
  getUnreadNotifications,
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

  return (
    <Card heading='Notifications' className='notifications-component'>
      <h3 className='sub-title'>Unread</h3>
      <ul className='split-list'>
        {msg.map(unread => {
          if (unread.type === 'fikaRequest') {
            return (
              <li>
                <span>{unread.senderName} wants to have a fika! </span>
                <span>
                  <Button size='small'>Accept</Button>&nbsp;
                  <Button size='small'>Decline</Button>
                </span>
              </li>
            );
          } else if (unread.type === 'fika') {
            return (
              <li>
                {unread.senderName} wants to play Pong! <button>Accept</button>
                <button>Decline</button>
              </li>
            );
          } else {
            return <p>{unread.senderName} wants to chat!</p>;
          }
        })}
      </ul>
      <h3 className='sub-title'>Personal</h3>
      <h3 className='sub-title'>Department</h3>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
