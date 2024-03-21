import ThemeModeProps from './ThemeModeProps';

export default interface ToggleLightDarkModeProps {
  mode: ThemeModeProps['mode'];
  toggleLightDarkMode: () => void;
}
