import React from 'react';
import '../../stylesheets/card.css';

const Card = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      <div className="card-title">
        <h5>{props.heading}</h5>
        <p>{props.subHeading}</p>
      </div>
      <article className="card-inside">{props.children}</article>
    </div>
  );
};

export default Card;
