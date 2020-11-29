import React, { useRef, useEffect, useState } from 'react';
import '../stylesheets/pong.css';

const Pong = () => {
  const canvasWidth = 600;
  const canvasHeight = 400;
  /* some extra variables */
  const netWidth = 4;
  const netHeight = canvasHeight;

  const paddleWidth = 10;
  const paddleHeight = 100;

  const [downArrow, setDownArrow] = false;
  const [upArrow, setUpArrow] = false;

  // user paddle
  const user = {
    x: 10,
    y: canvasHeight / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0,
  };

  const ai = {
    x: canvasWidth - (paddleWidth + 10),
    y: canvasHeight / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0,
  };

  // ball
  const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: '#05EDFF',
  };

  const ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  });

  return (
    <div>
      <canvas
        ref={ref}
        id='canvas'
        width={canvasWidth}
        height={canvasHeight}></canvas>
    </div>
  );
};

export default Pong;
