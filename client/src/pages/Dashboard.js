import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/dashboard.css';
import Sidebar from '../components/layout/Sidebar';
import MyTeam from '../components/widgets/MyTeam';
import Fika from '../components/widgets/Fika';
import MyDepartment from '../components/widgets/MyDepartment';
import Calender from '../components/widgets/Calender';

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
        <Fika />
        <MyDepartment profile={profile} />
        <Fika />
        <MyDepartment profile={profile} />
        <MyTeam profile={profile} />
        <Calender />
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
