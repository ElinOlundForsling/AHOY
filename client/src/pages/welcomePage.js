import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const welcomePage = ({ auth, profile }) => {
  if (!auth.uid) {
    return <Redirect to='/signin' />;
  }
  return (
    <div>
      <h1>
        Welcome, {profile.firstName} {profile.lastName}!
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(welcomePage);
