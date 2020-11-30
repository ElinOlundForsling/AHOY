import React from 'react';
import '../../stylesheets/pong.css';

const PongPaddle = ({ onKeyDown, tabIndex, x, y }) => {
  return (
    <div
      role='button'
      onKeyDown={onKeyDown}
      className='Paddle'
      tabIndex={tabIndex}
      style={{
        width: '15px',
        height: '150px',
        position: 'absolute',
        backgroundColor: '#ffffff',
        opacity: '0.7',
        top: `${y}px`,
        left: `${x}px`,
      }}>
      <input type='text' className='paddleInput' />
    </div>
  );
};

export default PongPaddle;
