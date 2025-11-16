import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Skeleton,
  Stack,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const fmt = (v) => (typeof v === "number" ? v.toLocaleString() : v ?? "-");

const StatItem = ({ label, value, loading }) => (
  <Box
    sx={{
      border: "1px solid #e0e0e0",
      borderRadius: 1.5,
      p: 1.25,
      textAlign: "center",
    }}
  >
    <Typography sx={{ fontWeight: 700, fontSize: 12, mb: 0.25 }}>
      {label}
    </Typography>
    {loading ? (
      <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
    ) : (
      <Typography sx={{ fontSize: 14 }}>{fmt(value)}</Typography>
    )}
  </Box>
);

export default function MemberSchoolStatistics({
  // 회원 학교 통계
  registeredTotal = 0,
  registeredElem = 0,
  registeredMid = 0,
  registeredHigh = 0,

  // 선택: 로딩/새로고침
  loading = false,
  onRefresh, // 선택: 클릭 시 refetch 실행
}) {
  const labels = ["학교총수", "초등학교", "중학교", "고등학교"];
  const registVals = [
    registeredTotal,
    registeredElem,
    registeredMid,
    registeredHigh,
  ];

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {/* 상단 헤더 + 새로고침 */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography sx={{ fontWeight: 800 }}>회원 학교 통계</Typography>
        {onRefresh && (
          <Tooltip title="새로고침">
            <IconButton size="small" onClick={onRefresh} aria-label="refresh">
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {/* === Row 2: 홀파 회원학교 === */}
      <Grid container spacing={1.25} alignItems="center">
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontWeight: "bold" }}>현 홀파 회원학교</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={1.25}>
            {registVals.map((value, idx) => (
              <Grid key={`member-${idx}`} item xs={6} sm={4} md={3}>
                <StatItem label={labels[idx]} value={value} loading={loading} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
