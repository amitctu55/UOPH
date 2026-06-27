import { create } from "zustand";
import { apiService } from "../services/api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "patient" | "doctor" | "hospital_admin" | "system_admin";
  status: "active" | "inactive" | "suspended";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await apiService.auth.login({ email, password });
      const { user, token } = response.data;

      // Store token in localStorage for persistence
      localStorage.setItem("token", token);

      set({ user, token, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  register: async (userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phone?: string;
  }) => {
    set({ isLoading: true });
    try {
      const response = await apiService.auth.register(userData);
      const { user, token } = response.data;

      // Store token in localStorage for persistence
      localStorage.setItem("token", token);

      set({ user, token, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  refreshToken: async () => {
    set({ isLoading: true });
    try {
      const response = await apiService.auth.refreshToken();
      const { token } = response.data;

      // Update token in localStorage
      localStorage.setItem("token", token);

      set({ token, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
