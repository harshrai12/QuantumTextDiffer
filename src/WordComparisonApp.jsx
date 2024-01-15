import React, { useState } from 'react';
import { diff_match_patch } from 'diff-match-patch';

const WordComparisonApp = ({paragraph1,paragraph2}) => {
  
  const [highlightedText1, setHighlightedText1] = useState('');
  const [highlightedText2, setHighlightedText2] = useState('');

  const handleCheck = () => {
    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(paragraph1, paragraph2);
    dmp.diff_cleanupSemantic(diff);

    const highlightedWords1 = diff.map(([operation, text]) => {
      return operation === 1 ? `<span class="highlight">${text}</span>` : text;
    });

    const highlightedWords2 = diff.map(([operation, text]) => {
      return operation === -1 ? `<span class="highlight">${text}</span>` : text;
    });

    setHighlightedText1(highlightedWords1.join(''));
    setHighlightedText2(highlightedWords2.join(''));
  };

  return (
    <div>
      <textarea
        placeholder="Enter the first paragraph"
        value={paragraph1}
        
      />
      <textarea
        placeholder="Enter the second paragraph"
        value={paragraph2}
      
      />
      <button onClick={handleCheck}>Check</button>

      {highlightedText1 && highlightedText2 && (
        <div>
          <h3>Highlighted Text 1:</h3>
          <div dangerouslySetInnerHTML={{ __html: highlightedText1 }} />

          <h3>Highlighted Text 2:</h3>
          <div dangerouslySetInnerHTML={{ __html: highlightedText2 }} />
        </div>
      )}

      <style>{`
        .highlight {
          background-color: yellow;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default WordComparisonApp;









