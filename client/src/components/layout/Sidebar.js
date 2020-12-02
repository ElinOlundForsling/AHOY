import '../../stylesheets/sidebar.css';
import '../../stylesheets/dashboard.css';
import '../../stylesheets/sidebar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import React from 'react';
import { CgProfile, CgStyle } from 'react-icons/cg';
import { BsGrid } from 'react-icons/bs';
import { VscSignOut, VscKey } from 'react-icons/vsc';
import WorkingFromToggle from './WorkingFromToggle';
import MyTeam from '../../components/widgets/MyTeam';
import LatestHires from '../../components/widgets/LatestHires';
import Fika from '../../components/widgets/Fika';
import Pong from '../../components/widgets/Pong';
import Documents from '../../components/widgets/Documents';
import Faq from '../../components/widgets/Faq/Faq';
import Calendar from '../../components/widgets/Calendar';
import MyDepartment from '../../components/widgets/MyDepartment';

const Sidebar = ({
  addCard,
  deleteCard,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {profile.isLoaded && (
        <div
          className="side-bar"
          style={{
            transform: `translatex(${xPosition}px)`,
            width: width,
            minHeight: height,
          }}
        >
          <div className="avatar-section">
            <img
              src={
                profile.imgURL
                  ? profile.imgURL
                  : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
              }
              alt=""
              className="dashboard-avatar"
            />

            <WorkingFromToggle profile={profile} auth={auth} />
          </div>
          <Link to={'/'}>
            <span>
              <BsGrid className="sidebar-icon" />
              &nbsp;Dashboard
            </span>
          </Link>

          <Link to={`/profiles/${auth.uid}`}>
            <span>
              <CgProfile className="sidebar-icon" />
              &nbsp;Profile
            </span>
          </Link>
          <Link to={`/${auth.uid}/department`}>
            <span>
              <CgStyle className="sidebar-icon" />
              &nbsp;Department
            </span>
          </Link>
          <Link to="/admin">
            <span>
              <VscKey className="sidebar-icon" />
              &nbsp; Admin Panel
            </span>
          </Link>
          <div className="sign-out">
            <a onClick={() => signOut(auth)}>
              {' '}
              <span>
                <VscSignOut className="sidebar-icon" />
                &nbsp;Sign Out
              </span>
            </a>
          </div>
          <nav role="navigation">
            <ul>
              <li className="dropdown">
                <p>Widgets</p>
                <ul className="dropdown">
                  <button
                    style={{
                      backgroundColor: 'var(--color-5',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() => addCard(<Faq />)}
                  >
                    FAQ
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--color-4)',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() => addCard(<Pong />)}
                  >
                    PONG
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--color-6)',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() =>
                      addCard(
                        <MyTeam deleteCard={deleteCard} profile={profile} />
                      )
                    }
                  >
                    TEAMS
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--color-1)',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() => addCard(<MyDepartment profile={profile} />)}
                  >
                    DEPARTMENT
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--color-2)',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() => addCard(<Calendar />)}
                  >
                    CALENDAR
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--color-7)',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() => addCard(<Documents />)}
                  >
                    DOCUMENTS
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--color-lighter-7)',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() => addCard(<Fika />)}
                  >
                    VIRTUAL FIKA
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--color-3)',
                      color: 'white',
                      fontSize: '1rem',
                    }}
                    onClick={() => addCard(<LatestHires profiles={profile} />)}
                  >
                    LATEST HIRES
                  </button>
                </ul>
              </li>
            </ul>
          </nav>
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (auth) => dispatch(signOut(auth)),
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);
