// stores/uiStore.ts
import { create } from 'zustand';

interface UIState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  showLoginModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  currentLocation: string;
  isLocationLoading: boolean;
  setLocation: (location: string) => void;
  setLocationLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const newTheme = !state.isDarkMode;
      document.documentElement.classList.toggle('dark', newTheme);
      return { isDarkMode: newTheme };
    }),

  showLoginModal: false,
  openLoginModal: () => set({ showLoginModal: true }),
  closeLoginModal: () => set({ showLoginModal: false }),

  currentLocation: 'Detecting...',
  isLocationLoading: true,
  setLocation: (location) => set({ currentLocation: location }),
  setLocationLoading: (loading) => set({ isLocationLoading: loading }),
}));
