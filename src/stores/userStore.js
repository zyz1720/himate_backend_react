import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { getUserInfo } from '@/api/app/user';

const store = (set) => ({
  userToken: null,
  tokenType: null,
  userInfo: {},
  setUserInfo: async () => {
    const response = await getUserInfo();
    if (response.code === 0) {
      const { data } = response || {};
      return set((state) => ({ userInfo: data ?? state.userInfo }));
    }
  },
  setUserToken: (token) => set(() => ({ userToken: token ?? null })),
  setTokenType: (type) => set(() => ({ tokenType: type ?? null })),
  clearUserStore: () =>
    set(() => {
      localStorage.removeItem('userStore');
      return { userToken: null, tokenType: null, userInfo: {} };
    }),
});

const persistedStore = persist(store, { name: 'userStore' });
export const useUserStore = create(persistedStore);

// 在应用初始化时获取用户信息
const { setUserInfo } = useUserStore.getState();

setUserInfo();
