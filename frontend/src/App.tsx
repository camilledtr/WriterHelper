import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [suggestedWord, setsuggestedWord] = useState('');
  const [text, setText] = useState('');

  const fetchSynonyms = async (word: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/scrape-synonyms?word=${word}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching synonyms : ', error);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 32) { // Spacebar key code
      if (text !== '') {
        const lastWord = text.split(' ').pop();
        const synonyms = await fetchSynonyms(lastWord as string)
        setsuggestedWord(synonyms.join('\n'));
      }
    }
  };

  return (
    <>
      <h1>Writer Helper FR</h1>
      <textarea
        autoComplete='true'
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      >
      </textarea>
      <p className='suggestion'>{suggestedWord}</p>
    </>
  );
}

export default App;
