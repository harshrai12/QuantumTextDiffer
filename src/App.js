import React, { useState } from 'react';

import TextExtractor from './TextExtractor';
import WordComparisonApp from './WordComparisonApp';



function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [paragraph1, setParagraph1] = useState('');
  const [paragraph2, setParagraph2] = useState('');
  return (
    <div className="container">
      <h1>PDF extraction and Compare</h1>
      <TextExtractor setParagraph1={setParagraph1} setParagraph2={setParagraph2} />
      <WordComparisonApp paragraph1={paragraph1} paragraph2={paragraph2}  />
      
    </div>
  );
}

export default App;


