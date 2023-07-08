import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from '../styles/CountdownTimer.module.css';

function Countdown({ matchTime }) {
  const duration = 48 * 60 * 60; // 48 hours in seconds

  const remainingTime = Math.max(0, duration - (Date.now() / 1000 - matchTime));

  console.log(matchTime, remainingTime);

  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      initialRemainingTime={remainingTime}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        return `${hours}:${minutes}:${seconds}`;
      }}
    </CountdownCircleTimer>
  );
}

export default Countdown;
