import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, UserPlus, Crown, User } from 'lucide-react';
import { TechStackBadge } from './TechStackBadge';
import axios from 'axios';

export const ProjectDetails = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState(null);

  useEffect(() => {
    if (projectId) loadProjectDetails();
  }, [projectId]);

  // Load project details from backend
  const loadProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/collab/projects/${projectId}/`,
        { withCredentials: true } // send session cookie
      );
      setProject(response.data);
    } catch (err) {
      console.error('Error loading project details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Join project
  const handleJoinProject = async () => {
    if (!project) return;
    setJoining(true);
    setJoinMessage(null);
    try {
      const response = await axios.post(
        `http://localhost:8000/collab/projects/${project.id}/join/`,
        {},
        { withCredentials: true } // send session cookie
      );
      setJoinMessage({
        type: response.data.success ? 'success' : 'error',
        text: response.data.message
      });
      if (response.data.success) loadProjectDetails();
    } catch (err) {
      setJoinMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to join project.'
      });
    } finally {
      setJoining(false);
      setTimeout(() => setJoinMessage(null), 3000);
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const isUserMember = project?.members?.some(
    (member) => member.user.id === parseInt(sessionStorage.getItem('user_id'))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Project not found</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
        >
          Go back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                Created by {project.created_by.username} on {formatDate(project.created_at)}
              </span>
            </div>
          </div>

          {!isUserMember && (
            <div className="text-right">
              <button
                onClick={handleJoinProject}
                disabled={joining}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                <UserPlus className="w-5 h-5 mr-2" /> {joining ? 'Joining...' : 'Join Project'}
              </button>
              {joinMessage && (
                <p
                  className={`mt-2 text-sm ${
                    joinMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {joinMessage.text}
                </p>
              )}
            </div>
          )}
        </div>

        <p className="text-gray-700 mb-4">{project.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech_stack.map((tech, idx) => (
            <TechStackBadge key={idx} tech={tech} size="md" />
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Project Members</h2>
          <div className="flex flex-wrap gap-3">
            {project.members.map(member => (
              <div
                key={member.id}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1"
              >
                <User className="w-4 h-4 text-gray-500" />
                <span>{member.user.username}</span>
                {member.role === 'owner' && <Crown className="w-4 h-4 text-yellow-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
