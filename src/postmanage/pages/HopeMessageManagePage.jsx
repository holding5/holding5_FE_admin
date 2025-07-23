import { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import HopeMessageTable from "../components/HopeMessageTable";
import ContentSearchbar from "../../components/ContentSearchbar";
import { useNavigate } from "react-router-dom";
import HopeMessageApprovedList from "../components/HopeMessageApprovedList";
import HopeMessageRejectedList from "../components/HopeMessageRejectedList";
const userData = [
  {
    id: 55,
    category: "공통",
    inputType: "앱",
    religion: "모두에게",
    content: "모두에게 그래도 행복을 꿈꿔야 합니다", // 제목/내용
    fileName: "240304.m4a", // 파일명
    registrationDate: "2025.01.02 15:21:12", // 등록일시
    rejectionDate: "2025.03.02 15:21:13", // 거절일시
    author: "유재석(메뚜기)", // 작성자닉네임
    reportCount: 5, // 신고수
    commentCount: 0, // 답글
    lifeSaveCount: 0, // 생명살림
    courageCount: 0, // 용기위안
    note: "희망>생명", // 비고
  },
  {
    id: 54,
    category: "성적,학업",
    inputType: "웹",
    religion: "기독교",
    content: "성적보다 중요한 것",
    fileName: "",
    registrationDate: "2025.01.01 11:00:00",
    rejectionDate: "2025.03.01 18:00:00",
    author: "강호동",
    reportCount: 2,
    commentCount: 3,
    lifeSaveCount: 1,
    courageCount: 5,
    note: "희망>생명",
  },
];
const HopeMessageManagePage = () => {
  const nav = useNavigate();
  const [view, setView] = useState("retained");
  const [filters, setFilters] = useState({
    classification: "all",
    isAllow: "all",
    religion: "all",
  });

  const onChangeFilter = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };
  return (
    <Box sx={{ margin: "20px auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ContentSearchbar />
      </Box>
      <Box sx={{ px: "20px" }}>
        {view === "retained" ? (
          <HopeMessageApprovedList
            userData={userData}
            filters={filters}
            onChangeFilter={onChangeFilter}
          />
        ) : (
          <HopeMessageRejectedList />
        )}
      </Box>
    </Box>
  );
};

export default HopeMessageManagePage;
