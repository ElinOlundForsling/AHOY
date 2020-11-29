import React from 'react';
import '../../stylesheets/pong.css';

const PongBall = ({ x, y }) => {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        top: `${y}px`,
        left: `${x}px`,
        position: 'absolute',
        backgroundColor: 'white',
      }}
      className='PongBall'
    />
  );
};

export default PongBall;
