import { createTheme } from '@mui/material/styles';

// ---- Design tokens ----
// Palette grounded in the "instrument cluster" idea: a graphite/ink base
// (dashboard housing), a cool paper background, an amber "gauge" accent
// for AI + cost signals, and a steady blue for verified/trustworthy data.
export const tokens = {
  ink: '#12151B',        // near-black graphite, not pure black
  inkSoft: '#232833',
  paper: '#F6F7F5',       // cool off-white surface
  paperRaised: '#FFFFFF',
  line: '#E2E4E0',
  steel: '#3A4356',       // primary — trust / vehicle data
  steelDark: '#232A38',
  amber: '#D98E2B',       // gauge accent — AI / cost signals
  amberSoft: '#F6E3C5',
  good: '#3F8F5F',
  attention: '#C1443C',
  warn: '#C7861F',
  textPrimary: '#171A1F',
  textSecondary: '#5B6472',
  textFaint: '#8A93A3',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.steel, dark: tokens.steelDark, contrastText: '#fff' },
    secondary: { main: tokens.amber, contrastText: tokens.ink },
    success: { main: tokens.good },
    error: { main: tokens.attention },
    warning: { main: tokens.warn },
    background: { default: tokens.paper, paper: tokens.paperRaised },
    text: { primary: tokens.textPrimary, secondary: tokens.textSecondary },
    divider: tokens.line,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.015em' },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 18, paddingBlock: 9 },
        containedPrimary: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: `1px solid ${tokens.line}`,
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

export default theme;
