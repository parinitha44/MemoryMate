// src/api/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance with base configuration
const api = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Helper function to get headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// API functions
export const authAPI = {
  // Signup
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Signup failed');
    }
    
    const data = await response.json();
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  // Login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  // Logout
  logout: () => {
    removeAuthToken();
  }
};

export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get profile');
    }
    
    return response.json();
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    return response.json();
  }
};

export const reminderAPI = {
  // Get all reminders
  getReminders: async () => {
    const response = await fetch(`${API_BASE_URL}/reminders`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get reminders');
    }
    
    return response.json();
  },

  // Get pending reminders
  getPendingReminders: async () => {
    const response = await fetch(`${API_BASE_URL}/reminders/pending`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get pending reminders');
    }
    
    return response.json();
  },

  // Create reminder
  createReminder: async (reminderData) => {
    const response = await fetch(`${API_BASE_URL}/reminders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reminderData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create reminder');
    }
    
    return response.json();
  },

  // Complete reminder
  completeReminder: async (reminderId) => {
    const response = await fetch(`${API_BASE_URL}/reminders/${reminderId}/complete`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to complete reminder');
    }
    
    return response.json();
  }
};

export const activityAPI = {
  // Get activities
  getActivities: async () => {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get activities');
    }
    
    return response.json();
  },

  // Create activity
  createActivity: async (activityData) => {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(activityData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create activity');
    }
    
    return response.json();
  }
};

export const gameAPI = {
  // Start game session
  startGame: async (gameData) => {
    const response = await fetch(`${API_BASE_URL}/games/start`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(gameData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to start game');
    }
    
    return response.json();
  },

  // Complete game session
  completeGame: async (gameSessionId, gameData) => {
    const response = await fetch(`${API_BASE_URL}/games/${gameSessionId}/complete`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(gameData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to complete game');
    }
    
    return response.json();
  },

  // Get game sessions
  getGameSessions: async () => {
    const response = await fetch(`${API_BASE_URL}/games/sessions`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get game sessions');
    }
    
    return response.json();
  }
};

export const faceRecognitionAPI = {
  // Add person
  addPerson: async (personName, imageFile) => {
    const formData = new FormData();
    formData.append('personName', personName);
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/face-recognition/add-person`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to add person');
    }
    
    return response.json();
  },

  // Recognize person
  recognizePerson: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/face-recognition/recognize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to recognize person');
    }
    
    return response.json();
  },

  // Get people
  getPeople: async () => {
    const response = await fetch(`${API_BASE_URL}/face-recognition/people`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get people');
    }
    
    return response.json();
  }
};

export const journalAPI = {
  // Get journal entries
  getJournalEntries: async () => {
    const response = await fetch(`${API_BASE_URL}/journal`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get journal entries');
    }
    
    return response.json();
  },

  // Create journal entry
  createJournalEntry: async (entryData) => {
    const response = await fetch(`${API_BASE_URL}/journal`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(entryData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create journal entry');
    }
    
    return response.json();
  },

  // Get journal stats
  getJournalStats: async () => {
    const response = await fetch(`${API_BASE_URL}/journal/stats`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to get journal stats');
    }
    
    return response.json();
  }
};

export const publicAPI = {
  // Health check
  hello: async () => {
    const response = await fetch(`${API_BASE_URL}/public/hello`);
    
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    
    return response.json();
  }
};

export default {
  authAPI,
  userAPI,
  reminderAPI,
  activityAPI,
  gameAPI,
  faceRecognitionAPI,
  journalAPI,
  publicAPI,
  getAuthToken,
  setAuthToken,
  removeAuthToken
};
