import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HappyManageImg from "./usermanage/pages/HappyManageImg";
import HappyManageList from "./usermanage/pages/HappyManageList";
import HappyUserDetailPage from "./usermanage/pages/HappyUserDetailPage";
import HappyManageLayout from "./usermanage/components/HappyManageLayout";
import Main from "./usermanage/pages/Main";
import HappyinSignupListPage from "./usermanage/pages/HappyinSignupListPage";
import SignUpDetail from "./usermanage/pages/SignUpDetail";
import { SingleBed } from "@mui/icons-material";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route element={<HappyManageLayout />}>
          <Route index element={<HappyManageImg />}></Route>
          <Route path="happy-manage/list" element={<HappyManageList />}></Route>
          <Route
            path="userdetail/:id"
            element={<HappyUserDetailPage />}
          ></Route>
        </Route>

        <Route path="signuplist" element={<HappyinSignupListPage />}></Route>
        <Route path="singupdetail/:id" element={<SignUpDetail />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
