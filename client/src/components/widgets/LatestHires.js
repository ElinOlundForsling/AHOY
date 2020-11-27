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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestHires]);

  return (
    <Card
      heading='Latest Hires'
      subHeading={'Say hi to your new colleagues'}
      className='latest-hires-component'>
      <div className='latest-hires'>
        {latestHires.map(hire => {
          return (
            <div key={hire.id}>
              <div className='latest-hired-card'>
                <Link to={`/profiles/${hire.id}`}>
                  <div className='hire-avatar'>
                    <img
                      src={
                        hire.imgURL
                          ? hire.imgURL
                          : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                      }
                    />
                  </div>
                  <div className='latest-hired-name'>
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

const mapStateToProps = state => {
  return {
    latestHires: state.departments.hires,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLatestHires: () => dispatch(getLatestHires()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestHires);
