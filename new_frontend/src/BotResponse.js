import React, { useEffect, useState } from "react";

const useTypingEffect = (text, speed) => {
  const [displayText, setDisplayText] = useState("");
  const typingDelay = 1000; // Delay before starting typing effect

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;

      const interval = setInterval(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        currentIndex++;

        if (currentIndex === text.length) {
          clearInterval(interval);
        }
      }, speed);
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [text, speed]);

  return displayText;
};

const BotResponse = ({ message }) => {
  const displayText = useTypingEffect(message, 50);

  return <p className="message-text">{displayText}</p>;
};

export default BotResponse;
