import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLatestHires } from '../../store/actions/departmentActions';
import Card from '../layout/Card';
import Avatar from '../layout/Avatar';
import { GiHand } from 'react-icons/gi';

import '../../stylesheets/latestHires.css';

const LatestHires = ({ getLatestHires, latestHires }) => {
  useEffect(() => {
    getLatestHires();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('JOIN DATE', latestHires);
  return (
    <Card
      heading="Latest Hires"
      subHeading={'Say hi to your new colleagues'}
      className="latest-hires-component"
    >
      <div className="latest-hires">
        {latestHires.map((hire) => {
          return (
            <div
              style={{ position: 'relative' }}
              key={hire.id}
              className="latest-hired-card"
            >
              <Avatar
                id={hire.id}
                imgURL={hire.imgURL}
                firstName={hire.firstName}
                lastName={hire.lastName}
                isOnline={hire.isOnline}
                joinDate={hire.joinDate}
                className="small-size"
              />
              <GiHand className="latest-hires-wave-icon" color="#577590" />
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
