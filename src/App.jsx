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

import Main from "./usermanage/pages/Main";
import HappyinSignupListPage from "./usermanage/pages/HappyinSignupListPage";
import SignUpDetail from "./usermanage/pages/SignUpDetail";

import RankManagePage from "./usermanage/pages/RankManagePage";
import RankManageList from "./usermanage/components/RankManageList";
import RankManageDetailPage from "./usermanage/pages/RankManageDetailPage";

import PausedUserManagePage from "./usermanage/pages/PausedUserManagePage";
import ReportListPage from "./usermanage/pages/ReportListPage";
import PauseUserDetailPage from "./usermanage/pages/PauseUserDetailPage";
import PauseUserListPage from "./usermanage/pages/PauseUserListPage";
import BannedUserManagePage from "./usermanage/pages/BannedUserManagePage";
import BannedUserDetailPage from "./usermanage/pages/BannedUserDetailPage";
import BannedUserListPage from "./usermanage/pages/BannedUserListPage";

import HolpaBoardPage from "./postmanage/pages/HolpaBoardPage";
import HolpaBoardDetailPage from "./postmanage/pages/HolpaBoardDetailPage";
import HolpaBoardTable from "./postmanage/components/HolpaBoardTable";

import CatsEyeTruthNotePage from "./postmanage/pages/CatsEyeTruthNotePage";
import CatsEyeTable from "./postmanage/components/CatsEyeTable";
import TruthNoteList from "./postmanage/components/TruthNoteList";
import CatsEyeDetailPage from "./postmanage/components/CatsEyeDetailPage";

import OverComingPage from "./postmanage/pages/OverComingPage";
import OverComingDetailPage from "./postmanage/pages/OverComingDetailPage";
import OverComingList from "./postmanage/components/OverComingList";

import AnnouncementPage from "./postmanage/pages/AnnouncementPage";
import AnnouncementList from "./postmanage/pages/AnnouncementList";

import RecommendationPage from "./postmanage/pages/RecommendationPage";
import RecommendationList from "./postmanage/pages/RecommendationList";

import Message from "./sendmessage/pages/Message";
import MessageList from "./sendmessage/pages/MessageList";
import MessageSend from "./sendmessage/pages/MessageSend";

import Event from "./eventmanage/pages/Event";
import EventList from "./eventmanage/pages/EventList";

// 로그인
import LoginPage from "./login/pages/LoginPage";
import KakaoCallback from "./login/pages/KaKaoCallBack";

// 회원 관리
import User from "./usermanage2/pages/User";
import DreamUserPage from "./usermanage2/pages/DreamUserPage";
import DreamUserDetailPage from "./usermanage2/pages/DreamUserDetailPage";

import PausedUserPage from "./usermanage2/pages/PausedUserPage";
import BannedUserPage from "./usermanage2/pages/BannedUserPage";

// 게시물 관리
import Post from "./postmanage2/pages/Post";
import LifeMessagePage from "./postmanage2/pages/LifeMessagePage";
import HopeMessagePage from "./postmanage2/pages/HopeMessagePage";
import CongratulatoryMessagePage from "./postmanage2/pages/CongratulatoryMessagePage";
import HolpaPage from "./postmanage2/pages/HolpaPage";
import HolpaDetailPage from "./postmanage2/pages/HolpaDetailPage";
import CatsEyePage from "./postmanage2/pages/CatsEyePage";

import ReportedPostPage from "./postmanage2/pages/ReportedPostPage";
import ReportedPostDetailPage from "./postmanage2/pages/ReportedPostDetailPage";

