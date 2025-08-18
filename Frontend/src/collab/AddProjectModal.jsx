import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { TechStackBadge } from './TechStackBadge';

const AddProjectModal = ({ isOpen, onClose, onSubmit, existingProjects = [] }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!title || !description || !techStack) {
      setError('Please fill in all required fields.');
      return;
    }

    if (existingProjects.some(p => p.title.toLowerCase() === title.toLowerCase())) {
      setError('A project with this title already exists.');
      return;
    }

    setError(null);

    // ✅ Only pass data to parent
    if (onSubmit) {
      onSubmit({
        title,
        description,
        tech_stack: techStack.split(',').map(t => t.trim()),
        looking_for: lookingFor,
      });

      // Reset modal
      onClose();
      setTitle('');
      setDescription('');
      setTechStack('');
      setLookingFor('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">Create New Project</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
            rows={4}
          />
          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <div className="flex flex-wrap gap-2">
            {techStack.split(',').map((tech, idx) =>
              tech.trim() ? <TechStackBadge key={idx} tech={tech.trim()} size="sm" /> : null
            )}
          </div>
          <input
            type="text"
            placeholder="Looking For (optional)"
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <button
          onClick={handleCreate}
          className="mt-5 w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Create Project
        </button>
      </div>
    </div>
  );
};

export default AddProjectModal;
