// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// 메인/공통
import Main from "./usermanage/pages/Main";

// 공지/추천
import AnnouncementPage from "./postmanage/pages/AnnouncementPage";
import AnnouncementList from "./postmanage/pages/AnnouncementList";
import RecommendationPage from "./postmanage/pages/RecommendationPage";
import RecommendationList from "./postmanage/pages/RecommendationList";

// 메시지
import Message from "./sendmessage/pages/Message";
import MessageList from "./sendmessage/pages/MessageList";
import MessageSend from "./sendmessage/pages/MessageSend";

// 이벤트
import Event from "./eventmanage/pages/Event";
import EventList from "./eventmanage/pages/EventList";

// 로그인
import LoginPage from "./login/pages/LoginPage";

// 회원 관리
import User from "./usermanage2/pages/User";
import DreamUserPage from "./usermanage2/pages/DreamUserPage";
import DreamUserDetailPage from "./usermanage2/pages/DreamUserDetailPage";
import HappyUserPage from "./usermanage2/pages/HappyUserPage";
import HappyUserDetailPage from "./usermanage2/pages/HappyUserDetailPage";
import HappyUserApplicationPage from "./usermanage2/pages/HappyUserApplicationPage";
import HappyUserApplicationDetailPage from "./usermanage2/pages/HappyUserApplicationDetailPage";
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
import CatsEyeDetailPage from "./postmanage2/pages/CatsEyeDetailPage";
import OvercomePage from "./postmanage2/pages/OvercomePage";
import OvercomeDetailPage from "./postmanage2/pages/OvercomeDetailPage";
import ReportedPostPage from "./postmanage2/pages/ReportedPostPage";
import ReportedPostDetailPage from "./postmanage2/pages/ReportedPostDetailPage";

// 학교 관리
import School from "./schoolmanage/pages/School";
import SchoolPolicePage from "./schoolmanage/pages/SchoolPolicePage";
import MemberSchoolPage from "./schoolmanage/pages/MemberSchoolPage";
import MemberSchoolDetailPage from "./schoolmanage/pages/MemberSchoolDetailPage";

// 시스템 관리
import System from "./systemmanage/pages/System";
import SystemOverviewPage from "./systemmanage/pages/SystemOverviewPage";
import FnQPage from "./systemmanage/pages/FnQPage";
import HelpersPage from "./systemmanage/pages/HelpersPage";
import AdminPage from "./systemmanage/pages/AdminPage";

/**
 * 로그인 체크용 래퍼
 * - 인증 안 되어 있으면 /login 으로 보냄
 */
function RequireAuth() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      {/* 공개 라우트: 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 이 아래는 전부 로그인 필요 */}
      <Route element={<RequireAuth />}>
        {/* 🔹 로그인 후 기본 진입: 해피인 관리 */}
        <Route path="/" element={<Navigate to="/user/happy" replace />} />

        {/* 필요하면 대시보드용 메인 페이지도 보호된 경로로 남겨둠 */}
        <Route path="/main" element={<Main />} />

        {/* 공지/추천 */}
        {/* <Route path="announcement" element={<AnnouncementPage />}>
          <Route index element={<AnnouncementList />} />
        </Route> */}

        {/* <Route path="recommendation" element={<RecommendationPage />}>
          <Route index element={<RecommendationList />} />
        </Route> */}

        {/* 메시지 */}
        {/* <Route path="message-list" element={<Message />}>
          <Route index element={<MessageList />} />
          <Route path="send" element={<MessageSend />} />
        </Route> */}

        {/* 이벤트 */}
        {/* <Route path="event-list" element={<Event />}>
          <Route index element={<EventList />} />
        </Route> */}

        {/* 회원 관리 */}
        <Route path="user" element={<User />}>
          <Route path="happy" element={<HappyUserPage />} />
          <Route path="happy/detail/:id" element={<HappyUserDetailPage />} />
          <Route
            path="happy/application"
            element={<HappyUserApplicationPage />}
          />
          <Route
            path="happy/application/detail/:id"
            element={<HappyUserApplicationDetailPage />}
          />
          <Route path="dream" element={<DreamUserPage />} />
          <Route path="dream/detail/:id" element={<DreamUserDetailPage />} />
          <Route path="paused" element={<PausedUserPage />} />
          <Route path="banned" element={<BannedUserPage />} />
        </Route>

        {/* 게시물 관리 */}
        <Route path="post" element={<Post />}>
          <Route path="holpa" element={<HolpaPage />} />
          <Route path="holpa/detail/:postId" element={<HolpaDetailPage />} />
          <Route path="catseye" element={<CatsEyePage />} />
          <Route
            path="catseye/detail/:postId"
            element={<CatsEyeDetailPage />}
          />
          <Route path="overcome" element={<OvercomePage />} />
          <Route
            path="overcome/detail/:postId"
            element={<OvercomeDetailPage />}
          />
          <Route path="reported" element={<ReportedPostPage />} />
          <Route
            path="reported/detail/user/:userId/post/:postId"
            element={<ReportedPostDetailPage />}
          />
          <Route path="life" element={<LifeMessagePage />} />
          <Route path="hope" element={<HopeMessagePage />} />
          <Route
            path="congratulatory"
            element={<CongratulatoryMessagePage />}
          />
        </Route>

        {/* 학교 경찰서 / 학교 관리 */}
        <Route path="school-police" element={<School />}>
          <Route index element={<SchoolPolicePage />} />
          <Route path="member-school" element={<MemberSchoolPage />} />
          <Route
            path="member-school/detail/:id"
            element={<MemberSchoolDetailPage />}
          />
        </Route>

        {/* 시스템 관리 */}
        <Route path="system" element={<System />}>
          <Route index element={<SystemOverviewPage />} />
          {/* <Route path="fnq" element={<FnQPage />} />
          <Route path="helpers" element={<HelpersPage />} /> */}
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Route>

      {/* 그 외 모든 경로 → 로그인 또는 기본 페이지로 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
