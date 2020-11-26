import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
import MyTeam from '../components/widgets/MyTeam';
import '../stylesheets/dashboard.css';
import MyDepartment from '../components/widgets/MyDepartment';

const Dashboard = ({ auth, profile }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  if (!auth.uid) {
    return <Redirect to='/signin' />;
  }

  return (
    <main className='main'>
      <section className='sidebar-layout'>
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
        />
      </section>
      <section
        className={`dashboard-layout
          ${sidebarIsOpen ? 'dashboard-sidebar' : 'dashboard-fullscreen'}
        `}>
        <div className='dashboard-welcome'></div>
        <MyTeam profile={profile} />
        <MyDepartment profile={profile} />
        <MyTeam profile={profile} />
        <MyDepartment profile={profile} />
        <MyTeam profile={profile} />
        <MyDepartment profile={profile} />
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
