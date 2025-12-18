
import React from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = Array.from({ length: 30 });
  return (
    <>
      {snowflakes.map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 10 + 10}px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random(),
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

export default Snowfall;
