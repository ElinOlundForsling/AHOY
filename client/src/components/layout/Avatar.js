import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/avatar.css';

const Avatar = props => {
  return (
    <div>
      <div key={props.id}>
        <div className='avatar-card'>
          <Link to={`/profiles/${props.id}`}>
            <div>
              <img
                alt='avatar'
                className={`avatar-image ${props.className}`}
                src={
                  props.imgURL
                    ? props.imgURL
                    : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                }
              />
            </div>
            {props.className !== 'small-size' ? (
              <div className={props.isOnline ? 'logged-in' : 'logged-out'}>
                <span className='tooltiptext'>
                  {props.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            ) : (
              ''
            )}
            <div className='avatar-name'>
              {props.firstName} {props.lastName}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
