import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
import MyTeam from '../components/widgets/MyTeam';
import '../stylesheets/dashboard.css';

const Dashboard = ({ auth, profile }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  if (!auth.uid) {
    return <Redirect to='/signin' />;
  }
  console.log(sidebarIsOpen);
  return (
    <main>
      <section className='sidebar-layout'>
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
        />
      </section>
      <section
        className={
          sidebarIsOpen ? 'dashboard-layout' : 'dashboard-layout-fullscreen'
        }>
        <div className='dashboard-welcome'></div>
        <MyTeam profile={profile} />
      </section>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Dashboard);
