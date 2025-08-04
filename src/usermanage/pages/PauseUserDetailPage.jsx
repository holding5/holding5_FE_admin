import { Box, Button, Stack } from "@mui/material";
import React from "react";
import AdminModal from "../components/AdminModal";
import { useNavigate } from "react-router-dom";
import SignUpDetailButton from "../components/SignUpDetailButton";
import FooterBtn from "../components/FooterBtn";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import PauseUserDetailEvaluation from "../components/PauseUserDetailEvaluation";
import PauseUserDetailProfile from "../components/PauseUserDetailProfile";
import UserDetailPosts from "../components/UserDetailPosts";
const fieldInfo = [
  { name: "id", label: "ID", type: "text" },
  { name: "nickname", label: "닉네임", type: "text" },
  { name: "pswd", label: "현재비밀번호", type: "text" },
  { name: "gender", label: "성별", type: "radio", option: ["남자", "여자"] },
  { name: "name", label: "이름", type: "text" },
  { name: "birthDate", label: "생년월일", type: "text" },
  { name: "phone", label: "연락처", type: "text" },
  { name: "school", label: "학교", type: "text" },
  { name: "history", label: "경력변경", type: "textarea" },
];

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

const PauseUserDetailPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const userData = useOutletContext();
  const [anchorEl, setAnchorEl] = useState(false);
  const nav = useNavigate();
  const onClickModalOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const activeComponents = {
    profile: <PauseUserDetailProfile userData={userData} />,
    posts: <UserDetailPosts />,
    eval: <PauseUserDetailEvaluation userData={userData} />,
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

export default PauseUserDetailPage;
