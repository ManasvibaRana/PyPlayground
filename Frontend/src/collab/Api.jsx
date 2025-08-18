import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/collab/', // adjust according to your backend
  withCredentials: true, // if using session auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async getProjects() {
    const response = await apiInstance.get('projects/');
    return response.data;
  },

  async getProjectDetails(id) {
    const response = await apiInstance.get(`projects/${id}/`);
    return response.data;
  },

  async createProject(data) {
    const response = await apiInstance.post('projects/', data);
    return response.data;
  },

  async joinProject(id) {
    const response = await apiInstance.post(`projects/${id}/join/`);
    return response.data;
  },

  async getCurrentUser() {
    const response = await apiInstance.get('current_user/'); // optional endpoint
    return response.data;
  }
};
