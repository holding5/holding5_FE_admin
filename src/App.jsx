import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HappyManageImg from "./usermanage/pages/HappyManageImg";
import HappyManageList from "./usermanage/pages/HappyManageList";
import HappyUserDetailPage from "./usermanage/pages/HappyUserDetailPage";
import HappyManageLayout from "./usermanage/components/HappyManageLayout";

import HappyManageGroup from "./usermanage/pages/HappyManageGroup";
import HappyGroupDetailPage from "./usermanage/pages/HappyGroupDetailPage";
import HappyGroupDetailManage from "./usermanage/pages/HappyGroupDetailManage";
import HappyGroupCreate from "./usermanage/pages/HappyGroupCreate";
import DreamManage from "./usermanage/pages/DreamManage";
import DreamManageList from "./usermanage/pages/DreamManageList";
import DreamUserDetailPage from "./usermanage/pages/DreamUserDetailPage";
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
          <Route path="userdetail/:id" element={<HappyUserDetailPage />}></Route>
        </Route>
        <Route path="signuplist" element={<HappyinSignupListPage />}></Route>
        <Route path="singupdetail/:id" element={<SignUpDetail />}></Route>
        <Route path="happy-manage/group" element={<HappyManageGroup />}></Route>
        <Route path="happy-manage/group/detail/:groupId" element={<HappyGroupDetailPage />}></Route>
        <Route path="happy-manage/group/detail/manage/:groupId" element={<HappyGroupDetailManage />}></Route>
        <Route path="happy-manage/group/create" element={<HappyGroupCreate />}></Route>
      </Route>

      <Route path="dream-manage" element={<DreamManage />}>
        <Route index element={<DreamManageList />}></Route>
        <Route path="user/detail/:id" element={<DreamUserDetailPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
