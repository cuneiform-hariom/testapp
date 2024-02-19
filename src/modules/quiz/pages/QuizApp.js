import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getQuestionList } from '../redux/quizApi';
import { useNavigate } from 'react-router-dom';

const QuizApp = () => {

  const [time, setTime] = useState("00:30:00");
  const navigate = useNavigate()

  const addTime = (date, minutes) => {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + minutes);
    return newDate;
  };

  const now = new Date();
  const countDownDate = addTime(now, 30);

  const timerStart = () => {

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'));

      if (distance < 0) {
        navigate("/result")
        clearInterval(intervalId);
        setTime("00:00:00");
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    ; (
      async () => {
        const res = await dispatch(getQuestionList());
        console.log('res: ', res);
        if (res?.meta?.requestStatus === "fulfilled") {
          timerStart()
        }
      }
    )()
  }, [dispatch]);

  const { questions, isLoading } = useSelector(state => state.quiz, shallowEqual);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [answers, setAnswers] = useState([]);
  console.log('answers: ', answers);

  const handleAnswerClick = (answer) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = answer === selectedOptions[currentQuestion] ? null : answer;
    setSelectedOptions(newSelectedOptions);
  };

  // const nextQuestion = () => {
  //   setCurrentQuestion(currentQuestion + 1);
  // };

  const submitQuiz = () => {
    setCurrentQuestion(currentQuestion + 1);
    // let newScore = 0;
    // selectedOptions.forEach((selectedOption, index) => {
    //   if (selectedOption === questions[index].answer) {
    //     newScore++;
    //   }
    // });

    const newAnswers = questions.map((question, index) => ({
      question: question.question,
      answer: selectedOptions[index]
    }));
    setAnswers(newAnswers);
    if (currentQuestion === questions.length - 1) {
      setShowScore(true);
      navigate("/result")
    }

    // setScore(newScore);
  };

  return (
    <div>
      <p className='time'>{time}</p>
      {showScore ? (
        <div>
          Exam Over
        </div>
      ) : (
        <div className='quz-pg'>
          <h2 className='text-center'>Welcome to the Test Robert</h2>
          {!isLoading ?
            <div className='q-box'>
              <h2 className='que'>{questions[currentQuestion]?.question}</h2>
              <ul className='ans'>
                {questions[currentQuestion]?.choices?.map((option, index) => (
                  <li
                    onClick={() => handleAnswerClick(option)}
                    className={selectedOptions[currentQuestion] === option ? 'selected-answer' : ''}
                    key={index}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              {currentQuestion < questions.length - 1 && (
                <button
                  className='link-btn'
                  onClick={submitQuiz}
                  disabled={selectedOptions[currentQuestion] === null}
                >
                  Next
                </button>
              )}
              {currentQuestion === questions.length - 1 && (
                <button
                  className='link-btn'
                  onClick={submitQuiz}
                >
                  Submit
                </button>
              )}
            </div> : "Loading ..."}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
