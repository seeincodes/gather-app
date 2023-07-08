import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styles from '../styles/SwipeCardComponent.module.css';
import Image from 'next/image';

function SwipeCardComponent({ person, onSwipe }) {
  const [{ x }, set] = useSpring(() => ({
    x: 0,
    config: {
      tension: 500,
      friction: 30,
    },
  }));

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) onSwipe(person, dir);
      else set({ x: down ? mx : 0 });
    }
  );

  const style = x.to((value) => ({
    transform: `translate3d(${value}px, 0, 0) rotate(${value * 0.05}deg)`,
  }));

  console.log(style, 'style');

  function handleYesClick() {
    onSwipe(person, 1);
  }

  function handleNoClick() {
    onSwipe(person, -1);
  }

  return (
    <div className={styles.swipeCardContainer}>
      <animated.div {...bind()} style={style} className={styles.swipeCard}>
        <Image src={person.imageUrl} alt={person.name} />
        <h2>{person.name}</h2>
      </animated.div>
      <div className={styles.buttons}>
        <button onClick={handleNoClick} className={styles.button}>
          No
        </button>
        <button onClick={handleYesClick} className={styles.button}>
          Yes
        </button>
      </div>
    </div>
  );
}

export default SwipeCardComponent;
