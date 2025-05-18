'use client';

import { useState, useEffect } from 'react';

type TypingAnimationProps = {
  taglines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  className?: string;
};

export function TypingAnimation({
  taglines,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDelay = 1500,
  className = '',
}: TypingAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const fullText = taglines[currentIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), pauseDelay);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, taglines, typingSpeed, deletingSpeed, pauseDelay, loopNum]);

  return (
    <span className={`inline-block border-r-2 border-accent animate-blink-caret ${className}`}>
      {currentText}&nbsp;
    </span>
  );
}
