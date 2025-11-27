// src/components/UI/Card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-jawa-soft p-6 transition-all duration-300 ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default Card;
