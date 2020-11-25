import React from 'react';
import '../../stylesheets/Card.css';

const Card = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      <div className="card-title">
        <h5>{props.heading}</h5>
        <p>{props.subHeading}</p>
      </div>
      {props.children}
    </div>
  );
};

export default Card;
