import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Checkbox,
  Pagination,
  Select,
  MenuItem,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import usePausedUsers from "../hooks/usePausedUsers";
import { releasePausedUsers } from "../hooks/usePausedUsers";
import { banPausedUsers } from "../hooks/usePausedUsers";

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value; // 이상한 값이면 그대로 표시

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");

  // 날짜 + 시간: 2025년 11월 06일 14:59
  return `${y}년 ${m}월 ${d}일 ${hh}:${mm}`;
};

const columns = [
  { key: "userId", label: "번호", width: "3em" },
  { key: "nickname", label: "닉네임", width: "6em" },
  {
    key: "suspensionStartAt",
    label: "일시정지 시점",
    width: "12em",
    valueFormatter: formatDateTime,
  },
  { key: "elapsedDays", label: "경과일", width: "3em" },
  {
    key: "suspensionEndAt",
    label: "자동해제 시점",
    width: "12em",
    valueFormatter: formatDateTime,
  },
  { key: "remainingDays", label: "잔여일", width: "3em" },
  { key: "totalReportCount", label: "총 신고 수", width: "4em" },
  { key: "spammingCount", label: "언어폭력", width: "2em" },
  { key: "inappropriateLanguageCount", label: "도배", width: "2em" },
  { key: "verbalAbuseCount", label: "부적절한 언어", width: "4em" },
  { key: "sexualHarassmentCount", label: "음담패설, 성희롱", width: "4em" },
];

const PausedUserTable = ({ itemsPerPage = 25 }) => {
  const nav = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchText, setSearchText] = useState("");

  const {
    rows: pausedUsers = [],
    totalPages = 0,
    totalElements = 0,
    loading,
    refetch,
    page,
    setPage,
    size,
    setSize,
    runSearch,
    clearSearch,
  } = usePausedUsers({
    initialPage: 1,
    initialSort: { key: "suspensionStartAt", direction: "desc" },
    initialSize: itemsPerPage,
    initialParams: { q: "" },
  });

  const onSearchClick = () => {
    const k = (searchText ?? "").trim();
    if (!k) {
      onClearClick();
      return;
    }
    runSearch(k);
  };

  const onClearClick = () => {
    setSearchText("");
    clearSearch();
  };

  const handleRelease = async () => {
    try {
      await releasePausedUsers(selectedIds);
      alert("정지해지 완료");
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("정지해지 실패", error);
      alert("해지에 실패했습니다.");
    }
  };

  const handleBan = async () => {
    try {
      await banPausedUsers(selectedIds);
      alert("영구정지 완료");
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("영구정지 실패", error);
      alert("영구정지에 실패했습니다.");
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === pausedUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pausedUsers.map((row) => row.id));
    }
  };

  const isSelected = (id) => selectedIds.includes(id);

  const onChangePageSize = (v) => {
    setSize(v);
    setPage(1);
    setSelectedIds([]);
  };

  return (
    <Paper>
      {/* === 상단 영역 (DreamUserTable 스타일) === */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 왼쪽: 버튼 + 검색바 (flexGrow) */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            {/* 정지해지 / 영구제명 버튼 */}
            <button
              onClick={handleRelease}
              disabled={selectedIds.length === 0}
              style={{
                backgroundColor: "#FF9800",
                color: "#fff",
                padding: "6px 18px",
                border: "none",
                borderRadius: "4px",
                cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                whiteSpace: "nowrap", // 🔥 줄바꿈 방지
                display: "inline-flex", // 🔥 inline + flex
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              정지해지
            </button>

            <button
              onClick={handleBan}
              disabled={selectedIds.length === 0}
              style={{
                backgroundColor: "#ff3c00ff",
                color: "#fff",
                padding: "6px 18px",
                border: "none",
                borderRadius: "4px",
                cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                whiteSpace: "nowrap", // 🔥 줄바꿈 방지
                display: "inline-flex", // 🔥 inline + flex
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              영구제명
            </button>

            {/* 검색바 (남는 공간 전부 차지) */}
            <TextField
              size="small"
              placeholder="닉네임 또는 이름 검색"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearchClick();
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchText && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear"
                      onClick={onClearClick}
                      edge="end"
                      size="small"
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{ flexGrow: 1 }}
            />
          </Stack>

          {/* 오른쪽: 총 건수 + 페이지당 개수 */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ flexShrink: 0 }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
            >
              총 {totalElements?.toLocaleString?.() ?? 0}건
            </Typography>

            <Select
              size="small"
              value={size}
              onChange={(e) => onChangePageSize(Number(e.target.value))}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </Box>

      {/* === 테이블 === */}
      <TableContainer sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="default"
                  onChange={handleSelectAll}
                  checked={
                    pausedUsers.length > 0 &&
                    selectedIds.length === pausedUsers.length
                  }
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align="center"
                  sx={{
                    color: "#fff",
                    width: col.width,
                    border: "1px solid #ccc",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  불러오는 중...
                </TableCell>
              </TableRow>
            ) : pausedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              pausedUsers.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="default"
                      checked={isSelected(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{
                        border: "1px solid #ccc",
                        fontSize: "12px",
                        cursor: col.key === "nickname" ? "pointer" : "default",
                        whiteSpace: "nowrap",
                      }}
                      onClick={
                        col.key === "nickname"
                          ? () => nav(`/admin/user/dream/detail/${row.id}`)
                          : undefined
                      }
                    >
                      {col.valueFormatter
                        ? col.valueFormatter(row[col.key])
                        : row[col.key] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* === 페이지네이션 === */}
      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        showFirstButton
        showLastButton
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
      />
    </Paper>
  );
};

export default PausedUserTable;
