import React from 'react';
import Document from './Document';

const DocumentContainer = ({ documents }) => {
  console.log(documents);
  return (
    <div>
      {documents.map((document) => (
        <Document document={document} />
      ))}
    </div>
  );
};

export default DocumentContainer;
