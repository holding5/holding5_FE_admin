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

import HopeMessage from "./postmanage/pages/HopeMessage";
import HopeMessageList from "./postmanage/pages/HopeMessageList";
import HopeMessageInputPage from "./postmanage/pages/HopeMessageInputPage";

import CongratulatoryMessage from "./postmanage/pages/CongratulatoryMessage";
import CongratulatoryMessageList from "./postmanage/pages/CongratulatoryMessageList";
import CongratulatoryMessageInputPage from "./postmanage/pages/CongratulatoryMessageInputPage";

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
import HopeMessageManagePage from "./postmanage/pages/HopeMessageManagePage";

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

// 시스템 관리
import System from "./systemmanage/pages/System";
import SystemOverviewPage from "./systemmanage/pages/SystemOverviewPage";
import FnQPage from "./systemmanage/pages/FnQPage";
import HelpersPage from "./systemmanage/pages/HelpersPage";
import SchoolPolicePage from "./systemmanage/pages/SchoolPolicePage";

// 게시물 관리
import Post from "./postmanage2/pages/Post";
import LifeMessagePage from "./postmanage2/pages/LifeMessagePage";
import HopeMessagePage from "./postmanage2/pages/HopeMessagePage";

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

      <Route path="dream-manage" element={<DreamManage />}>
        <Route index element={<DreamManageList />}></Route>
        <Route path="user/detail/:id" element={<DreamUserDetailPage />}></Route>
      </Route>

      <Route path="hope-message" element={<HopeMessage />}>
        <Route index element={<HopeMessageList />}></Route>
        <Route path="input" element={<HopeMessageInputPage />}></Route>
      </Route>

      <Route path="congratulatory-message" element={<CongratulatoryMessage />}>
        <Route index element={<CongratulatoryMessageList />}></Route>
        <Route path="input" element={<CongratulatoryMessageInputPage />}></Route>
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

      {/* 시스템 관리 */}
      <Route path="system" element={<System />}> 
        <Route index element={<SystemOverviewPage />}></Route>
        <Route path="fnq" element={<FnQPage />}></Route>
        <Route path="helpers" element={<HelpersPage />}></Route>
        <Route path="school-police" element={<SchoolPolicePage />}></Route>
      </Route>

      {/* 게시물 관리 */}
      <Route path="post" element={<Post />}>
        <Route path="life-message" element={<LifeMessagePage />}></Route>
        <Route path="hope-message" element={<HopeMessagePage />}></Route>
      </Route>

    </Routes>
  );
}

export default App;
