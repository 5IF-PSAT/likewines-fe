import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Comparison from "./pages/Comparison";
import Prediction from "./pages/Prediction";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLocalStorage } from "./useLocalStorage";
import HomeBar from "./components/HomeBar";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";

declare module "@mui/material/styles" {
  interface Palette {
    number: string;
    wine_search: string;
    red_wine: string;
    white_wine: string;
    rose_wine: string;
    sparkling_wine: string;
  }
  interface PaletteOptions {
    number: string;
    wine_search: string;
    red_wine: string;
    white_wine: string;
    rose_wine: string;
    sparkling_wine: string;
  }
}

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#de000f",
    },
    secondary: {
      main: "#272727",
    },
    number: "#ffc0cb",
    wine_search: "#252525",
    white_wine: "#5f5849",
    red_wine: "#450004",
    rose_wine: "#9e3e5b",
    sparkling_wine: "#a1986c",
  },
  typography: {
    fontFamily: `"Torus", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
  },
});
darkTheme = responsiveFontSizes(darkTheme);

let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#450004",
    },
    secondary: {
      main: "#828282",
    },
    number: "#1d1c1a",
    wine_search: "#f5f5f5",
    white_wine: "#f9e8c0",
    red_wine: "#de000f",
    rose_wine: "#ebb6ae",
    sparkling_wine: "#efe1a1",
  },
  typography: {
    fontFamily: `"Torus", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
  },
});
lightTheme = responsiveFontSizes(lightTheme);

const queryClient = new QueryClient();
function App() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <HomeBar theme={theme} themeHandler={setTheme} />
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction/:id" element={<Prediction />} />
            <Route path="/comparison/:id" element={<Comparison />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
        <ScrollToTop />
        <Analytics />
      </>
    </QueryClientProvider>
  );
}

export default App;
