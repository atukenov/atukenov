"use client";

import { useEffect, useState } from "react";

/** Types `text` out once after `delay` ms, with a blinking block cursor. */
const Typewriter = ({
  text,
  delay = 2200,
  speed = 45,
  className = "",
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className="inline-block w-[0.6em] h-[1em] ml-1 -mb-[0.15em] bg-accent-default animate-blink"
      />
    </span>
  );
};

export default Typewriter;
