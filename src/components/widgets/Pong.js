import React from 'react';
import Card from '../layout/Card';
import { Link } from 'react-router-dom';
import '../../stylesheets/widget-image.css';

const Fika = () => {
  return (
    <Card
      heading='Virtual Pong'
      subHeading='Find a Pong buddy'
      className='pong-component'>
      <Link to='./pong'>
        <img src='/img/vr.svg' alt='pong' className='img-fullsize' />
      </Link>
    </Card>
  );
};

export default Fika;
