// src/components/Dashboard/TaskCard.tsx

import React from 'react';
import Card from '../UI/Card';

// Ikon Sepeda Ontel (Anda bisa menggantinya dengan SVG kustom di public/images/icon-sepeda.svg)
const BicycleIcon = () => (
  <svg
    className="w-8 h-8 text-java-brown-medium"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM17 10v.01"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 10H7v10h10v-10zM12 21v-4m-4 0h8m-8-4h8"
    ></path>
    <circle cx="9" cy="18" r="2"></circle>
    <circle cx="15" cy="18" r="2"></circle>
    <path d="M11 5L12 3l1 2M12 3v1M12 3l-1-2M12 3l1 2"></path> {/* Placeholder bentuk sepeda */}
  </svg>
);


interface TaskCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, onClick }) => {
  return (
    <Card className="flex flex-col items-start justify-between cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <div className="flex justify-between items-center w-full mb-2">
        <h3 className="text-xl font-bold text-java-brown-dark">{title}</h3>
        <BicycleIcon /> {/* Ikon sepeda di sudut */}
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
      <button className="mt-4 px-4 py-2 bg-java-green-dark text-white rounded-md hover:bg-java-green-light transition-colors">
        Lihat Detail
      </button>
    </Card>
  );
};

export default TaskCard;