// 시스템 관리
import System from "./systemmanage/pages/System";
import SystemOverviewPage from "./systemmanage/pages/SystemOverviewPage";
import FnQPage from "./systemmanage/pages/FnQPage";
import HelpersPage from "./systemmanage/pages/HelpersPage";
import SchoolPolicePage from "./systemmanage/pages/SchoolPolicePage";

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

          <Route
            path="happy-manage/group"
            element={<HappyManageGroup />}
          ></Route>
          <Route
            path="happy-manage/group/detail/:groupId"
            element={<HappyGroupDetailPage />}
          ></Route>
          <Route
            path="happy-manage/group/detail/manage/:groupId"
            element={<HappyGroupDetailManage />}
          ></Route>
          <Route
            path="happy-manage/group/create"
            element={<HappyGroupCreate />}
          ></Route>
        </Route>
        <Route path="signuplist" element={<HappyinSignupListPage />}></Route>
        <Route path="singupdetail/:id" element={<SignUpDetail />}></Route>

        <Route path="rankmanage" element={<RankManagePage />}>
          <Route index element={<RankManageList />}></Route>
        </Route>
        <Route
          path="rankmanagedetail"
          element={<RankManageDetailPage />}
        ></Route>

        <Route path="pausedmanage" element={<PausedUserManagePage />}>
          <Route index element={<PauseUserListPage />} />
          <Route path="detail" element={<PauseUserDetailPage />} />
          <Route
            path=":userId/reports/:reportType"
            element={<ReportListPage />}
          />
        </Route>

        <Route path="banned-manage" element={<BannedUserManagePage />}>
          <Route index element={<BannedUserListPage />}></Route>
          <Route path="detail" element={<BannedUserDetailPage />}></Route>
        </Route>

        <Route path="holpa-board" element={<HolpaBoardPage />}>
          <Route index element={<HolpaBoardTable />} />

          <Route path=":id" element={<HolpaBoardDetailPage />}></Route>
        </Route>

        <Route path="catseye-truth" element={<CatsEyeTruthNotePage />}>
          <Route index element={<CatsEyeTable />}></Route>
          <Route path="cats" element={<CatsEyeTable />}></Route>
          <Route path="truth" element={<TruthNoteList />}></Route>
          <Route path="catseye-detail" element={<CatsEyeDetailPage />}></Route>
        </Route>

        <Route path="overcoming" element={<OverComingPage />}>
          <Route index element={<OverComingList />} />
          <Route path="detail" element={<OverComingDetailPage />} />
        </Route>
      </Route>

      <Route path="announcement" element={<AnnouncementPage />}>
        <Route index element={<AnnouncementList />}></Route>
      </Route>

      <Route path="recommendation" element={<RecommendationPage />}>
        <Route index element={<RecommendationList />}></Route>
      </Route>

      <Route path="message-list" element={<Message />}>
        <Route index element={<MessageList />}></Route>
        <Route path="send" element={<MessageSend />}></Route>
      </Route>

      <Route path="event-list" element={<Event />}>
        <Route index element={<EventList />}></Route>
      </Route>

      {/* 로그인 */}
      <Route path="login" element={<LoginPage />}></Route>
      <Route path="auth/kakao/callback" element={<KakaoCallback />}></Route>

      {/* 회원 관리 */}
      <Route path="user" element={<User />}>
        <Route path="dream" element={<DreamUserPage />}></Route>
        <Route
          path="dream/detail/:id"
          element={<DreamUserDetailPage />}
        ></Route>

        <Route path="paused" element={<PausedUserPage />}></Route>
        <Route path="banned" element={<BannedUserPage />}></Route>
      </Route>

      {/* 게시물 관리 */}
      <Route path="post" element={<Post />}>
        <Route path="life-message" element={<LifeMessagePage />}></Route>
        <Route path="hope-message" element={<HopeMessagePage />}></Route>
        <Route
          path="congratulatory-message"
          element={<CongratulatoryMessagePage />}
        ></Route>
        <Route path="holpa" element={<HolpaPage />}></Route>
        <Route
          path="holpa/detail/:postId"
          element={<HolpaDetailPage />}
        ></Route>
        <Route path="cats-eye" element={<CatsEyePage />}></Route>

        <Route path="reported" element={<ReportedPostPage />}></Route>
        <Route
          path="reported/detail/:postId"
          element={<ReportedPostDetailPage />}
        ></Route>
      </Route>

      {/* 시스템 관리 */}
      <Route path="system" element={<System />}>
        <Route index element={<SystemOverviewPage />}></Route>
        <Route path="fnq" element={<FnQPage />}></Route>
        <Route path="helpers" element={<HelpersPage />}></Route>
        <Route path="school-police" element={<SchoolPolicePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
