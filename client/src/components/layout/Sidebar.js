import '../../stylesheets/sidebar.css';
import '../../stylesheets/dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import React from 'react';

const Sidebar = ({
  width,
  height,
  children,
  profile,
  auth,
  signOut,
  setSidebarIsOpen,
}) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    console.log('Toggle');
    if (xPosition < 0) {
      setX(0);
      setSidebarIsOpen(true);
    } else {
      setX(-width);
      setSidebarIsOpen(false);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);

  return (
    <React.Fragment>
      {profile.isLoaded && (
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
          <Link to={`/profiles/${auth.uid}`}>Profile</Link>
          <Link to='/'>Department</Link>
          <Link to='/'>Calendar</Link>
          <Link to='/'>Settings</Link>
          <div className='sign-out'>
            <a onClick={signOut}>Sign Out</a>
          </div>
          <button
            onClick={() => toggleMenu()}
            className='toggle-menu'
            style={{
              transform: `translate(${width}px, 20vh)`,
            }}></button>
          <div className='content'>{children}</div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);
