import Countdown from '../components/CountdownTimer';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Matches.module.css';
import ethan from '../assets/ethan.jpg';
import christina from '../assets/christina.jpg';
import { useRouter } from 'next/router';

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY;

const systemMessage = {
  role: 'system',
  content: `Imagine that you have just matched with a user on a dating app. Your aim is to make the user feel comfortable, heard, and engaged. You are a kind-hearted and patient individual who is genuinely interested in learning more about this person. Through a friendly and respectful conversation, try to explore their interests, hobbies, and what they are looking for in a relationship. Remember, the ultimate goal is to suggest meeting up in person, but only after a natural progression of conversation. Use the information shared by the user to guide your questions and responses.`,
};

export default function Chat({ match }) {
  const router = useRouter();
  const { matchId } = router.query;

  const people = [
    {
      id: 1,
      name: 'Alice',
      imageUrl: christina,
      interests: [],
      hobbies: [],
      matchTime: Math.floor(Date.now() / 1000),
    },
    {
      id: 2,
      name: 'Bob',
      imageUrl: ethan,
      matchTime: Math.floor(Date.now() / 1000),
    },
    {
      id: 3,
      name: 'Jane',
      imageUrl: christina,
      matchTime: Math.floor(Date.now() / 1000),
    },
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
  ];

  const matchedPerson = people.find((person) => {
    const chosenMatch = Number(matchId) - 1;
    return person.id === chosenMatch;
  });

  const [messages, setMessages] = useState([
    {
      message: 'Hey! nice to meet you',
      sentTime: 'just now',
      sender: matchedPerson.name,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState('');

  const handleSend = async () => {
    const inputElement = document.getElementsByClassName(styles.chatInput)[0];
    const inputValue = inputElement.value;

    if (inputValue.trim() !== '') {
      const newMessage = {
        message: inputValue,
        sentTime: new Date().toLocaleTimeString(),
        sender: 'user',
      };

      const newMessages = [...messages, newMessage];
      console.log(newMessages);

      setMessages(newMessages);
      setIsTyping(true);

      await processMessageToChatGPT(newMessages);

      inputElement.value = '';
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === matchedPerson.name) {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 250,
      stop: [matchedPerson.name, 'User:'],
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [systemMessage, ...apiMessages],
    };

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log('API response:', data);
        if (data.choices && data.choices.length > 0) {
          setMessages([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: matchedPerson.name,
              sentTime: new Date().toLocaleTimeString(),
            },
          ]);
        } else {
          console.error('Unexpected API response:', data);
        }
        setIsTyping(false);
      });
  }

  const [userInterests, setUserInterests] = useState('nature and art');

  const fetchActivitySuggestions = async () => {
    const systemMessage = {
      role: 'system',
      content: `Given that the user enjoys ${userInterests}, suggest some interesting activities or places to go for a date in Barcelona. Keep the response to 250 characters.`,
    };
    const apiRequestBodySuggestions = {
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.8,
      messages: [systemMessage],
    };

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBodySuggestions),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'data');
        if (data && data.choices && data.choices.length > 0) {
          // const suggestions = data.choices[0].text.trim();
          // Display the suggestions to the user
          setSuggestions(data.choices[0].message.content);
        } else {
          console.error('No suggestions found in API response:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching suggestions:', error);
      });
  };

  const stake = () => {
    alert('you have staked');
  };

  return (
    <>
      <Countdown matchTime={Math.floor(Date.now() / 1000)} />
      {/* <div className={styles.countdownImage}>
        <Image src={matchedPerson.imageUrl} alt={'profile picture'} />
      </div> */}
      <div className={styles.chatContainer}>
        <div className={styles.chatMessages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.messageRow} ${
                msg.sender === matchedPerson.name
                  ? styles.messageBot
                  : styles.messageUser
              }`}
            >
              {msg.sender === matchedPerson.name ? (
                <div>
                  <strong>{msg.sender}: </strong>
                  <span className={styles.messageContent}> {msg.message}</span>
                  <span className={styles.messageTimestamp}>
                    {' '}
                    {msg.sentTime}
                  </span>
                </div>
              ) : (
                <div>
                  <strong>You: </strong>
                  <span className={styles.messageContent}> {msg.message}</span>
                  <span className={styles.messageTimestamp}>
                    {' '}
                    {msg.sentTime}
                  </span>
                </div>
              )}
            </div>
          ))}
          {isTyping && <div>your match is typing...</div>}
        </div>
        <div className={styles.chatInputContainer}>
          <input
            type='text'
            placeholder='Type your response here..'
            className={styles.chatInput}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                const inputElement = event.target;
                handleSend();
                inputElement.value = '';
              }
            }}
          />
          <button className={styles.chatButton} onClick={handleSend}>
            Send
          </button>
        </div>
        {suggestions}
        {suggestions && (
          <button onClick={stake} className={styles.confirmButton}>
            Confirm attendance for tomorrow at 9pm
          </button>
        )}
        <button
          onClick={fetchActivitySuggestions}
          className={styles.chatButton}
        >
          Activity Suggestions
        </button>
      </div>
    </>
  );
}
