import React from 'react';
import Document from './Document';

const DocumentContainer = ({ documents, searchTerm }) => {
  console.log(documents);
  return (
    <div>
      {documents.map((document) => (
        <Document searchTerm={searchTerm} document={document} />
      ))}
    </div>
  );
};

export default DocumentContainer;
