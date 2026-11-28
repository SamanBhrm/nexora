
export const API_URL = "https://nexora-api-jdz3.onrender.com";

export const apiFetch = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};
