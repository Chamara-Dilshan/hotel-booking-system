// Auth Store - Hotel Booking System
// Zustand store for authentication state management

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,

      // Actions
      login: (userData, token = null) => {
        const role = userData.role?.toLowerCase() || null;
        set({
          user: userData,
          role: role,
          token: token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        // Clear all legacy session storage items
        sessionStorage.removeItem('active-customer');
        sessionStorage.removeItem('active-hotel');
        sessionStorage.removeItem('active-admin');
        sessionStorage.removeItem('user-jwtToken');

        set({
          user: null,
          role: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      setToken: (token) => {
        set({ token });
      },

      // Getters
      getUser: () => get().user,
      getRole: () => get().role,
      getToken: () => get().token,

      // Role Checks
      isAdmin: () => get().role === 'admin',
      isCustomer: () => get().role === 'customer',
      isHotel: () => get().role === 'hotel',

      // Get user ID
      getUserId: () => get().user?.id || null,
    }),
    {
      name: 'auth-storage', // Key in sessionStorage
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Hook for checking if user is logged in (alias for convenience)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);

// Hook for getting current user
export const useCurrentUser = () => useAuthStore((state) => state.user);

// Hook for getting user role
export const useUserRole = () => useAuthStore((state) => state.role);

export default useAuthStore;
