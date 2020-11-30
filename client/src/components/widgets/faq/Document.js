import React from 'react';

const Document = ({ document }) => {
  return (
    <div>
      <h6>{document.title}</h6>
      <p>{document.content}</p>
    </div>
  );
};

export default Document;
