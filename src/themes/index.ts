import { createTheme } from '@mui/material/styles';
import { typography } from './typography';

export const colors: { [name: string]: string } = {
  athensGray: '#FBFBFC',
  wildSand: '#F6F6F6',
  alto: '#E0E0E0',
  fadedText: 'rgb(0, 0, 0, 0.56)',
  moreFadedText: 'rgb(0, 0, 0, 0.4)',
  black: '#000',
  springWood: '#F5F0EB',
  lightBeige: '#FBF9F7',
  white: '#FFF',
  slate: '#4A3943',
  gold: '#FFD700',
  brick: '#FB4824',
  red: '#FF0000',
  guardsmanRed: '#BC0000',
  fadedRed: 'rgba(188,0,0, 0.6)',
  crimson: '#D1185E',
  rouge: '#993366',
  fadedPink: 'rgba(153,51,102, 0.6)',
  fadedPurple: 'rgba(107, 85, 145, 0.6)',
  fadedMaroon: 'rgba(81, 52, 77, 0.6)',
  internationalKleinBlue: '#0033b6',
  regalBlue: '#004E67',
  fadedBlue: 'rgba(0,78,103, 0.6)',
  twitterBlue: '#1DA1F2',
  aquamarineBlue: '#74D5DE',
  saltpan: '#EAF3E9',
  green: '#1BC000',
  caribbeanGreen: '#00C08C',
  japaneseLaurel: '#038000',
  fadedGreen: 'rgba(3, 128, 0, 0.6)',
  chelseaGem: '#A95B00',
  fadedBrown: 'rgba(189, 79, 0, 0.6)',
  goldDrop: '#E08700',
  muddyWaters: '#B8846B',
  mystic: '#E9ECF3',
  fadedYellow: '#FFFCD9',
  concrete: '#CDBBB3',
};

export const AVATARCOLORS = [
  colors.fadedGreen,
  colors.fadedBrown,
  colors.fadedBlue,
  colors.fadedPurple,
  colors.fadedRed,
  colors.fadedPink,
  colors.fadedMaroon,
];

const palette = {
  primary: {
    main: colors.internationalKleinBlue,
  },
  secondary: {
    main: colors.slate,
  },
  success: {
    main: colors.green,
    dark: colors.japaneseLaurel,
  },
  warning: {
    main: colors.chelseaGem,
  },
  action: {
    active: colors.black,
  },
  error: {
    main: colors.goldDrop,
  },
  background: {
    default: colors.white,
  },
  accordion: {
    background: colors.lightBeige,
    hover: colors.springWood,
  },
};
const tempTheme = createTheme({
  palette,
  typography: typography,
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const theme = createTheme(tempTheme);
