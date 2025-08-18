import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import AddProjectModal from './AddProjectModal';
import axios from 'axios';

// ✅ Helper to get CSRF token from cookies
function getCsrfToken() {
  const name = 'csrftoken=';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) return cookie.substring(name.length);
  }
  return '';
}

export const ProjectsList = ({ onViewProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [joinMessage, setJoinMessage] = useState(null);

  // ✅ Fetch CSRF token on mount
  useEffect(() => {
    const initCsrfAndLoad = async () => {
      try {
        await fetch('http://localhost:8000/collab/csrf/', {
          credentials: 'include'
        });
        await loadProjects();
      } catch (err) {
        console.error('Error initializing CSRF or loading projects:', err);
      }
    };
    initCsrfAndLoad();
  }, []);

  // ✅ Load projects from backend
  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/collab/projects/', {
        withCredentials: true, // send session cookie
        headers: { 'X-CSRFToken': getCsrfToken() },
        params: searchTerm ? { search: searchTerm } : {}
      });
      setProjects(response.data);
    } catch (err) {
      console.error('Error loading projects:', err);
      setJoinMessage({
        type: 'error',
        text: 'Failed to load projects. Make sure you are logged in.'
      });
      setTimeout(() => setJoinMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create a new project
  const handleCreateProject = async (newProject) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/collab/projects/',
        newProject,
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCsrfToken() },
        }
      );
      setJoinMessage({ type: 'success', text: 'Project created successfully!' });
      await loadProjects();
    } catch (err) {
      setJoinMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to create project.'
      });
    } finally {
      setTimeout(() => setJoinMessage(null), 3000);
    }
  };

  // ✅ Join a project
  const handleJoinProject = async (projectId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/collab/projects/${projectId}/join/`,
        {},
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCsrfToken() },
        }
      );
      setJoinMessage({
        type: response.data.success ? 'success' : 'error',
        text: response.data.message
      });
      if (response.data.success) await loadProjects();
    } catch (err) {
      setJoinMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to join project.'
      });
    } finally {
      setTimeout(() => setJoinMessage(null), 3000);
    }
  };

  // ✅ Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tech_stack.some(tech =>
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Collaboration Hub</h1>
          <p className="text-gray-600 mt-2">
            Discover amazing projects and collaborate with talented developers
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {joinMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          joinMessage.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {joinMessage.text}
        </div>
      )}

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadProjects()}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={onViewProject}
                onJoinProject={handleJoinProject}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No projects found matching your search.' : 'No projects available yet.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Be the first to add a project!
                </button>
              )}
            </div>
          )}
        </>
      )}

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
};
