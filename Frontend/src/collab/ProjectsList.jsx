import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import AddProjectModal from './AddProjectModal';
import { ProjectDetails } from './ProjectDetails';
import axios from 'axios';

function getCsrfToken() {
  const name = 'csrftoken=';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) return cookie.substring(name.length);
  }
  return '';
}

export const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [joinMessage, setJoinMessage] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await fetch('http://localhost:8000/collab/csrf/', { credentials: 'include' });

        // Get logged-in user
        const userRes = await axios.get('http://localhost:8000/collab/current_user/', {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCsrfToken() },
        });
        setCurrentUser(userRes.data);

        await loadProjects(userRes.data.id);
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, []);

  const loadProjects = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/collab/projects/', {
        withCredentials: true,
        headers: { 'X-CSRFToken': getCsrfToken() },
        params: searchTerm ? { search: searchTerm } : {}
      });

      // Mark if current user has already requested
      const projectsWithRequested = response.data.map(project => {
        const hasRequested = project.join_requests?.some(
          req => req.user.id === userId && req.status === 'pending'
        );
        return { ...project, requested: hasRequested };
      });

      setProjects(projectsWithRequested);
    } catch (err) {
      console.error(err);
      setJoinMessage({ type: 'error', text: 'Failed to load projects.' });
      setTimeout(() => setJoinMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (newProject) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/collab/projects/',
        newProject,
        { withCredentials: true, headers: { 'X-CSRFToken': getCsrfToken() } }
      );
      setJoinMessage({ type: 'success', text: 'Project created successfully!' });
      if (currentUser) await loadProjects(currentUser.id);

      if (response.data?.id) setCurrentProjectId(response.data.id);
    } catch (err) {
      setJoinMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to create project.'
      });
    } finally {
      setTimeout(() => setJoinMessage(null), 3000);
    }
  };

  const handleJoinProject = async (projectId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/collab/projects/${projectId}/join/`,
        {},
        { withCredentials: true, headers: { 'X-CSRFToken': getCsrfToken() } }
      );
      setJoinMessage({
        type: response.data.success ? 'success' : 'error',
        text: response.data.message
      });
      if (response.data.success && currentUser) await loadProjects(currentUser.id);

      return response.data.success;
    } catch (err) {
      setJoinMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to join project.'
      });
      return false;
    } finally {
      setTimeout(() => setJoinMessage(null), 3000);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tech_stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (currentProjectId && currentUser) {
    return (
      <ProjectDetails
        projectId={currentProjectId}
        currentUser={currentUser}
        onBack={() => setCurrentProjectId(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Collaboration Hub</h1>
          <p className="text-gray-600 mt-2">Discover amazing projects and collaborate with talented developers</p>
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
        <div className={`mb-6 p-4 rounded-lg ${joinMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          {joinMessage.text}
        </div>
      )}

      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && currentUser && loadProjects(currentUser.id)}
          className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              currentUser={currentUser}
              onViewDetails={setCurrentProjectId}
              onJoinProject={handleJoinProject}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-500 text-lg">{searchTerm ? 'No projects found matching your search.' : 'No projects available yet.'}</p>
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
        </div>
      )}

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateProject}
        existingProjects={projects}
      />
    </div>
  );
};
