import React from 'react';
import Card from '../layout/Card';
import { connect } from 'react-redux';

const Notifications = () => {
  return (
    <Card heading='Notifications' className='notifications-component'>
      <h3>Unread</h3>
      <h3>Personal</h3>
      <h3>Department</h3>
    </Card>
  );
};

export default Notifications;
