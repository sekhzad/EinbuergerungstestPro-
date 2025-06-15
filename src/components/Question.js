import React, { useState } from 'react';
import './Question.css';

const Question = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  return (
    <div className="question">
      <h4>{question.text}</h4>
      <ul>
        {question.choices.map((choice) => (
          <li key={choice}>
            <button
              onClick={() => handleAnswerClick(choice)}
              disabled={selectedAnswer !== null}
              className={selectedAnswer === choice ? (choice === question.correctAnswer ? 'correct' : 'wrong') : ''}
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
