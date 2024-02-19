import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestionList } from '../redux/quizApi';

const Quiz = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestionList()).catch((error) => {
      console.error('Failed to load questions:', error);
    });
  }, [dispatch]);

  const { questions } = useSelector(state => state.quiz, shallowEqual);
  const params = useParams();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const currentQuestion = questions[activeQuestion];
  const { question, choices, correctAnswer } = currentQuestion || {};

  const navigate = useNavigate();

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
  };

  const onClickNext = () => {
    const isCorrect = choices[selectedAnswerIndex] === correctAnswer;

    setResult(prev => ({
      score: prev.score + (isCorrect ? 5 : 0),
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
    }));

    setSelectedAnswerIndex(null);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      console.log(result)
      navigate(`/result`);
    }
  };


  return (
    <div className='quz-pg'>
      <h2 className='text-center'>Welcome to the Quiz</h2>
      <p className='text-center'>User ID: {params.id}</p>
      <div className='q-box'>
        <h2 className='que'>{question ? question : ''}</h2>
        <ul className='ans'>
          {choices?.map((answer, index) => (
            <li
              onClick={() => onAnswerSelected(answer, index)}
              key={index}
              className={selectedAnswerIndex === index ? 'selected-answer' : null}
            >
              {answer}
            </li>
          ))}
        </ul>
        <button
          className='link-btn'
          onClick={onClickNext}
          disabled={selectedAnswerIndex === null}
        >
          {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;