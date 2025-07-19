import React, { useState } from 'react';
import FaceTrainer from './FaceTrainer';
import FaceTester from './FaceTester';

export default function FaceMain() {
  const [isTrained, setIsTrained] = useState(false);

  const handleTrainComplete = () => {
    setIsTrained(true);
  };

  const handleStopTest = () => {
    setIsTrained(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-10 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#1c1c3a] min-h-10 text-white">
     
      {!isTrained && (
        <FaceTrainer onTrainComplete={handleTrainComplete} />
      )}
      {isTrained && (
        <FaceTester onStop={handleStopTest} />
      )}
    </div>
  );
}
