import React from 'react';
import Highlighter from 'react-highlight-words';

const Document = ({ searchTerm, document }) => {
  return (
    <div>
      <h6>{document.title}</h6>
      <Highlighter
        highlightClassName='YourHighlightClass'
        searchWords={[searchTerm]}
        autoEscape={true}
        textToHighlight={document.content}></Highlighter>
    </div>
  );
};

export default Document;
