// src/pages/system/SchoolPolicePage.jsx
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import SchoolTable from "../components/SchoolTable";
import SchoolPoliceTabsNav from "../components/SchoolPoliceTabsNav";
import SchoolStatistics from "../components/SchoolStatistics";
import SchoolRegisterButton from "../components/SchoolRegisterButton";
import SimpleSchoolRegisterDialog from "../components/SimpleSchoolRegisterDialog";
import MemeberSchoolRegisterDialog from "../components/MemberSchoolRegisterDialog";
import { useSchoolStats, useSchoolList } from "../hooks/useSchool";

const SchoolPolicePage = () => {
  const [tab, setTab] = useState("school"); // 'school' | 'police'

  const [openMemberSchoolForm, setOpenMemberSchoolForm] = useState(false);
  const [openSchoolForm, setOpenSchoolForm] = useState(false);

  // ---- 통계 훅 (school 탭에서 사용) ----
  const {
    schoolStats,
    memberSchoolStats,
    loading: statsLoading,
    refetch: refetchStats,
  } = useSchoolStats();

  // ---- 목록 훅 (school 탭에서 사용) ----
  const {
    rows,
    totalPages,
    loading: listLoading,
    // 제어기
    filters,
    setFilters,
    page,
    setPage,
    size,
    setSize,
    sort,
    setSort,
  } = useSchoolList({
    initialPage: 1,
    initialSize: 25,
    initialSort: { key: "name", dir: "asc" },
  });

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Box sx={{ mt: 1 }}>
        <SchoolPoliceTabsNav value={tab} onChange={setTab} />
      </Box>

      {/* 통계 */}
      <Box sx={{ mt: 2 }}>
        {tab === "school" ? (
          <SchoolStatistics
            // 국가 통계
            nationTotal={schoolStats?.totalCount ?? 0}
            nationElem={schoolStats?.elementaryCount ?? 0}
            nationMid={schoolStats?.middleCount ?? 0}
            nationHigh={schoolStats?.highCount ?? 0}
            // 회원 학교 통계
            registeredTotal={memberSchoolStats?.totalCount ?? 0}
            registeredElem={memberSchoolStats?.elementaryCount ?? 0}
            registeredMid={memberSchoolStats?.middleCount ?? 0}
            registeredHigh={memberSchoolStats?.highCount ?? 0}
            // 로딩/새로고침
            loading={statsLoading}
            onRefresh={refetchStats}
          />
        ) : (
          <div>경찰서 통계 준비 중...</div>
        )}
      </Box>

      {/* 액션 버튼 */}
      <Box sx={{ mt: 2, ml: 2 }}>
        {tab === "school" ? (
          <SchoolRegisterButton
            onOpenMemberSchool={() => setOpenMemberSchoolForm(true)}
            onOpenSchool={() => setOpenSchoolForm(true)}
          />
        ) : (
          <div>경찰서 등록 버튼 준비 중...</div>
        )}
      </Box>

      {/* 테이블 */}
      <Box sx={{ mt: 2 }}>
        {tab === "school" ? (
          <SchoolTable
            // 데이터
            rows={rows}
            totalPages={totalPages}
            page={page}
            loading={listLoading}
            // 제어기
            setPage={setPage}
            sort={sort}
            setSort={setSort}
            filters={filters}
            setFilters={setFilters}
            size={size}
            setSize={setSize}
          />
        ) : (
          <div>경찰서 테이블 준비 중...</div>
        )}
      </Box>

      {/* 팝업 다이얼로그 - 학교 등록 */}
      <SimpleSchoolRegisterDialog
        open={openSchoolForm}
        onClose={() => setOpenSchoolForm(false)}
      />

      {/* 팝업 다이얼로그 - 회원 학교 등록 */}
      <MemeberSchoolRegisterDialog
        open={openMemberSchoolForm}
        onClose={() => setOpenMemberSchoolForm(false)}
      />
    </Box>
  );
};

export default SchoolPolicePage;
