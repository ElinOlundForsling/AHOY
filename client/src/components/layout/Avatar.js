import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsHouseDoor } from 'react-icons/bs';
import moment from 'moment';
import '../../stylesheets/avatar.css';

const Avatar = (props) => {
  if (props.department) {
    return (
      <div className="avatar-card">
        <div className="dep-page-avatar-info">
          <Link to={`/profiles/${props.id}`}>
            <img
              alt="avatar"
              className={`avatar-image ${props.className}`}
              src={
                props.imgURL
                  ? props.imgURL
                  : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
              }
            />
            <div className="is-online">
              {props.className !== 'small-size' ? (
                <div className={props.isOnline ? 'logged-in' : 'logged-out'}>
                  <span className="tooltiptext">
                    {props.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="work-from">
              {props.className !== 'small-size' ? (
                <span>
                  {props.workFromHome ? (
                    <div className="home">
                      <BsHouseDoor />
                      <span className="tooltiptext">Home</span>
                    </div>
                  ) : (
                    <div className="office">
                      <HiOutlineOfficeBuilding />
                      <span className="tooltiptext">Office</span>
                    </div>
                  )}
                </span>
              ) : (
                ''
              )}
            </div>

            <div className="avatar-name">
              <p>{props.firstName} </p>
              {props.lastName ? <p>{props.lastName} </p> : ''}
              {props.team ? <p>{props.team} </p> : ''}
              <p>{props.title} </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div key={props.id}>
      <div className="avatar-card">
        <Link to={`/profiles/${props.id}`}>
          <img
            alt="avatar"
            className={`avatar-image ${props.className}`}
            src={
              props.imgURL
                ? props.imgURL
                : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
            }
          />

          {props.className !== 'small-size' ? (
            <div className={props.isOnline ? 'logged-in' : 'logged-out'}>
              <span className="tooltiptext">
                {props.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          ) : (
            ''
          )}
          <div className="name-remote">
            {props.className !== 'small-size' ? (
              <span>
                {props.workFromHome ? (
                  <div className="home">
                    <BsHouseDoor />
                    <span className="tooltiptext">Home</span>
                  </div>
                ) : (
                  <div className="office">
                    <HiOutlineOfficeBuilding />
                    <span className="tooltiptext">Office</span>
                  </div>
                )}
              </span>
            ) : (
              ''
            )}

            <div className="avatar-name">
              <p>{props.firstName} </p>
              {props.joinDate ? (
                <p className="latest-hired-date">
                  {' '}
                  {moment(Date.parse(props.joinDate)).format('DD/MM YYYY')}{' '}
                </p>
              ) : (
                ''
              )}
              {props.team ? <p>{props.team} </p> : ''}
              <p>{props.title} </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Avatar;
