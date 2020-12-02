import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getDepartmentTeams,
  department,
} from '../store/actions/departmentActions';
import {
  getDepartmentMembers,
  getTeamMembers,
} from '../store/actions/profileActions';
import Sidebar from '../components/layout/Sidebar';
import '../stylesheets/departmentPage.css';
import '../stylesheets/profilePage.css';
import Avatar from '../components/layout/Avatar';
import { v4 as uuidv4 } from 'uuid';

const Department = ({
  profile,
  getDepartmentTeams,
  departmentMembers,
  getTeamMembers,
  teamMembers,
  getDepartmentMembers,
  department,
  auth,
}) => {
  const userId = useParams().userId;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  useEffect(() => {
    getDepartmentTeams(userId);
    getDepartmentMembers(profile.department);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <>
      <section className="sidebar-layout">
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
        />
      </section>
      <div className="department-page">
        {profile.department && <h1>{profile.department}</h1>}

        <div className="department-information-container">
          <div className="department-container-calendar">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FStockholm&amp;src=Y184NHE3bWpkOXB1MjR1ZmFidmFnMHNhNnN1b0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4uc3dlZGlzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23009688&amp;color=%230B8043&amp;showTz=0&amp;showCalendars=1&amp;showTabs=0&amp;showPrint=0&amp;showNav=0&amp;showTitle=0"
              width="450px"
              height="300px"
              border="none"
            ></iframe>
          </div>

          <div className="department-container-news">
            <h1>LATEST DEPARTMENT NEWS</h1>
          </div>
        </div>

        <div className="department-members">
          <div className="department-container-title">
            <h3>Teams:</h3>
          </div>
          {department.length && (
            <div className="department-container-teams">
              {department.map((dep) => {
                return <p key={uuidv4()}>{dep.teamName}</p>;
              })}
            </div>
          )}
        </div>

        <div className="department-members">
          <div className="department-container-title">
            <h3>My Department:</h3>
          </div>
          <div className="department-container-content">
            {departmentMembers.map((member) => {
              return (
                <Avatar
                  key={member.id}
                  id={member.id}
                  imgURL={member.imgURL}
                  firstName={member.firstName}
                  title={member.title}
                  team={member.team}
                  isOnline={member.isOnline}
                  workFromHome={member.workFromHome}
                  className="normal-size"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    department: state.departments.department,
    departmentMembers: state.profileData.departmentMembers,
    teamMembers: state.profileData.teamMembers,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartmentTeams: (departmentId) =>
      dispatch(getDepartmentTeams(departmentId)),
    getDepartmentMembers: (department) =>
      dispatch(getDepartmentMembers(department)),
    getTeamMembers: (team) => dispatch(getTeamMembers(team)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
