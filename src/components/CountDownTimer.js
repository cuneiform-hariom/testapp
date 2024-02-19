import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(timer);
          onTimeout();
          return 0;
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      Time Left: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default CountdownTimer;
