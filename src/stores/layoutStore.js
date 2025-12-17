import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getLayoutConfig, getRoutesConfig } from '@/api/config';
import layoutConfig from '@/config/layout';

const defaultState = layoutConfig;

const store = (set) => ({
  ...defaultState,
  setSettingConfig: (config) =>
    set((state) => ({ settingConfig: config || state.settingConfig })),
  setColorList: (config) =>
    set((state) => ({ colorList: config || state.colorList })),
  setHeaderConfig: (config) =>
    set((state) => ({ headerConfig: config || state.headerConfig })),
  setFooterConfig: (config) =>
    set((state) => ({ footerConfig: config || state.footerConfig })),
  setLayoutConfig: async () => {
    const result = await getLayoutConfig();
    if (result?.code === 0) {
      const { setting_config, color_list, header_config, footer_config } =
        result?.data || {};
      set((state) => ({
        settingConfig: setting_config ?? state.settingConfig,
        colorList: color_list ?? state.colorList,
        headerConfig: header_config ?? state.headerConfig,
        footerConfig: footer_config ?? state.footerConfig,
      }));
    }
  },
  setRoutesConfig: async () => {
    const result = await getRoutesConfig();
    if (result.code === 0) {
      set((state) => ({ routesConfig: result?.data || state.routesConfig }));
    }
  },
  setUserRoutes: () =>
    set(() => ({ routesConfig: defaultState.routesConfig.shift() })),
});

const persistedStore = persist(store, {
  name: 'layoutStore',
  partialize: (state) => ({
    settingConfig: state.settingConfig,
    routesConfig: state.routesConfig,
  }),
});

export const useLayoutStore = create(persistedStore);
