// src/pages/system/SchoolPolicePage.jsx
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import MemberSchoolTable from "../components/MemberSchoolTable";
import MemberSchoolStatistics from "../components/MemberSchoolStatistics";
import { useSchoolStats, useMemberSchoolList } from "../hooks/useSchool";

const MemberSchoolPage = () => {
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
  } = useMemberSchoolList({
    initialPage: 1,
    initialSize: 25,
    initialSort: { key: "name", dir: "asc" },
  });

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 통계 */}
      <Box sx={{ mt: 1 }}>
        <MemberSchoolStatistics
          // 회원 학교 통계
          registeredTotal={memberSchoolStats?.totalCount ?? 0}
          registeredElem={memberSchoolStats?.elementaryCount ?? 0}
          registeredMid={memberSchoolStats?.middleCount ?? 0}
          registeredHigh={memberSchoolStats?.highCount ?? 0}
          // 로딩/새로고침
          loading={statsLoading}
          onRefresh={refetchStats}
        />
      </Box>

      {/* 테이블 */}
      <Box sx={{ mt: 2 }}>
        <MemberSchoolTable
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
      </Box>
    </Box>
  );
};

export default MemberSchoolPage;
