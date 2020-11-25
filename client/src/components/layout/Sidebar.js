import '../../stylesheets/sidebar.css';
import '../../stylesheets/dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import React from 'react';

const Sidebar = ({ width, height, children, profile, auth, signOut }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className='side-bar'
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height,
        }}>
        <img
          src={
            profile.imgURL
              ? profile.imgURL
              : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
          }
          alt=''
          className='dashboard-avatar'
        />
        <p>Profile</p>
        <p>Deparment</p>
        <p>Calendar</p>
        <p>Settings</p>
        <p>Sign out</p>
        <button
          onClick={() => toggleMenu()}
          className='toggle-menu'
          style={{
            transform: `translate(${width}px, 20vh)`,
          }}></button>
        <div className='content'>{children}</div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);
