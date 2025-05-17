import { useUserTheme } from '../context/UserThemeContext';

export const useElementColors = () => {
  const { themeColors } = useUserTheme();

  return {
    titlesColor: themeColors.custom_titles_color,
    subTitlesColor: themeColors.custom_subtitles_color,
    elementsColor: themeColors.custom_elements_color,
    elementsHoverColor: themeColors.custom_elements_hover_color,
    bgColor: themeColors.custom_elements_bg_color,
    bgHoverColor: themeColors.custom_elements_hover_bg_color,
    navigationColor: themeColors.custom_navigation_color,
    navigationBgColor: themeColors.custom_navigation_bg_color
  };
};