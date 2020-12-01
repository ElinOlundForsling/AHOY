import React, { useEffect } from 'react';
import Card from '../layout/Card';
import { connect } from 'react-redux';
import { getUnreadNotifications } from '../../store/actions/notificationActions';

const Notifications = ({
  auth,
  getUnreadNotifications,
  unreadNotifications,
}) => {
  useEffect(() => {
    getUnreadNotifications(auth.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card heading='Notifications' className='notifications-component'>
      <h3>Unread</h3>
      {console.log('unreadNotifications: ', unreadNotifications[0])}
      {unreadNotifications.map(unread => {
        return <h6>{unread.senderName}</h6>;
      })}
      <h3>Personal</h3>
      <h3>Department</h3>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    unreadNotifications: state.notifications.unreadNotifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUnreadNotifications: id => dispatch(getUnreadNotifications(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
