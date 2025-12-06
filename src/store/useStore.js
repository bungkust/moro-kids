import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { updateUserStats } from '../db/repositories';

const useStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            isLoaded: false,
            preferences: {
                sound: true,
                music: true,
            },

            // Actions
            setUser: (user) => set({ user, isLoaded: true }),

            updateStats: async (updates) => {
                const currentUser = get().user;
                if (!currentUser) return;

                // Optimistic Update
                set((state) => ({
                    user: { ...state.user, ...updates },
                }));

                // Async DB Update
                try {
                    await updateUserStats(currentUser.id, updates);
                } catch (error) {
                    console.error('Failed to sync stats to DB:', error);
                    // Optional: Rollback state if needed, but for now we keep it simple
                }
            },

            toggleSound: () =>
                set((state) => ({
                    preferences: {
                        ...state.preferences,
                        sound: !state.preferences.sound,
                    },
                })),

            toggleMusic: () =>
                set((state) => ({
                    preferences: {
                        ...state.preferences,
                        music: !state.preferences.music,
                    },
                })),
        }),
        {
            name: 'moro-storage', // unique name
            partialize: (state) => ({ preferences: state.preferences }), // Only persist preferences
        }
    )
);

export default useStore;
