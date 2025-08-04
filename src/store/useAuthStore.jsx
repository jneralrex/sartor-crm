import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      rehydrated: false, // 🔁 flag to track hydration

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ rehydrated: true }); // ✅ once rehydrated
      },
    }
  )
);

export default useAuthStore;
