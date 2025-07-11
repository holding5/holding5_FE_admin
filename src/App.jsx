import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Main from "./pages/Main";
import { Box } from "@mui/material";
function App() {
  return (
    <Box component="div">
      <Main />
    </Box>
  );
}

export default App;
