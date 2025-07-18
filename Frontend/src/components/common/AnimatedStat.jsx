import React, { useState, useEffect, useRef } from 'react';

// Custom hook to detect if an element is in the viewport
function useIsInView(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to trigger this once
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
}


const AnimatedStat = ({ end, duration = 2000, label, plus = true }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useIsInView(ref);

  useEffect(() => {
    // Start animation only when the component is in view
    if (!isInView) return;

    let start = 0;
    // Remove commas for parsing, in case they exist
    const endValue = parseInt(end.toString().replace(/,/g, ''));
    
    if (start === endValue) return;

    // Calculate the time interval for each step to ensure it finishes in `duration`
    const incrementTime = (duration / endValue);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endValue) {
        clearInterval(timer);
      }
    }, incrementTime);

    // Cleanup function to clear the interval if the component unmounts
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
        {/* Format number with commas for better readability */}
        {count.toLocaleString()}
        {plus && '+'}
      </p>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
};

export default AnimatedStat;
