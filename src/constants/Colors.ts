/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { THEME_COLOURS } from '@/constants/theme-colors';

const tintColorLight = '#ce2127';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: THEME_COLOURS.background,
    tint: tintColorLight,
    icon: '#ce2127',
    tabIconDefault: '#ce2127',
    tabIconSelected: '#ce2127',
  },
  dark: {
    text: '#11181C',
    background: THEME_COLOURS.background,
    tint: tintColorLight,
    icon: '#ce2127',
    tabIconDefault: '#ce2127',
    tabIconSelected: '#ce2127',
  },
};
