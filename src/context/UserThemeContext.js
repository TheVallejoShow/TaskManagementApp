import { createContext, useContext, useState } from 'react';

import colors from '../config/colors.json';

const UserThemeContext = createContext();

export const UserThemeProvider = ({ children }) => {
  const [themeColors, setThemeColors] = useState(colors);
  
  return (
    <UserThemeContext.Provider value={{ themeColors, setThemeColors }}>
      { children }
    </UserThemeContext.Provider>
  );
};

export const useUserTheme = () => useContext(UserThemeContext);