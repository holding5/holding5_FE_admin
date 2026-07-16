import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import ContributorCrudTab from "../components/ContributorCrudTab";
import HelperReadonlyTab from "../components/HelperReadonlyTab";

/**
 * 도움주신 분 관리 페이지.
 * - 개발자/후원: contributor 테이블 기반 CRUD
 * - 해피인: 스타 해피인(users) 읽기 전용
 */
const ContributorPage = () => {
  const [tab, setTab] = useState("DEVELOPER");

  return (
    <Box component="section" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        도움주신 분 관리
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="개발자" value="DEVELOPER" />
        <Tab label="후원" value="SPONSOR" />
        <Tab label="해피인" value="HAPPYIN" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === "HAPPYIN" ? (
          <HelperReadonlyTab />
        ) : (
          <ContributorCrudTab key={tab} category={tab} />
        )}
      </Box>
    </Box>
  );
};

export default ContributorPage;
