import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/dashboard.css';
import '../stylesheets/index.css';
import Sidebar from '../components/layout/Sidebar';
import MyTeam from '../components/widgets/MyTeam';
import LatestHires from '../components/widgets/LatestHires';
import Fika from '../components/widgets/Fika';
import Pong from '../components/widgets/Pong';
import Faq from '../components/widgets/Faq';
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
        <LatestHires profiles={profile} />
        <MyTeam profile={profile} />
        <Fika />
        <MyDepartment profile={profile} />
        <Pong />
        <Faq />
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
