import React from 'react';
import Card from '../layout/Card';
import '../../stylesheets/widget-image.css';

const Fika = () => {
  return (
    <Card
      heading='Virtual Pong'
      subHeading='Find a Pong buddy'
      className='pong-component'>
      <img src='/img/vr.svg' className='img-fullsize' />
    </Card>
  );
};

export default Fika;
