import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, UserPlus, Crown, User, Check, X as XIcon, MessageCircle } from 'lucide-react';
import { TechStackBadge } from './TechStackBadge';
import axios from 'axios';

// Helper to get CSRF token from cookie
const getCSRFToken = () => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith('csrftoken=')) {
        cookieValue = decodeURIComponent(cookie.substring('csrftoken='.length));
        break;
      }
    }
  }
  return cookieValue;
};

export const ProjectDetails = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState(null);
  const [requests, setRequests] = useState([]);
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const currentUserId = parseInt(sessionStorage.getItem('user_id'));

  useEffect(() => {
    // Fetch CSRF cookie on load
    axios.get('http://localhost:8000/collab/csrf/', { withCredentials: true });

    if (projectId) loadProjectDetails();
  }, [projectId]);

  // Load project and related data
  const loadProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/collab/projects/${projectId}/`,
        { withCredentials: true }
      );
      setProject(response.data);

      if (response.data.created_by.id === currentUserId) {
        const reqResponse = await axios.get(
          `http://localhost:8000/collab/projects/${projectId}/requests/`,
          { withCredentials: true }
        );
        setRequests(reqResponse.data);
      }

      const chatResponse = await axios.get(
        `http://localhost:8000/collab/projects/${projectId}/chat/`,
        { withCredentials: true }
      );
      setChat(chatResponse.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinProject = async () => {
    if (!project) return;
    setJoining(true);
    setJoinMessage(null);
    try {
      const response = await axios.post(
        `http://localhost:8000/collab/projects/${project.id}/join/`,
        {},
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCSRFToken() }
        }
      );
      setJoinMessage({
        type: response.data.success ? 'success' : 'error',
        text: response.data.message
      });
      await loadProjectDetails();
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

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.post(
        `http://localhost:8000/collab/projects/${projectId}/requests/${requestId}/${action}/`,
        {},
        { 
          withCredentials: true,
          headers: { 'X-CSRFToken': getCSRFToken() }
        }
      );
      await loadProjectDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(
        `http://localhost:8000/collab/projects/${projectId}/chat/`,
        { message: newMessage },
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCSRFToken() }
        }
      );
      setNewMessage('');
      await loadProjectDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();
  const isUserMember = project?.members?.some(m => m.user.id === currentUserId);
  const isOwner = project?.created_by?.id === currentUserId;

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
        <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
          Go back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Created by {project.created_by.username} on {formatDate(project.created_at)}</span>
            </div>
          </div>

          {!isUserMember && !isOwner && (
            <div className="text-right">
              <button
                onClick={handleJoinProject}
                disabled={joining}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                <UserPlus className="w-5 h-5 mr-2" /> {joining ? 'Joining...' : 'Join Project'}
              </button>
              {joinMessage && (
                <p className={`mt-2 text-sm ${joinMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
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
              <div key={member.id} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1">
                <User className="w-4 h-4 text-gray-500" />
                <span>{member.user.username}</span>
                {member.role === 'owner' && <Crown className="w-4 h-4 text-yellow-500" />}
              </div>
            ))}
          </div>
        </div>

        {/* Owner Join Requests */}
        {isOwner && requests.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Join Requests</h2>
            <div className="flex flex-col gap-2">
              {requests.map(req => (
                <div key={req.id} className="flex justify-between items-center p-2 border rounded-md">
                  <span>{req.user.username}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestAction(req.id, 'accept')}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => handleRequestAction(req.id, 'reject')}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <XIcon className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Section */}
        {isUserMember && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Project Chat
            </h2>
            <div className="h-48 overflow-y-auto border rounded-lg p-3 mb-2 bg-gray-50">
              {chat.map(msg => (
                <div
                  key={msg.id}
                  className={`mb-2 p-1 rounded-lg max-w-[70%] ${msg.sender.id === currentUserId ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-gray-200 text-gray-900'}`}
                >
                  <p className="text-sm font-medium">{msg.sender.username}:</p>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
