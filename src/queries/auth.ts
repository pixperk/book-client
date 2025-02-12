import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const token = localStorage.getItem("book-token");

interface UserResponse {
  _id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
  user: UserResponse
  token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};

export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/users/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const updateProfile = async (
  userId: string,
  name: string,
  email: string
): Promise<AuthResponse> => {
  const response = await axios.put(
    `${API_URL}/users/${userId}`,
    { name, email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const getAllUsers = async (): Promise<UserResponse[]> => {
  const response = await axios.get(`${API_URL}/users/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const toggleUserRole = async (
  userId: string,
): Promise<UserResponse> => {
  const response = await axios.put(
    `${API_URL}/users/toggle-role/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

