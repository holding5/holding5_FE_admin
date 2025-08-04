import { Box, Stack, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import ContentSearchbar from "../../components/ContentSearchbar";
import { useNavigate } from "react-router-dom";
const userData = {
  id: "malfr3456@naver.com",
  nickname: "어리한청춘",
  password: "password123",
  gender: "male",
  name: "홍길동",
  birthDate: "20.12.03",
  phone: "010-3456-9098",
  school: "한국대학교",
  history: `2024. 06.30 : 드림인에서 또래해피인으로 변경
2021. 01.23 : 신고건으로 일시정지[30일] 관리자 해제
2020. 02.23 : 최초등록`,
};

const PausedUserManagePage = () => {
  const nav = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <ContentSearchbar />
      </Box>

      <Outlet context={{ userData: userData }} />
    </Box>
  );
};

export default PausedUserManagePage;
