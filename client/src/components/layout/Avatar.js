import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/avatar.css';

const Avatar = ({ id, imgURL, firstName, lastName, isOnline }) => {
  return (
    <div>
      <div key={id}>
        <div className="avatar-card">
          <Link to={`/profiles/${id}`}>
            <div className="avatar-image-normal">
              <img
                src={
                  imgURL
                    ? imgURL
                    : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                }
              />
            </div>
            <div class={isOnline ? 'logged-in' : 'logged-out'}></div>
            <div className="avatar-name">
              {firstName} {lastName}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
