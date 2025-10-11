import { create } from "zustand";
import { persist } from "zustand/middleware";

// Base store
const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      fullName: null,
      userRole: null,
      image: null,
      role: null,
      phone: null,
      address: null,
      passwordChanged: null,
      _id: null,
      email: null,

      setAuth: (userData) => {
        set({
          token: userData.token ?? null,
          fullName: userData.fullName ?? null,
          userRole: userData.userRole ?? null,
          image: userData.image ?? null,
          role: userData.role ?? null,
          phone: userData.phone ?? null,
          address: userData.address ?? null,
          passwordChanged: userData.passwordChanged ?? null,
           _id: userData._id ?? userData.id ?? null,
          email: userData.email ?? null,
        });
      },
       

      logout: () =>
        set({
          token: null,
          fullName: null,
          userRole: null,
          image: null,
          role: null,
          passwordChanged: null,
          _id: null,
          email: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        fullName: state.fullName,
        userRole: state.userRole,
        image: state.image,
        role: state.role,
        phone: state.phone,
        address: state.address,
        passwordChanged: state.passwordChanged,
        _id: state._id,
        email: state.email,
      }),
    }
  )
);

export default useAuthStore;

// Slice hooks (instead of one big object)
export const useToken = () => useAuthStore((state) => state.token);
export const useFullName = () => useAuthStore((state) => state.fullName);
export const useEmail = () => useAuthStore((state) => state.email);
export const useSetAuth = () => useAuthStore((state) => state.setAuth);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useUserRole = () => useAuthStore((state) => state.userRole);
export const useImage = () => useAuthStore((state) => state.image);
export const useUserId = () => useAuthStore((state) => state._id);
export const useRole = () => useAuthStore((state) => state.role);
export const usePhone = () => useAuthStore((state) => state.phone);
export const useAddress = () => useAuthStore((state) => state.address);
export const usePasswordChanged = () => useAuthStore((state) => state.passwordChanged);