import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
import CreateUser from '../components/admin/CreateUser';
import EditUsers from '../components/admin/EditUsers';
import UploadDocuments from '../components/admin/UploadDocuments';
import AddNotifications from '../components/admin/AddNotifications';
import CustomizeUX from '../components/admin/CustomizeUX';
import '../stylesheets/admin-panel.css';
import '../stylesheets/page.css';
import { render } from 'react-dom';

const AdminPanel = ({ profile, auth }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [adminComponent, setAdminComponent] = useState('EditUsers');

  const handleComponentChange = event => {
    setAdminComponent(event.target.name);
  };

  const renderSwitch = () => {
    switch (adminComponent) {
      case 'EditUsers':
        return <EditUsers />;
      case 'CreateUser':
        return <CreateUser />;
      case 'UploadDocuments':
        return <UploadDocuments />;
      case 'AddNotifications':
        return <AddNotifications />;
      case 'CustomizeUX':
        return <CustomizeUX />;
      default:
        return <EditUsers />;
    }
  };

  return (
    <>
      <section className='sidebar-layout'>
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
          sidebarIsOpen={sidebarIsOpen}
          isDashboard={false}
        />
      </section>
      <main
        className={`admin-layout
      ${sidebarIsOpen ? 'admin-sidebar' : 'admin-fullscreen'}
    `}>
        <header className='page-header'>
          <h1>Admin Panel</h1>
        </header>
        <nav className='admin-nav'>
          <ul class='admin-menu'>
            <li>
              <button
                className='admin-menu-button'
                name='EditUser'
                onClick={handleComponentChange}>
                Edit Users
              </button>
            </li>
            <li>
              <button
                className='admin-menu-button'
                name='CreateUser'
                onClick={handleComponentChange}>
                Create new User
              </button>
            </li>
            <li>
              <button
                className='admin-menu-button'
                name='UploadDocuments'
                onClick={handleComponentChange}>
                Upload Documents
              </button>
            </li>
            <li>
              <button
                className='admin-menu-button'
                name='AddNotifications'
                onClick={handleComponentChange}>
                Add Notifications
              </button>
            </li>
            <li>
              <button
                className='admin-menu-button'
                name='CustomizeUX'
                onClick={handleComponentChange}>
                Customize UX
              </button>
            </li>
          </ul>
        </nav>
        {renderSwitch()}
      </main>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
