import Routes from './routes';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'themes';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
