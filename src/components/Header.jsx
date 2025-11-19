// src/components/Header.jsx (파일 경로는 네 프로젝트 구조에 맞게)

import logoImage from "../assets/holding5.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Stack, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // 🔹 추가

const Header = () => {
  const nav = useNavigate();
  const { user, logout } = useAuth(); // 🔹 로그인 정보 / 로그아웃 함수

  const onClickHome = () => {
    nav("/admin"); // "/" → App에서 /user/happy 로 리다이렉트 되도록 이미 설정
  };

  const handleLogout = () => {
    logout(); // 토큰/유저 정보 제거
    nav("/admin/login", { replace: true });
  };

  const displayName = user?.email || "관리자";

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "10px 10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ paddingLeft: "20px" }}
      >
        <Box
          component="img"
          src={logoImage}
          alt="Holding5 로고"
          sx={{ height: 40, cursor: "pointer" }}
          onClick={onClickHome}
        />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={3}>
        {/* 🔹 이메일 기반 인사말 */}
        <Typography sx={{ mt: 1 }}>
          <Box
            component="span"
            sx={{ color: "#00BFFF", fontWeight: "bold", fontSize: "20px" }}
          >
            {displayName}
          </Box>{" "}
          님 반갑습니다.
        </Typography>

        {/* 🔹 마이페이지 대신 로그아웃 버튼 */}
        <Stack
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <LogoutIcon sx={{ fontSize: 30 }} />
          <Typography variant="caption">로그아웃</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
