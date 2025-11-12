import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const store = (set) => ({
  locale: 'zh-CN',
  setLocale: (locale) => {
    return set((state) => ({ locale: locale ?? state.locale }));
  },
});

const persistedStore = persist(store, { name: 'statusStore' });

export const useStatusStore = create(persistedStore);
