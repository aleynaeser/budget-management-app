'use client';

import { THEME_CODES } from '@common/enums';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect, useRef } from 'react';

type TLayoutInitializationContext = {
  theme: THEME_CODES;
  setTheme: (theme: THEME_CODES) => void;
};

interface ILayoutInitializationConfig {
  theme: THEME_CODES;
}

const LayoutInitializationContext = createContext<TLayoutInitializationContext | undefined>(undefined);

export const LayoutInitializationProvider = ({ children }: { children: ReactNode }) => {
  const mounted = useRef(false);

  const [config, setConfig] = useState<ILayoutInitializationConfig>(() => {
    if (typeof window === 'undefined') return { theme: THEME_CODES.LIGHT };

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.INITIALIZATION_CONFIG);
      return stored ? JSON.parse(stored) : { theme: THEME_CODES.LIGHT };
    } catch {
      return { theme: THEME_CODES.LIGHT };
    }
  });

  const [theme, setThemeState] = useState<THEME_CODES>(config.theme);

  const setTheme = (newTheme: THEME_CODES) => {
    setThemeState(newTheme);
    const newConfig = { ...config, theme: newTheme };
    localStorage.setItem(LOCAL_STORAGE_KEYS.INITIALIZATION_CONFIG, JSON.stringify(newConfig));
    setConfig(newConfig);
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return !mounted ? null : (
    <LayoutInitializationContext.Provider
      value={{
        theme: !mounted ? THEME_CODES.LIGHT : theme,
        setTheme,
      }}
    >
      {children}
    </LayoutInitializationContext.Provider>
  );
};

export const useLayoutInitialization = () => {
  const context = useContext(LayoutInitializationContext);
  if (!context) {
    throw new Error('useLayoutInitialization must be used within a InitializationLayoutProvider');
  }
  return context;
};
