import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLatestHires } from '../../store/actions/departmentActions';
import Card from '../layout/Card';
import { Link } from 'react-router-dom';
import '../../stylesheets/myDepartment.css';
import '../../stylesheets/latestHires.css';

const LatestHires = ({ getLatestHires, latestHires }) => {
  useEffect(() => {
    getLatestHires();
  }, [latestHires]);

  return (
    <Card heading="Latest Hires" subHeading={'Say hi to your new colleagues'}>
      <div className="latest-hires">
        {latestHires.map((hire) => {
          return (
            <div key={hire.id}>
              <div className="member-card">
                <Link to={`/profiles/${hire.id}`}>
                  <div className="hire-avatar">
                    <img
                      src={
                        hire.imgURL
                          ? hire.imgURL
                          : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                      }
                    />
                  </div>
                  <div className="member-name">
                    {hire.firstName} {hire.lastName}
                    <p>Joined: {hire.joinDate}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    latestHires: state.departments.hires,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLatestHires: () => dispatch(getLatestHires()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestHires);
