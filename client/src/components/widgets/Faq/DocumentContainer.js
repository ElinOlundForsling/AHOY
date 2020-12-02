import React from 'react';
import Document from './Document';
import { v4 as uuidv4 } from 'uuid';

const DocumentContainer = ({ documents, searchTerm }) => {
  return (
    <div>
      {documents.map(document => (
        <Document searchTerm={searchTerm} document={document} key={uuidv4()} />
      ))}
    </div>
  );
};

export default DocumentContainer;
