import React, { useState, useEffect } from "react";
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
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Search as SearchIcon, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useBannedUsers from "../hooks/useBannedUser";
import releaseBannedUsers from "../../api/releaseBannedUsers";
import { labelMapper } from "../../utils/LabelMapper";

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");

  return `${y}년 ${m}월 ${d}일 ${hh}:${mm}`;
};

const columns = [
  { key: "id", label: "번호", width: "40px" },
  { key: "nickname", label: "닉네임", width: "100px" },
  {
    key: "status",
    label: "상태",
    width: "80px",
    valueFormatter: (v) => labelMapper("statusMap", v),
  },
  {
    key: "bannedAt",
    label: "영구정지 시점",
    width: "180px",
    valueFormatter: formatDateTime,
  },
  { key: "totalReportCount", label: "총 신고 수", width: "50px" },
  { key: "spammingCount", label: "언어폭력", width: "50px" },
  { key: "inappropriateLanguageCount", label: "도배", width: "50px" },
  { key: "verbalAbuseCount", label: "부적절한 언어", width: "50px" },
  { key: "sexualHarassmentCount", label: "음담패설, 성희롱", width: "50px" },
];

const BannedUserTable = ({ itemsPerPage = 25 }) => {
  const nav = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  const {
    rows: bannedUsers = [],
    totalPages = 0,
    totalElements = 0,
    loading,
    refetch,
    page,
    setPage,
    size,
    setSize,
    params,
    setParams,
  } = useBannedUsers({
    initialPage: 1,
    initialSize: itemsPerPage,
    initialSort: { key: "userId", direction: "asc" },
    initialParams: {}, // keyword는 훅에서 기본값 셋팅
  });

  // 🔁 params.keyword 변경되면 인풋 값 동기화
  useEffect(() => {
    setKeywordInput(params?.keyword ?? "");
  }, [params?.keyword]);

  // 🔍 검색 실행
  const runKeywordSearch = () => {
    const kw = keywordInput.trim();
    setParams((prev) => {
      const next = { ...prev };
      if (kw) next.keyword = kw;
      else delete next.keyword;
      return next;
    });
    setPage(1);
  };

  // 🔄 검색어 지우기
  const clearKeyword = () => {
    setKeywordInput("");
    setParams((prev) => {
      const next = { ...prev };
      delete next.keyword;
      return next;
    });
    setPage(1);
  };

  const handleRelease = async () => {
    try {
      await releaseBannedUsers(selectedIds);
      alert("영구정지 해제 완료");
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("해제 실패", error);
      alert("해제에 실패했습니다.");
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === bannedUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(bannedUsers.map((row) => row.id));
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
      {/* === 상단 영역: 버튼 + 검색바 + 총건수 + 페이지당 개수 === */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 왼쪽: 영구정지 해제 버튼 + 검색바 */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <button
              onClick={handleRelease}
              disabled={selectedIds.length === 0}
              style={{
                backgroundColor: "#FF9800",
                color: "#fff",
                padding: "6px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                whiteSpace: "nowrap", // 🔥 줄바꿈 방지
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              영구정지 해제
            </button>

            {/* 검색바 (닉네임/이름) */}
            <TextField
              size="small"
              placeholder="닉네임 또는 이름 검색"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runKeywordSearch();
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: keywordInput && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear"
                      onClick={clearKeyword}
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
                    bannedUsers.length > 0 &&
                    selectedIds.length === bannedUsers.length
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
            ) : bannedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              bannedUsers.map((row) => (
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

export default BannedUserTable;
