import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import HolpaBoardTable from "../components/HolpaBoardTable";
import { useNavigate } from "react-router-dom";
import HolpaBoardDetailPage from "./HolpaBoardDetailPage";
import { Outlet } from "react-router-dom";

const tableData = [
  {
    id: 10,
    category: "자유게시판",
    content: "MUI로 레이아웃 짜는거 질문있습니다.",
    author: "개발새싹",
    createdAt: "2025-07-28",
    likes: 15,
    reports: 0,
    commentCount: 5,
    thoughtCount: 2,
    heartCount: 8,
    status: 0,
    messageSent: "",
  },
  {
    id: 9,
    category: "정보공유",
    content: "요즘 프론트엔드 개발 트렌드 (2025년)",
    author: "고인물",
    createdAt: "2025-07-27",
    likes: 120,
    reports: 1,
    commentCount: 25,
    thoughtCount: 30,
    heartCount: 55,
    status: 0,
    messageSent: "",
  },
  {
    id: 8,
    category: "잡담",
    content: "오늘 양산 날씨 정말 덥네요.",
    author: "날씨요정",
    createdAt: "2025-07-26",
    likes: 5,
    reports: 0,
    commentCount: 12,
    thoughtCount: 1,
    heartCount: 3,
    status: 1,
    messageSent: "",
  },
  {
    id: 7,
    category: "질문",
    content: "useEffect 의존성 배열 관련 질문입니다.",
    author: "리액트초보",
    createdAt: "2025-07-25",
    likes: 33,
    reports: 0,
    commentCount: 8,
    thoughtCount: 12,
    heartCount: 10,
    status: 5,
    messageSent: "",
  },
  {
    id: 6,
    category: "정보공유",
    content: "[삭제된 게시물입니다]",
    author: "알수없음",
    createdAt: "2025-07-24",
    likes: 0,
    reports: 5,
    commentCount: 0,
    thoughtCount: 0,
    heartCount: 0,
    status: 5,
    messageSent: "",
  },
  {
    id: 5,
    category: "프로젝트",
    content: "사이드 프로젝트 같이 하실 분 구합니다!",
    author: "팀원모집중",
    createdAt: "2025-07-23",
    likes: 42,
    reports: 0,
    commentCount: 18,
    thoughtCount: 9,
    heartCount: 21,
    status: 5,
    messageSent: "",
  },
  {
    id: 4,
    category: "유머",
    content: "개발자만 웃을 수 있는 짤.jpg",
    author: "유머왕",
    createdAt: "2025-07-22",
    likes: 250,
    reports: 0,
    commentCount: 45,
    thoughtCount: 100,
    heartCount: 88,
    status: 2,
    messageSent: "",
  },
  {
    id: 3,
    category: "IT뉴스",
    content: "새로운 자바스크립트 런타임 Bun 2.0 출시",
    author: "IT뉴스봇",
    createdAt: "2025-07-21",
    likes: 88,
    reports: 0,
    commentCount: 15,
    thoughtCount: 40,
    heartCount: 30,
    status: 1,
    messageSent: "",
  },
  {
    id: 2,
    category: "질문",
    content: "Next.js에서 SEO 최적화하는 팁 있을까요?",
    author: "넥스트꿈나무",
    createdAt: "2025-07-20",
    likes: 56,
    reports: 0,
    commentCount: 9,
    thoughtCount: 15,
    heartCount: 22,
    status: 3,
    messageSent: "",
  },
  {
    id: 1,
    category: "잡담",
    content: "다들 저녁 뭐 드셨나요?",
    author: "배고파요",
    createdAt: "2025-07-19",
    likes: 3,
    reports: 0,
    commentCount: 22,
    thoughtCount: 0,
    heartCount: 2,
    status: 1,
    messageSent: "",
  },
];

const HolpaBoardPage = () => {
  const nav = useNavigate();

  const onClickPage = (id) => {
    nav(`/holpa-board/${id}`);
  };
  return (
    <Box>
      <Box component="section">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "30px",
            mb: "30px",
          }}
        >
          <ContentSearchbar />
        </Box>

        <Outlet context={{ data: tableData, onClick: onClickPage }} />
      </Box>
    </Box>
  );
};

export default HolpaBoardPage;
