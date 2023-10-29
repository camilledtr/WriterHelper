import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'
import axios from 'axios'

import untypedSynonyms from '../data/synonyms.json'
import { Synonyms } from '../types/synonym';
import { Suggestion, SuggestionsContainer, TextArea, TextContainer } from './styles';

const synonyms = untypedSynonyms as Synonyms;

function Home() {
  const [suggestedWords, setSuggestedWords] = useState<string[]>([]);
  const textRef = useRef<RefObject<HTMLTextAreaElement>>(null);
  const [words, setWords] = useState<string[]>([]);
  const wordRef = useRef<RefObject<HTMLSpanElement>>(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(-1);

  useEffect(() => {
    if (selectedWordIndex !== -1) {
    ; (async () => {
        const synonyms = await fetchSynonyms(words[selectedWordIndex]);
        if (synonyms) {
          setSuggestedWords(synonyms);
        }
    })();
    } else {
      setSuggestedWords([]);
    }
  }, [selectedWordIndex, textRef]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    const wordsArray = text.split(' ');
    const updatedWordsArray: string[] = [];

    wordsArray.forEach((word) => {
      if (word.includes('\n') && word !== '\n') {
        const splitWords = word.split('\n');
        updatedWordsArray.push(splitWords[0]);
        updatedWordsArray.push('\n');
        updatedWordsArray.push(splitWords[1]);
      } else {
        updatedWordsArray.push(word);
      }
    });

    console.log(updatedWordsArray);
    setWords(updatedWordsArray);
  };

  const handleWordClick = (index: number) => {
    setSelectedWordIndex(index);
  };

  const handleSuggestionClick = (word: string) => {
    const newWords = [...words];
    newWords[selectedWordIndex] = word;
    setWords(newWords);
    setSelectedWordIndex(-1);
    if (textRef.current) {
      textRef.current.value = newWords.join(' ');
      textRef.current?.focus();
    }
  }

  const fetchSynonyms = async (word: string) => {
    if (synonyms[word]) {
      return Object.values(synonyms[word]);
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/scrape-synonyms?word=${word}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching synonyms : ', error);
      return null;
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 32) { // Spacebar key code
      if (words.length > 0) {
        setSelectedWordIndex(words.length - 1)
      }
    }
  };

  const x = wordRef.current ? wordRef.current.getBoundingClientRect().x - 120 : 0;
  const y = wordRef.current ? wordRef.current.getBoundingClientRect().y - 150 : 0;

  console.log(words)

  return (
    <>
      <h1>Writer Helper FR</h1>
      <div style={{ position: 'relative' }}>
        <TextArea
          ref={textRef}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Commencez à écrire..."
          spellCheck={false}
        ></TextArea>
        <TextContainer
          onClick={() => { textRef.current?.focus() } }
        >
          {words.map((word, index) => (
            <span
              ref={index === selectedWordIndex ? wordRef : null}
              key={index}
              onClick={() => handleWordClick(index)}
              style={{
                cursor: 'pointer',
                margin: 0,
                textDecoration: index === selectedWordIndex ? 'underline' : 'none',
                flexBasis: word === '\n' ? '100%' : undefined,
              }}
            >
              {word}
            </span>
          ))}
        </TextContainer>
        {suggestedWords.length > 0 && selectedWordIndex >= 0 && <SuggestionsContainer x={x} y={y} >
          {suggestedWords.map((word, index) => (
            <Suggestion
              key={index}
              onClick={() => handleSuggestionClick(word)}
            >{word}</Suggestion>
          ))}
        </SuggestionsContainer>}
      </div>
    </>
  );
}

export default Home;