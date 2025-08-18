import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, User, MessageCircle, X as XIcon } from 'lucide-react';
import { TechStackBadge } from './TechStackBadge';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/collab';

const getCSRFToken = () => {
  const name = 'csrftoken=';
  const parts = document.cookie.split(';');
  for (let c of parts) {
    c = c.trim();
    if (c.startsWith(name)) return c.substring(name.length);
  }
  return '';
};

export const ProjectDetails = ({ projectId, onBack, currentUser }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // join flow
  const [joining, setJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState(null);

  // requests (owner only)
  const [requests, setRequests] = useState([]);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const lastRequestIdsRef = useRef(new Set()); // track for "new" detection

  // chat
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const currentUserId = currentUser?.id;

  useEffect(() => {
    axios.get(`${API_BASE}/csrf/`, { withCredentials: true });
  }, []);

  useEffect(() => {
    if (!projectId) return;
    loadProject();
  }, [projectId]);

  // Poll chat + join requests (for owner) every 6s
  useEffect(() => {
    if (!projectId) return;
    const id = setInterval(() => {
      refreshChat();
      if (project?.created_by?.id === currentUserId) {
        refreshRequests(true); // true => detect and maybe open modal
      }
    }, 6000);
    return () => clearInterval(id);
  }, [projectId, project, currentUserId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/projects/${projectId}/`, {
        withCredentials: true,
      });
      setProject(data);

      // Owner? Load requests.
      if (currentUserId === data?.created_by?.id) {
        await refreshRequests(false);
      }

      // Load chat
      await refreshChat();
    } catch (err) {
      console.error('Error loading project:', err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshRequests = async (detectNew) => {
    try {
      const { data } = await axios.get(`${API_BASE}/projects/${projectId}/requests/`, {
        withCredentials: true,
      });
      const list = Array.isArray(data) ? data : [];
      setRequests(list);

      if (detectNew) {
        const incomingIds = new Set(list.map((r) => r.id));
        let hasNew = false;
        for (const id of incomingIds) {
          if (!lastRequestIdsRef.current.has(id)) {
            hasNew = true;
            break;
          }
        }
        lastRequestIdsRef.current = incomingIds;
        if (hasNew) setShowRequestsModal(true);
      } else {
        lastRequestIdsRef.current = new Set(list.map((r) => r.id));
      }
    } catch (err) {
      // Owner may hit 403 or route may not exist if backend not updated yet
      setRequests([]);
    }
  };

  const refreshChat = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/projects/${projectId}/chat/`, {
        withCredentials: true,
      });
      setChat(Array.isArray(data) ? data : []);
    } catch (err) {
      setChat([]);
    }
  };

  // === Join Flow: request-based ===
  const handleRequestJoin = async () => {
    if (!project) return;
    setJoining(true);
    setJoinMessage(null);
    try {
      const { data } = await axios.post(
        `${API_BASE}/projects/${project.id}/request_join/`,
        { message: '' },
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCSRFToken() },
        }
      );
      setJoinMessage({
        type: data.success ? 'success' : 'error',
        text: data.message || (data.success ? 'Request sent' : 'Request failed'),
      });
      await loadProject();
    } catch (err) {
      setJoinMessage({ type: 'error', text: 'Failed to send join request.' });
    } finally {
      setJoining(false);
      setTimeout(() => setJoinMessage(null), 3000);
    }
  };

  const respondToRequest = async (requestId, action) => {
    try {
      await axios.post(
        `${API_BASE}/join_requests/${requestId}/respond/`,
        { action },
        { withCredentials: true, headers: { 'X-CSRFToken': getCSRFToken() } }
      );
      // refresh project + list (member_count may change on accept)
      await loadProject();
    } catch (err) {
      console.error('Failed to respond to request', err);
    }
  };

  // === Chat ===
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const { data } = await axios.post(
        `${API_BASE}/projects/${projectId}/chat/`,
        { message: newMessage },
        { withCredentials: true, headers: { 'X-CSRFToken': getCSRFToken() } }
      );
      setChat((prev) => [...prev, data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!project) return <div className="p-8 text-center text-red-600">Project not found.</div>;

  const isOwner = currentUserId === project.created_by?.id;
  const isMember = !!project.is_member;
  const hasPending = !!project.has_pending_request;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
      </button>

      {joinMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            joinMessage.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {joinMessage.text}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      <div className="flex items-center gap-4 text-gray-600 mb-4">
        <Calendar className="w-5 h-5" />
        <span>{project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}</span>
        <User className="w-5 h-5" /> <span>{project.created_by?.username || 'Unknown'}</span>
        <User className="w-5 h-5" /> <span>{project.member_count ?? 0} Members</span>
      </div>

      <p className="mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 ? (
          project.tech_stack.map((tech, idx) => <TechStackBadge key={idx} tech={tech} />)
        ) : (
          <span className="text-gray-500">No tech stack listed.</span>
        )}
      </div>

      {/* Join/request UI for non-owners */}
      {!isOwner && (
        <div className="mb-4">
          {isMember ? (
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-md">You are a member</span>
          ) : hasPending ? (
            <button
              disabled
              className="px-6 py-3 rounded-md text-white font-medium bg-gray-400 cursor-not-allowed"
            >
              Requested
            </button>
          ) : (
            <button
              onClick={handleRequestJoin}
              disabled={joining}
              className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
                joining ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {joining ? 'Sending...' : 'Request to Join'}
            </button>
          )}
        </div>
      )}

      {/* Owner: Requests list + modal */}
      {isOwner && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Join Requests</h2>
          {requests.length === 0 ? (
            <p className="text-gray-500">No pending requests.</p>
          ) : (
            <ul className="space-y-2">
              {requests.map((req) => (
                <li key={req.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
                  <div className="flex flex-col">
                    <span className="font-medium">{req.user?.username || 'Unknown'}</span>
                    <span className="text-sm text-gray-500">{req.message || ''}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-500 capitalize">{req.status}</span>
                    {req.status === 'pending' && (
                      <>
                        <button
                          onClick={() => respondToRequest(req.id, 'accept')}
                          className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondToRequest(req.id, 'reject')}
                          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Chat */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Project Chat</h2>
        <div className="space-y-2 mb-3 max-h-64 overflow-y-auto p-2 border rounded-md">
          {chat.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            chat.map((msg) => (
              <div key={msg.id} className="flex gap-2 items-start">
                <span className="font-semibold">{msg.user?.username || 'Unknown'}:</span>
                <span>{msg.message}</span>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Requests Modal (owner) */}
      {isOwner && showRequestsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">New Join Requests</h3>
              <button
                onClick={() => setShowRequestsModal(false)}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            {requests.length === 0 ? (
              <p className="text-gray-600">No pending requests.</p>
            ) : (
              <ul className="space-y-2">
                {requests
                  .filter((r) => r.status === 'pending')
                  .map((req) => (
                    <li key={req.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
                      <div>
                        <div className="font-medium">{req.user?.username || 'Unknown'}</div>
                        {req.message && <div className="text-sm text-gray-600">{req.message}</div>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => respondToRequest(req.id, 'accept')}
                          className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondToRequest(req.id, 'reject')}
                          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
