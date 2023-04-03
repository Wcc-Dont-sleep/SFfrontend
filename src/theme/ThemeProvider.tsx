import { FC, useState, createContext, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import PropTypes from 'prop-types';

interface ThemeProviderWrapperProps {
  children?: ReactNode;
}


export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({children}) => {
  const [themeName, _setThemeName] = useState('PureLightTheme');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'PureLightTheme';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};


ThemeProviderWrapper.propTypes = {
  children: PropTypes.node,
};

export default ThemeProviderWrapper;
