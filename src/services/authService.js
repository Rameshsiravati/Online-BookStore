import api from './api';

export const authService = {
  login: (username, password) =>
    api.post("http://localhost:8080/api/auth/login", { username, password }),

  register: (username, email, password) =>
    api.post("http://localhost:8080/api/auth/register", { username, email, password }),

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
