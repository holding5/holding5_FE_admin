import {
  Button,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  Stack,
  Box,
} from "@mui/material";
import React from "react";
import FooterBtn from "../components/FooterBtn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import UserDetailPosts from "../components/UserDetailPosts";
import UserDetailEvaluation from "../components/UserDetailEvaluation";
import PauseUserDetailProfile from "../components/PauseUserDetailProfile";
import ContentSearchbar from "../../components/ContentSearchbar";
import { Reviews } from "@mui/icons-material";

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
const activeBtn = [
  {
    id: "profile",
    text: "신상정보",
    activeColor: "#d34204d0",
    inactiveColor: "#1976d2",
  },
  {
    id: "posts",
    text: "게시물활동",
    activeColor: "#d34204d0",
    inactiveColor: "#1976d2",
  },

  {
    id: "eval",
    text: "활동평가",
    activeColor: "#d34204d0",
    inactiveColor: "#1976d2",
  },
];

const BannedUserDetailPage = () => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [anchorEl, setAnchorEl] = useState(false);

  const onClickModalOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const activeComponents = {
    profile: <PauseUserDetailProfile userData={userData} />,
    posts: <UserDetailPosts />,
    eval: <UserDetailEvaluation />,
  };
  const onClickModalClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ p: 3, mb: "10px" }}>
        <Button
          onClick={() => {
            nav(-1);
          }}
          sx={{
            backgroundColor: "rgba(7, 209, 245, 1)",
            textTransform: "none",
            borderRadius: "10px",
            fontSize: "1.2rem",
            color: "white",
            p: "0.6rem 2rem",
          }}
        >
          back
        </Button>
      </Box>

      <Stack
        direction="row"
        sx={{ paddingLeft: "50px", gap: "30px", marginBottom: "20px" }}
      >
        {activeBtn.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
              }}
              sx={{
                padding: "5px 40px",
                backgroundColor: isActive
                  ? item.activeColor
                  : item.inactiveColor,
                color: "white",
                borderRadius: "2px",
              }}
            >
              {item.text}
            </Button>
          );
        })}
      </Stack>

      <Box sx={{ paddingLeft: "3.125rem" }}>{activeComponents[activeTab]}</Box>
    </Box>
  );
};

export default BannedUserDetailPage;
