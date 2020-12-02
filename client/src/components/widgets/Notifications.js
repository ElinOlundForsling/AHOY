import React, { useEffect, useState } from 'react';
import Card from '../layout/Card';
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
      <h3>Unread</h3>
      {msg.map(unread => {
        return <p key={unread.expirationDate}>unread.senderName</p>;
      })}
      <h3>Personal</h3>
      <h3>Department</h3>
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
