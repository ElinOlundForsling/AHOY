import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
import '../stylesheets/dashboard.css';

const Dashboard = ({ auth, profile }) => {
  if (!auth.uid) {
    return <Redirect to='/signin' />;
  }
  return (
    <div>
      <div className='dashboard-welcome'></div>
      <Sidebar width={200} auth={auth} profile={profile} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Dashboard);
