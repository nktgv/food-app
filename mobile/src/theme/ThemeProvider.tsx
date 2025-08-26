import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme } from './theme';

type ThemeMode = 'auto' | 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  systemScheme: 'light' | 'dark' | null | undefined;
};

const ThemeContext = createContext<ThemeContextValue>({ 
  theme: lightTheme, 
  themeMode: 'auto',
  setThemeMode: () => {},
  systemScheme: undefined
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  
  const theme = useMemo(() => {
    console.log('ThemeProvider: systemScheme =', systemScheme, 'themeMode =', themeMode);
    
    if (themeMode === 'dark') return darkTheme;
    if (themeMode === 'light') return lightTheme;
    
    // Auto mode - follow system
    return systemScheme === 'dark' ? darkTheme : lightTheme;
  }, [systemScheme, themeMode]);

  useEffect(() => {
    console.log('Theme changed to:', theme.mode);
  }, [theme.mode]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themeMode, 
      setThemeMode, 
      systemScheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext).theme;
export const useThemeContext = () => useContext(ThemeContext);


