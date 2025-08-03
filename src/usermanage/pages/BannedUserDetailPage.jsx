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
import SignUpDetailButton from "../components/SignUpDetailButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import UserDetailPosts from "../components/UserDetailPosts";
import UserDetailEvaluation from "../components/UserDetailEvaluation";
import PauseUserDetailPage from "./PauseUserDetailPage";
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

const BannedUserDetailPage = () => {
  const userData = useOutletContext();
  const nav = useNavigate();
  const [selectBtn, setSelectBtn] = useState("info");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const buttonColor = ["#d34204d0", "#1976d2"];
  const btnInfo = [
    { value: "info", text: "신상정보" },
    { value: "posts", text: "게시물활동" },
    { value: "review", text: "활동평가" },
  ];

  const components = {
    info: <PauseUserDetailPage userData={userData} />,
    posts: <UserDetailPosts />,
    review: <UserDetailEvaluation />,
  };

  const onClickChangeContent = (e) => {
    setSelectBtn(e.target.value);
  };
  const handleAdminClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="main" sx={{ mt: 3 }}>
      <Stack
        direction="row"
        sx={{
          pl: "30px",
          pr: "50px",
          mb: "10px",
          gap: "150px",
        }}
      >
        <Button
          onClick={() => {
            nav(-1);
          }}
          sx={{
            backgroundColor: "rgba(7, 209, 245, 1)",

            color: "white",
            padding: "10px 30px",
          }}
        >
          back
        </Button>

        <ContentSearchbar />
      </Stack>

      <Stack direction="row" sx={{ ml: "40px", gap: "20px" }}>
        {btnInfo.map((item) => (
          <SignUpDetailButton
            key={item.value}
            value={item.value}
            color={selectBtn === item.value ? buttonColor[0] : buttonColor[1]}
            onClickChangeContent={onClickChangeContent}
            text={item.text}
          />
        ))}
      </Stack>

      <Box sx={{ paddingLeft: "3.125rem" }}>{components[selectBtn]}</Box>
    </Box>
  );
};

export default BannedUserDetailPage;
