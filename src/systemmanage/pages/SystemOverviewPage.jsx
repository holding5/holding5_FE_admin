import { Box, Stack, Paper, Typography, Divider } from "@mui/material";
import { useState } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import StatusSection from "../components/StatusSection";
const dayMetrics = [
  { key: "currentMembers", label: "현재 회원수" },
  { key: "todayNewMembers", label: "금일 등록회원" },
  { key: "todayOutMembers", label: "금일 탈퇴회원" },
  { key: "todayVisitors", label: "금일 접속자 수" },
  { key: "todayVisits", label: "금일 접속 횟수" },
];
const monthMetrics = [
  { key: "currentMembers", label: "현재 회원수" },
  { key: "monthNewMembers", label: "금월 등록회원" },
  { key: "monthOutMembers", label: "금월 탈퇴회원" },
  { key: "monthAvgVisitors", label: "평균 접속자 수" },
  { key: "monthAvgVisits", label: "평균 접속 횟수" },
];

const yearMetrics  = [
  { key: "currentMembers", label: "현재 회원수" },
  { key: "yearNewMembers", label: "금년 등록회원" },
  { key: "yearOutMembers", label: "금년 탈퇴회원" },
  { key: "yearAvgVisitors", label: "평균 접속자 수" },
  { key: "yearAvgVisits", label: "평균 접속 횟수" },
];

const msgDayMetrics = [
  { key: "dayLifeMsg", label: "생명메시지" },
  { key: "dayHopeMsg", label: "희망메시지" },
  { key: "dayLifeMsgSend", label: "생명메시지 발송 수" },
  { key: "dayOvercome", label: "극복수기" },
  { key: "dayLifeSave", label: "생명살림" },
];

const msgMonthMetrics = [
  { key: "monthLifeMsg",     label: "생명메시지" },
  { key: "monthHopeMsg",     label: "희망메시지" },
  { key: "monthLifeMsgSend", label: "생명메시지 발송 수" },
  { key: "monthOvercome",        label: "극복수기" },
  { key: "monthLifeSave",    label: "생명살림" },
];

const msgYearMetrics = [
  { key: "yearLifeMsg",     label: "생명메시지" },
  { key: "yearHopeMsg",     label: "희망메시지" },
  { key: "yearLifeMsgRecv", label: "생명메시지 발송 수" },
  { key: "yearOvercome",        label: "극복수기" },
  { key: "yearLifeSave",    label: "생명살림" },
];

const SystemOverviewPage = () => {
  const [stats, setStats] = useState({
    currentMembers: 12345,
    todayNewMembers: 21,
    todayOutMembers: 17,
    todayVisitors: 30,
    todayVisits: 50,
  });

  const runSearch = (scope, { from, to }) => {
    console.log("search", scope, from?.toString(), to?.toString());
    // TODO: API 호출 후 setStats
  };

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Stack direction="row" spacing={6} ml="330px" sx={{ gap:"65px" }}>
        <ContentSearchbar />
      </Stack>

      <Paper sx={{ p:2, mt:2, mx:"70px" }}>
        <Typography variant="subtitle1" sx={{ mb:1 }}>시스템 현황 (System Overview)</Typography>
        <Divider sx={{ mb:2 }} />

        {/* ─ 회원 통계 3줄 ─ */}
        <StatusSection scope="day"   badgeText="금일(日報)" metrics={dayMetrics}   values={stats} onSearch={runSearch}/>
        <Divider sx={{ my:2 }} />
        <StatusSection scope="month" badgeText="금월(月報)" metrics={monthMetrics} values={stats} onSearch={runSearch}/>
        <Divider sx={{ my:2 }} />
        <StatusSection scope="year"  badgeText="금년(年報)" metrics={yearMetrics}  values={stats} onSearch={runSearch}/>


        {/* ─ 메시지 통계 3줄 ─ */}
        <Divider sx={{ my: 4 }} />
        <StatusSection scope="day"   badgeText="금일(日報)" metrics={msgDayMetrics}   values={stats} onSearch={runSearch}/>
        <Divider sx={{ my:2 }} />
        <StatusSection scope="month" badgeText="금월(月報)" metrics={msgMonthMetrics} values={stats} onSearch={runSearch}/>
        <Divider sx={{ my:2 }} />
        <StatusSection scope="year"  badgeText="금년(年報)" metrics={msgYearMetrics}  values={stats} onSearch={runSearch}/>
      </Paper>
    </Box>
  );
};

export default SystemOverviewPage;
