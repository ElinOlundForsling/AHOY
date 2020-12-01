import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDepartmentTeams,
  department,
} from "../store/actions/departmentActions";
import { getDepartmentMembers } from "../store/actions/profileActions";
import Sidebar from "../components/layout/Sidebar";
import "../stylesheets/departmentPage.css";
import { v4 as uuidv4 } from "uuid";

const Department = ({
  profile,
  getDepartmentTeams,
  departmentMembers,
  getDepartmentMembers,
  department,
  auth,
}) => {
  const userId = useParams().userId;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  useEffect(() => {
    console.log("CAREFUL YOU MIGHT HAVE CREATED AN INFINITE LOOP");
    getDepartmentTeams(userId);
    getDepartmentMembers(profile.department);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

//   useEffect(() => {
//     console.log("CAREFUL YOU MIGHT HAVE CREATED AN INFINITE LOOP");

//     getDepartmentMembers(profile.department);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  console.log("DEP MEMBERS", departmentMembers);
  console.log("DEP", department);
  return (
    <div className="department-page">
      <section className="sidebar-layout">
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
        />
      </section>
      <div className="department-info">
        <h1>MY DEPARTMENT</h1>
        <div>
          {department.length && (
            <div>
              <h2>TEAMS</h2>
              {department.map((dep) => {
                return <p key={uuidv4()}>{dep.teamName}</p>;
              })}
            </div>
          )}
        </div>
        <div>
          <h2>Department members</h2>
          {departmentMembers && (
            <div>
              {departmentMembers.map((member) => {
                return (
                  <p key={uuidv4()}>
                    {member.firstName} {member.lastName}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    department: state.departments.department,
    departmentMembers: state.profileData.departmentMembers,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
