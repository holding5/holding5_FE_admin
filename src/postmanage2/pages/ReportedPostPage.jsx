import { Stack, Box } from "@mui/material";
import { useState } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import ReportedPostTabsNav from "../components/ReportedPostTabsNav";
import ReportedPostTable from "../components/ReportedPostTable";

const ReportedPostPage = () => {
  const [activeTab, setActiveTab] = useState("holpa");

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 검색바 */}
      <Stack
        direction="row"
        spacing={6}
        marginLeft="330px"
        sx={{ gap: "65px" }}
      >
        <ContentSearchbar />
      </Stack>

      <Box sx={{ mt: 3 }}>
        <ReportedPostTabsNav value={activeTab} onChange={setActiveTab} />

        <Box sx={{ mt: 2 }}>
          {/* ✅ 테이블에 필터값 전달 */}
          <ReportedPostTable filter={activeTab} />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportedPostPage;
