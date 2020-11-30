import '../../stylesheets/sidebar.css';
import '../../stylesheets/dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import React from 'react';
import { CgProfile, CgCalendar, CgStyle } from 'react-icons/cg';
import { BsGrid } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { VscSignOut, VscKey } from 'react-icons/vsc';

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
          className="side-bar"
          style={{
            transform: `translatex(${xPosition}px)`,
            width: width,
            minHeight: height,
          }}
        >
          <img
            src={
              profile.imgURL
                ? profile.imgURL
                : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
            }
            alt=""
            className="dashboard-avatar"
          />
          <p>Hi, {profile.firstName}</p>
          <Link to={'/'}>
            <span>
              <BsGrid className="sidebar-icon" />
              &nbsp; Dashboard
            </span>
          </Link>

          <Link to={`/profiles/${auth.uid}`}>
            <span>
              <CgProfile className="sidebar-icon" />
              &nbsp; Profile
            </span>
          </Link>
          <Link to="/">
            <span>
              <CgStyle className="sidebar-icon" />
              &nbsp; Department
            </span>
          </Link>
          <Link to="/">
            <span>
              <CgCalendar className="sidebar-icon" />
              &nbsp; Calendar
            </span>
          </Link>
          <Link to="/">
            {' '}
            <span>
              <AiOutlineSetting className="sidebar-icon" />
              &nbsp; Settings
            </span>
          </Link>
          <div className="sign-out">
            <a onClick={() => signOut(auth)}>
              {' '}
              <span>
                <VscSignOut className="sidebar-icon" />
                &nbsp; Sign Out
              </span>
            </a>
          </div>
          <Link to="/admin">
            <span>
              <VscKey className="sidebar-icon" />
              &nbsp; Admin Panel
            </span>
          </Link>
          <button
            onClick={() => toggleMenu()}
            className="toggle-menu"
            style={{
              transform: `translate(${width}px, 20vh)`,
            }}
          ></button>
          <div className="content">{children}</div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (auth) => dispatch(signOut(auth)),
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);
