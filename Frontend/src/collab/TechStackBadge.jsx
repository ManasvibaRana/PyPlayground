import React from 'react';

const techColors = {
  'React': 'bg-blue-100 text-blue-800',
  'Vue.js': 'bg-green-100 text-green-800',
  'Angular': 'bg-red-100 text-red-800',
  'Python': 'bg-yellow-100 text-yellow-800',
  'JavaScript': 'bg-yellow-100 text-yellow-800',
  'TypeScript': 'bg-blue-100 text-blue-800',
  'Node.js': 'bg-green-100 text-green-800',
  'Django': 'bg-green-100 text-green-800',
  'Flask': 'bg-gray-100 text-gray-800',
  'PostgreSQL': 'bg-blue-100 text-blue-800',
  'MongoDB': 'bg-green-100 text-green-800',
  'MySQL': 'bg-orange-100 text-orange-800',
  'TensorFlow': 'bg-orange-100 text-orange-800',
  'Solidity': 'bg-purple-100 text-purple-800',
  'Web3.js': 'bg-purple-100 text-purple-800',
  'Ethereum': 'bg-purple-100 text-purple-800',
  'MQTT': 'bg-indigo-100 text-indigo-800',
  'default': 'bg-gray-100 text-gray-800'
};

export const TechStackBadge = ({ tech, size = 'md' }) => {
  const colorClass = techColors[tech] || techColors.default;
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorClass} ${sizeClass}`}>
      {tech}
    </span>
  );
};
