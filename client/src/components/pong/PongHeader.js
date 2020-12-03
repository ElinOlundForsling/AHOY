import React from 'react';
import '../../stylesheets/pong.css';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

const PongHeader = ({ userScore, opponentScore }) => {
  return (
    <header className='pong-header'>
      <div className='header-block back-block'>
        <Link to='/'>
          <div className='header-circle'>
            <IoIosArrowRoundBack className='back-icon' />
          </div>
          <p>Dashboard</p>
        </Link>
      </div>
      <div className='header-block score-block'>
        <div className='score-layout'>
          <h2>Your Score</h2>
          <h1>{userScore}</h1>
        </div>
        <div className='score-layout'>
          <h2>Bishop's Score</h2>
          <h1>{opponentScore}</h1>
        </div>
      </div>
      <div className='header-block points-block'>
        <div className='score-layout'>
          <h2>Your points</h2>
          <h1
            style={{
              color: `${userScore - opponentScore < 0 ? '#fba09d' : 'white'}`,
            }}>
            {userScore - opponentScore}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default PongHeader;
