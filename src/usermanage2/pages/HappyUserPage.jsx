// src/pages/HappyUserPage.jsx
import { useState } from "react";
import { Box } from "@mui/material";
import HappyUserTable from "../components/HappyUserTable";
import HappyUserTabsNav from "../components/HappyUserTabsNav";
import HappyUserPhotoView from "../components/HappyUserPhotoView"; // ✅ 새로 만들 예정

const HappyUserPage = () => {
  const [viewMode, setViewMode] = useState("img"); // "img" | "list" 나중에 img로 바꾸기

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 2, px: 2 }}>
      {/* 상단 탭 */}
      <HappyUserTabsNav value={viewMode} onChange={setViewMode} />

      {/* 탭 아래 내용 */}
      <Box sx={{ mt: 2 }}>
        {viewMode === "img" ? <HappyUserPhotoView /> : <HappyUserTable />}
      </Box>
    </Box>
  );
};

export default HappyUserPage;
