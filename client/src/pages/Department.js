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
      <section className='sidebar-layout'>
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />
      </section>
      <div className='department-page'>
        {profile.department && <h2>{profile.department}</h2>}

        <div className='department-information-container'>
          <div className='department-container-calendar'>
            <h2>DEPARTMENT CALENDAR</h2>
            <iframe
              src='https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FStockholm&amp;src=Y184NHE3bWpkOXB1MjR1ZmFidmFnMHNhNnN1b0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4uc3dlZGlzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23009688&amp;color=%230B8043&amp;showTz=0&amp;showCalendars=1&amp;showTabs=0&amp;showPrint=0&amp;showNav=0&amp;showTitle=0'
              width='450px'
              height='300px'
              border='none'></iframe>
          </div>

          <div className='department-container-news-title'>
            <h2>DEPARTMENT NEWS</h2>
            <div className='department-container-news'>
              <div class='f-card'>
                <div class='news-header'>
                  <div class='options'>
                    <i class='fa fa-chevron-down'></i>
                  </div>
                  <img
                    class='co-logo'
                    src='https://images-platform.99static.com//y50FdI4Or7filffZ5qSXAn5YMTI=/0x0:2000x2000/fit-in/500x500/projects-files/71/7131/713106/ec5bd3a0-f210-4729-ae13-51241c5657eb.jpg'
                  />
                  <div class='co-name'>
                    <a href='#'>Marketing</a>
                  </div>
                  <div class='time'>
                    <a href='#'>2hrs</a> · <i class='fa fa-globe'></i>
                  </div>
                </div>
                <div class='content'>
                  <p>
                    Take part: Marketing Week’s annual Career and Salary Survey
                    is now open
                  </p>
                </div>

                <div class='reference'>
                  <img
                    class='reference-thumb'
                    src='https://media.istockphoto.com/videos/making-the-right-choices-for-the-company-video-id859579214?s=640x640'
                  />
                  <div class='reference-content'>
                    <div class='reference-title'>
                      Help us create the marketing industry’s most robust report
                      into careers, salaries and workplace trends. |
                      MARKETING.it
                    </div>
                    <div class='reference-subtitle'>
                      Are you paid fairly? How has Covid-19 impacted your role?
                      Which is the best sector to work in? Has the gender pay
                      gap improved?
                    </div>
                    <div class='reference-font'>Marketing.it</div>
                  </div>
                </div>
                <div class='social'>
                  <div class='social-content'></div>
                  <div class='social-buttons'>
                    <span>
                      <i class='fa fa-thumbs-up'></i>Like
                    </span>
                    <span>
                      <i class='fa fa-comment'></i>Comment
                    </span>
                    <span>
                      <i class='fa fa-share'></i>Share
                    </span>
                  </div>
                </div>
              </div>

              <div class='f-card'>
                <div class='news-header'>
                  <div class='options'>
                    <i class='fa fa-chevron-down'></i>
                  </div>
                  <img
                    class='co-logo'
                    src='https://images-platform.99static.com//y50FdI4Or7filffZ5qSXAn5YMTI=/0x0:2000x2000/fit-in/500x500/projects-files/71/7131/713106/ec5bd3a0-f210-4729-ae13-51241c5657eb.jpg'
                  />
                  <div class='co-name'>
                    <a href='#'>Marketing</a>
                  </div>
                  <div class='time'>
                    <a href='#'>18hrs</a> · <i class='fa fa-globe'></i>
                  </div>
                </div>
                <div class='content'>
                  <p>
                    Market research spend slumps as shift to digital and Covid
                    hit See More
                  </p>
                </div>

                <div class='reference'>
                  <img
                    class='reference-thumb'
                    src='https://1gb82h2px4rr3s7tp94g0nt1-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Financial-chart.jpg'
                  />
                  <div class='reference-content'>
                    <div class='reference-title'>
                      With the coronavirus crisis causing marketers to pull back
                      even further on market research expenditure, how can the
                      sector rebound and stay relevant?
                    </div>
                    <div class='reference-subtitle'>
                      Market research is suffering from a long-term decline in
                      investment that is being heightened by the Covid-19
                      pandemic, according to data exclusively compiled by
                      Marketing Week.
                    </div>
                    <div class='reference-font'>Marketing.it</div>
                  </div>
                </div>
                <div class='social'>
                  <div class='social-content'></div>
                  <div class='social-buttons'>
                    <span>
                      <i class='fa fa-thumbs-up'></i>Like
                    </span>
                    <span>
                      <i class='fa fa-comment'></i>Comment
                    </span>
                    <span>
                      <i class='fa fa-share'></i>Share
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='department-members'>
          <div className='department-container-title'>
            <h3>Teams:</h3>
          </div>
          {department.length && (
            <div className='department-container-teams'>
              {department.map(dep => {
                return <p key={uuidv4()}>{dep.teamName}</p>;
              })}
            </div>
          )}
        </div>

        <div className='department-members'>
          <div className='department-container-title'>
            <h3>My Department:</h3>
          </div>
          <div className='department-container-avatar'>
            {departmentMembers.map(member => {
              return (
                <Avatar
                  department={department}
                  key={member.id}
                  id={member.id}
                  imgURL={member.imgURL}
                  firstName={member.firstName}
                  title={member.title}
                  team={member.team}
                  isOnline={member.isOnline}
                  workFromHome={member.workFromHome}
                  className='normal-size'
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    department: state.departments.department,
    departmentMembers: state.profileData.departmentMembers,
    teamMembers: state.profileData.teamMembers,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDepartmentTeams: departmentId =>
      dispatch(getDepartmentTeams(departmentId)),
    getDepartmentMembers: department =>
      dispatch(getDepartmentMembers(department)),
    getTeamMembers: team => dispatch(getTeamMembers(team)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
