import React, { useState } from 'react';
import Card from '../layout/Card';
import '../../stylesheets/widget-image.css';
import FikaModal from '../layout/FikaModal';

const Fika = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  return (
    <Card
      heading='Virtual Fika'
      subHeading='Find a coffee buddy'
      className='fika-component'>
      <img
        src='/img/coffee.png'
        alt='fika'
        className='img-fullsize'
        onClick={openModal}
      />
      <FikaModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </Card>
  );
};

export default Fika;
