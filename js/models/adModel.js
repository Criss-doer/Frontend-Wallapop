class AdModel {
  constructor() {
    this.baseApiUrl = 'http://127.0.0.1:8000/api';
    this.baseAuthUrl = 'http://127.0.0.1:8000/auth';
  }

  async getAds() {
    try {
      const response = await fetch(`${this.baseApiUrl}/ads`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching ads:", error);
      throw error;
    }
  }

  async getAd(id) {
    try {
      const response = await fetch(`${this.baseApiUrl}/ads/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ad with id ${id}:`, error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${this.baseAuthUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseAuthUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async createAd(adData, imageFile) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error("Usuario no autenticado.");
    }

    const formData = new FormData();
    formData.append('name', adData.name);
    formData.append('description', adData.description);
    formData.append('price', adData.price);
    formData.append('type', adData.type);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch(`${this.baseApiUrl}/ads`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
        return data;
    } catch (error) {
        console.error("Error creating ad:", error);
        throw error;
    }
  }

  async deleteAd(id) {
      const token = localStorage.getItem('authToken');
      if (!token) {
          throw new Error("Usuario no autenticado.");
      }

      try {
          const response = await fetch(`${this.baseApiUrl}/ads/${id}`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });

          if (!response.ok) {
              if (response.status === 404) {
                  throw new Error("Anuncio no encontrado.");
              }
              if (response.status === 403) {
                  throw new Error("No tienes permiso para eliminar este anuncio.");
              }
               const data = await response.json().catch(() => ({}));
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
          }

      } catch (error) {
          console.error(`Error deleting ad with id ${id}:`, error);
          throw error;
      }
  }
}