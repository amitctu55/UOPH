import { create } from "zustand";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "hospital_admin";
  status: "active" | "inactive" | "suspended";
  department?: string;
  employeeId?: string;
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
    department?: string;
    employeeId?: string;
    phone?: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // In a real implementation, this would call the auth service
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: "admin-123",
        email: email,
        firstName: "John",
        lastName: "Doe",
        role: "hospital_admin",
        department: "Administration",
        employeeId: "EMP001",
        status: "active",
      };
      const mockToken = "mock-jwt-token-" + Date.now();

      set({ user: mockUser, token: mockToken, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null, token: null });
  },

  register: async (userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    department?: string;
    employeeId?: string;
    phone?: string;
  }) => {
    set({ isLoading: true });
    try {
      // In a real implementation, this would call the registration endpoint
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: "admin-" + Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: "hospital_admin",
        department: userData.department,
        employeeId: userData.employeeId,
        status: "active",
      };
      const mockToken = "mock-jwt-token-" + Date.now();

      set({ user: mockUser, token: mockToken, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
