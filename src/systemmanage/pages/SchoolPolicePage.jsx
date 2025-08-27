import { useState } from "react";
import {
  Box,
  Stack,
  Button,
} from "@mui/material";
import ContentSearchbar from "../../components/ContentSearchbar";
import SchoolTable from "../components/SchoolTable";
import SchoolPoliceTabsNav from "../components/SchoolPoliceTabsNav";
import SchoolStatistics from "../components/SchoolStatistics";
import SchoolRegisterButton from "../components/SchoolRegisterButton";
import SimpleSchoolRegisterDialog from "../components/SimpleSchoolRegisterDialog";

const SchoolPolicePage = () => {
  const [tab, setTab] = useState("school"); // 'school' or 'police'

  const [openMemberSchoolForm, setOpenMemberSchoolForm] = useState(false);
  const [openSchoolForm, setOpenSchoolForm] = useState(false);

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 검색바 */}
      <Stack direction="row" spacing={6} marginLeft="330px" sx={{ gap: "65px" }} >
        <ContentSearchbar />
      </Stack>

      {/* 탭 선택 */}
      <Box sx={{ mt: 3 }}>
        <SchoolPoliceTabsNav value={tab} onChange={setTab} />
      </Box>

      {/* 통계 박스 */}
      <Box sx={{ mt: 2 }}>
        {tab === "school" && 
          <SchoolStatistics
            nationTotal={11984}
            nationElem={5000}
            nationMid={3000}
            nationHigh={1984}
            registeredTotal={120}
            registeredElem={60}
            registeredMid={30}
            registeredHigh={30}
          />
        }
        {tab === "police" &&
          <div>경찰서 통계 준비 중...</div>
        }
      </Box>

      {/* 버튼 위치: 탭 아래에 넣기 */}
      <Box sx={{ mt: 2, ml: 2 }}>
        {tab === "school" && 
        <SchoolRegisterButton
          onOpenSchool={() => setOpenMemberSchoolForm(true)}
          onOpenPolice={() => setOpenSchoolForm(true)}
        />
        }
        {tab === "police" && <div>경찰서 등록 버튼 준비 중...</div>}
      </Box>

      {/* 테이블 */}
      <Box sx={{ mt: 2 }}>
        {tab === "school" && <SchoolTable />}
        {tab === "police" && <div>경찰서 테이블 준비 중...</div>}
      </Box>

      {/* 팝업 다이얼로그 - 학교 등록 */}
      <SimpleSchoolRegisterDialog
        open={openSchoolForm}
        onClose={() => setOpenSchoolForm(false)}
      />
    </Box>
  );
};

export default SchoolPolicePage;
