import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
//custom theme for font family
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
