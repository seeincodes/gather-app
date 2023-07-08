import React, { useState } from 'react';
import SwipeCard from '../components/SwipeCardComponent';
import ethan from '../assets/ethan.jpg';
import christina from '../assets/christina.jpg';
import Modal from 'react-modal';
import styles from '../styles/SwipeCards.module.css';
import Link from 'next/link';

export default function SwipeCardPage() {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: 'Alice',
      imageUrl: christina,
      interests: [],
      hobbies: [],
    },
    { id: 2, name: 'Bob', imageUrl: ethan },
    { id: 3, name: 'Jane', imageUrl: christina },
    {
      id: 4,
      name: 'Jon',
      imageUrl: ethan,
    },
    {
      id: 5,
      name: 'Ethan',
      imageUrl: ethan,
    },
    { id: 6, name: 'Christina', imageUrl: christina },
  ]);

  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);

  const [isMatchModalOpen, setMatchModalOpen] = useState(false);

  function handleSwipe(person, direction) {
    setCurrentPersonIndex((prevIndex) => prevIndex + 1);
    //setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));

    if (direction === 1) {
      setMatchModalOpen(true);
    }
  }

  function closeMatchModal() {
    // setMatchModalOpen(false);
  }

  return (
    <div className={styles.swipeComponent}>
      {people
        .slice(currentPersonIndex, currentPersonIndex + 1)
        .map((person, index) => (
          <SwipeCard key={person.id} person={person} onSwipe={handleSwipe} />
        ))}
      <Modal isOpen={isMatchModalOpen} onRequestClose={closeMatchModal}>
        <h2 className={styles.header}>Congratulations, you matched!</h2>
        <Link
          href={{
            pathname: '/Matches',
            query: { matchId: people[currentPersonIndex].id },
          }}
          onClick={closeMatchModal}
          className={styles.convoButton}
        >
          Go to conversation
        </Link>
      </Modal>
    </div>
  );
}
