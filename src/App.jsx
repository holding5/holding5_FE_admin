import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HappyManageImg from "./usermanage/pages/HappyManageImg";
import HappyUserDetailPage from "./usermanage/pages/HappyUserDetailPage";
import Main from "./usermanage/pages/Main";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<HappyManageImg />}></Route>
        <Route path="userdetail/:id" element={<HappyUserDetailPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
