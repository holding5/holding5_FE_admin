// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// 메인/공통
import Main from "./usermanage/pages/Main";

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
import CongratulatoryMessagePage from "./postmanage2/pages/CongratulatoryMessagePage";
import NoticePage from "./noticemanage/pages/NoticePage";
import HolpaPage from "./postmanage2/pages/HolpaPage";
import HolpaDetailPage from "./postmanage2/pages/HolpaDetailPage";
import CatsEyePage from "./postmanage2/pages/CatsEyePage";
import CatsEyeDetailPage from "./postmanage2/pages/CatsEyeDetailPage";
import OvercomePage from "./postmanage2/pages/OvercomePage";
import OvercomeDetailPage from "./postmanage2/pages/OvercomeDetailPage";
import ReportedPostPage from "./postmanage2/pages/ReportedPostPage";
import ReportedPostDetailPage from "./postmanage2/pages/ReportedPostDetailPage";
import HopeMessagePage from "./postmanage2/pages/HopeMessagePage";
import LifeMessagePage from "./postmanage2/pages/LifeMessagePage";

// 돛단배 관리
import Boat from "./boat/pages/Boat";
import BoatPage from "./boat/pages/BoatPage";

// 미카엘 노트 관리
import MichaelNote from "./michaelnote/pages/MichaelNote";
import MichaelNotePage from "./michaelnote/pages/MichaelNotePage";

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
import SuggestionPage from "./suggestionmanage/pages/SuggestionPage";
import ContributorPage from "./contributormanage/pages/ContributorPage";

/**
 * 로그인 체크용 래퍼
 * - 인증 안 되어 있으면 /login 으로 보냄
 */
function RequireAuth() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      {/* 공개 라우트: 로그인 페이지 */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* 이 아래는 전부 로그인 필요 */}
      <Route path="/admin" element={<RequireAuth />}>
        {/* 🔹 로그인 후 기본 진입: 해피인 관리 */}
        <Route index element={<Navigate to="user/happy" replace />} />

        {/* 필요하면 대시보드용 메인 페이지도 보호된 경로로 남겨둠 */}
        <Route path="main" element={<Main />} />

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
          <Route path="notice" element={<NoticePage />} />
        </Route>

        {/* 돛단배 관리 */}
        <Route path="boat" element={<Boat />}>
          <Route path="boat-list" element={<BoatPage />}></Route>
        </Route>

        {/* 미카엘 노트 관리 */}
        <Route path="note" element={<MichaelNote />}>
          <Route path="michaelnote" element={<MichaelNotePage />}></Route>
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
          <Route path="admin" element={<AdminPage />} />
          <Route path="suggestion" element={<SuggestionPage />} />
          <Route path="contributor" element={<ContributorPage />} />
        </Route>
      </Route>

      {/* 그 외 모든 경로 → 로그인 또는 기본 페이지로 */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;
