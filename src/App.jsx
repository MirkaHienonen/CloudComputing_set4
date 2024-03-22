import React, { useState, useEffect } from 'react';
import './App.css';
import Sentiment from 'sentiment';
import happy from './assets/happy.png';
import sad from './assets/sad.png';
import neutral from './assets/neutral.png';

const App = () => {
  const sentiment = new Sentiment();
  const [inputText, setInputText] = useState(" ");
  const [result, setResult] = useState();

  useEffect(() => {
    const tempResult = sentiment.analyze(inputText);
    setResult(tempResult);
    console.log(tempResult);
  }, [inputText]);

  let emoji;
  if (result) {
    if (result.score > 0) {
      emoji = <img src={happy} alt="happy" />; // Positive
    } else if (result.score < 0) {
      emoji = <img src={sad} alt="negative" />; // Negative
    } else {
      emoji = <img src={neutral} alt="neutral" />; // Neutral
    }
  }

  return (
    <div className='container'>
      <div className='App-header'>
        <p className='icon'>{emoji}</p>
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='Enter text here' />
        <div className='result'>
          {result?.negative.map((item, index) => <span className='negative' key={index}>{item}</span>)}
          {result?.positive.map((item, index) => <span className='positive' key={index}>{item}</span>)}
        </div>
      </div>
    </div>
  );
}

export default App;