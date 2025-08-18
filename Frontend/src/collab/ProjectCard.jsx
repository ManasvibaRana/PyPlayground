import React from 'react';
import { Calendar, Users, Eye } from 'lucide-react';
import { TechStackBadge } from './TechStackBadge';

export const ProjectCard = ({ project, onViewDetails, onJoinProject }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{project.title}</h3>
        <span className="flex items-center text-sm text-gray-500 ml-4">
          <Users className="w-4 h-4 mr-1" />
          {project.member_count}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 4).map((tech, index) => (
            <TechStackBadge key={index} tech={tech} size="sm" />
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{project.tech_stack.length - 4} more
            </span>
          )}
        </div>
      </div>

      {project.looking_for && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Looking for:</strong> {project.looking_for}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span>by {project.created_by.username}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(project.created_at)}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(project.id)}
            className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
          <button
            onClick={() => onJoinProject(project.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Join Project
          </button>
        </div>
      </div>
    </div>
  );
};
