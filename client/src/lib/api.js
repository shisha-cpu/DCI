const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
};

const api = {
  auth: {
    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },

    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return handleResponse(response);
    },

    getMe: async (token) => {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },

    verifyEmail: async (token) => {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      return handleResponse(response);
    }
  },
  
  listings: {
    getListings: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/listings?${queryString}`);
      return handleResponse(response);
    },

    getListing: async (id) => {
      const response = await fetch(`${API_BASE_URL}/listings/${id}`);
      return handleResponse(response);
    },

    createListing: async (listingData, token) => {
      console.log(listingData );
      
      const completeData = {
        status: 'pending',
        views: 0,
        isFeatured: false,
        createdAt: new Date().toISOString(),
        ...listingData
      };

      const response = await fetch(`${API_BASE_URL}/listings`, {
        method: 'POST',
        body: JSON.stringify(completeData)
      });
      console.log(response);
      
      return handleResponse(response);
    },

    updateListing: async (id, listingData, token) => {
      const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...listingData,
          updatedAt: new Date().toISOString()
        })
      });
      return handleResponse(response);
    },

    deleteListing: async (id, token) => {
      const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return handleResponse(response);
    },

    uploadListingImages: async (id, files, token) => {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const response = await fetch(`${API_BASE_URL}/listings/${id}/images`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      return handleResponse(response);
    },
    
    // Новые методы для работы с объявлениями
    getMyListings: async (userId, token) => {
      const response = await fetch(`${API_BASE_URL}/listings/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return handleResponse(response);
    },
    searchListings: async (searchParams) => {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${API_BASE_URL}/listings/search?${queryString}`);
      return handleResponse(response);
    }
  },
  
  // Дополнительные утилиты
  utils: {
    getListingTypes: () => {
      return ['residential', 'commercial', 'land', 'business', 'franchise', 'other'];
    },
    
    getListingStatuses: () => {
      return ['pending', 'approved', 'rejected', 'sold'];
    }
  }
};

export default api;