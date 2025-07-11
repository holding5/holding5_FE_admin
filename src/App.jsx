import "./App.css";
import Main from "./pages/Main";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HappyManageImg from "./components/HappyManageImg";
import HappyUserDetail from "./components/HappyUserDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<HappyManageImg />}></Route>
        <Route path="userdetail/:id" element={<HappyUserDetail />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
