import React, { useState, useEffect, useRef } from 'react';

const PongVanilla = () => {
  const ref = useRef();

  const [canvas, setCanvas] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [net, setNet] = useState({
    x: canvas.width / 2 - 4 / 2,
    y: 0,
    width: 4,
    height: canvas.height,
    color: '#FFF',
  });

  useEffect(() => {
    setCanvas(ref.current);
    const tempCanvas = ref.current;
    let context = tempCanvas.getContext('2d');
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const paddleWidth = 10;
  const paddleHeight = 100;

  const userVelocity = 6;

  const [user, setUser] = useState({
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    velocity: userVelocity,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0,
  });

  const [ai, setAi] = useState({
    x: canvas.width - (paddleWidth + 10),
    y: canvas.height / 2 - paddleHeight / 2,
    velocity: 8,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0,
  });

  // ball
  const [ball, setBall] = useState({
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: '#05EDFF',
  });

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const tempCanvas = ref.current;
    let context = tempCanvas.getContext('2d');
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // net
    context.fillStyle = net.color;
    context.fillRect(net.x, net.y, net.width, net.height);

    // score
    context.fillStyle = '#fff';
    context.font = '35px sans-serif';

    context.fillText(user.score, canvas.width / 4, canvas.height / 6);
    context.fillText(ai.score, (3 * canvas.width) / 4, canvas.height / 6);

    context.fillStyle = user.color;
    context.fillRect(user.x, user.y, user.width, user.height);

    context.fillStyle = ai.color;
    context.fillRect(ai.x, ai.y, ai.width, ai.height);

    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }, [seconds, isActive]);

  const [upArrowPressed, setUpArrowPressed] = useState(false);
  const [downArrowPressed, setDownArrowPressed] = useState(false);

  const keyDownHandler = event => {
    event.preventDefault();
    switch (event.keyCode) {
      case 38:
        //setPaddleV(v => v + 0.2);
        setUpArrowPressed(true);
        break;
      case 40:
        //setPaddleV(v => v + 0.2);
        setDownArrowPressed(true);
        break;
    }
  };

  const keyUpHandler = event => {
    event.preventDefault();
    switch (event.keyCode) {
      case 38:
        setUpArrowPressed(false);
        resetV();
        break;
      case 40:
        setDownArrowPressed(false);
        resetV();
        break;
    }
  };

  const resetV = () => {
    setUser(user => ({
      ...user,
      velocity: userVelocity,
    }));
  };

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setBall(ball => ({
      ...ball,
      x: canvas.width / 2,
      y: canvas.height / 2,
      speed: 7,
    }));
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    if (isActive) {
      const timer = window.setInterval(() => {
        setBall(ball => ({
          ...ball,
          x: ball.x + ball.velocityX,
          y: ball.y + ball.velocityY,
        }));
      }, 30);
      return () => {
        window.clearInterval(timer);
      };
    }
  }, [isActive]);

  const calculateVelocity = player => {
    let angle = 0;

    if (ball.y < player.y + player.height / 2) {
      angle = (-1 * Math.PI) / 4;
    } else if (ball.y > player.y + player.height / 2) {
      angle = Math.PI / 4;
    }

    setBall(ball => ({
      ...ball,
      velocityX: (player === user ? 1 : -1) * ball.speed * Math.cos(angle),
      velocityY: ball.speed * Math.sin(angle),
      speed: player === user ? ball.speed + player.velocity - 6 : ball.speed,
    }));
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (ball.y + ball.radius >= canvas.height) {
          setBall(ball => ({
            ...ball,
            velocityY: -Math.abs(ball.velocityY),
          }));
        } else if (ball.y - ball.radius <= 0) {
          setBall(ball => ({
            ...ball,
            velocityY: Math.abs(ball.velocityY),
          }));
        }
        if (ball.x + ball.radius >= canvas.width) {
          reset();
          setUser(user => ({
            ...user,
            score: user.score + 1,
          }));
          setBall(ball => ({
            ...ball,
            velocityX: -Math.abs(ball.velocityX),
          }));
        } else if (ball.x - ball.radius <= 0) {
          reset();
          setAi(ai => ({
            ...ai,
            score: ai.score + 1,
          }));
          setBall(ball => ({
            ...ball,
            velocityX: Math.abs(ball.velocityX),
          }));
        }
        if (
          ball.x - ball.radius <= 20 &&
          Math.abs(user.y + 50 - ball.y) < 50 + ball.radius
        ) {
          console.log('boink');
          setBall(ball => ({
            ...ball,
            velocityX: Math.abs(ball.velocityX),
          }));
          calculateVelocity(user);
        } else if (
          ball.x + ball.radius >= canvas.width - 20 &&
          Math.abs(ai.y + 50 - ball.y) < 50 + ball.radius
        ) {
          console.log('ding dong');
          setBall(ball => ({
            ...ball,
            velocityX: -Math.abs(ball.velocityX),
          }));
          calculateVelocity(ai);
        }
        if (upArrowPressed && user.y > 0) {
          setUser(user => ({
            ...user,
            velocity: user.velocity + 0.2,
            y: user.y - user.velocity,
          }));
        } else if (downArrowPressed && user.y < canvas.height - user.height) {
          setUser(user => ({
            ...user,
            velocity: user.velocity + 0.2,
            y: user.y + user.velocity,
          }));
        }
        setAi(ai => ({
          ...ai,
          y: (ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.06),
        }));
        setSeconds(seconds => seconds + 1);
        console.log(user.velocity);
      }, 10);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <canvas
      ref={ref}
      id='canvas'
      width={canvas.width}
      height={canvas.height}></canvas>
  );
};

export default PongVanilla;
