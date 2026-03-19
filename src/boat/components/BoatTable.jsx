// src/boat/components/BoatTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Stack,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  ArrowUpward,
  ArrowDownward,
  UnfoldMore,
  Search as SearchIcon,
  Clear,
} from "@mui/icons-material";
import useBoats from "../hooks/useBoats";
import BoatDetail from "./BoatDetail";

// ====== 컬럼 정의 ======
const columns = [
  { key: "id", label: "번호", width: "50px" },
  { key: "status", label: "상태", width: "70px" },
  { key: "boatType", label: "목표", width: "90px" },
  { key: "content", label: "내용", width: "260px" },
  { key: "location", label: "위치", width: "90px" },
  { key: "ownerNickName", label: "작성자", width: "90px" },
  { key: "targetSupportCount", label: "목표응원수", width: "90px" },
  { key: "currentSupportCount", label: "현재응원수", width: "90px" },
  { key: "sendCount", label: "전달", width: "90px" },
  { key: "createdAt", label: "등록일시", width: "160px" },
];

// 서버 정렬 지원 키
const sortableKeys = ["createdAt", "sendCount", "currentSupportCount"];

// 필터 옵션
const STATUS_OPTIONS = ["전체", "진행중", "완료", "조기중단", "삭제", "비활성"];
const TYPE_OPTIONS = ["전체", "응원수", "거리", "혼합"];

const STATUS_COLOR = {
  진행중: "#1976d2", // 파란색
  완료: "#27ae60", // 초록색
  조기중단: "#e74c3c", // 빨간색
  삭제: "#757575", // 회색
  비활성: "#e67e22", // 주황색
};

const safeStr = (v) => (v === null || v === undefined ? "" : String(v));

export default function BoatTable({ itemsPerPage = 25 }) {
  // ✅ API 연결된 훅 사용
  const {
    rows,
    totalElements,
    totalPages,
    loading,
    error,
    page,
    setPage,
    size,
    setSize,
    sort,
    setStatus,
    setBoatType,
    setQuery,
    setSortByTableKey,
  } = useBoats({ initialSize: itemsPerPage });

  // UI 필터 상태 (표시용)
  const [statusFilter, setStatusFilter] = useState("전체");
  const [typeFilter, setTypeFilter] = useState("전체");

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // 검색 input
  const [keywordInput, setKeywordInput] = useState("");

  // ====== 핸들러 ======
  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setStatus(value);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    setBoatType(value);
  };

  const runKeywordSearch = () => {
    setQuery(keywordInput.trim());
  };

  const clearQuery = () => {
    setKeywordInput("");
    setQuery("");
  };

  const onChangePageSize = (v) => {
    setSize(v);
    setPage(1);
  };

  const handleSort = (key) => {
    const currentDir =
      sort?.key === key && sort?.dir === "asc" ? "desc" : "asc";
    setSortByTableKey(key, currentDir);
  };

  const renderSortIcon = (key) => {
    if (sort?.key !== key) return <UnfoldMore fontSize="small" />;
    return sort.dir === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

  const handleRowClick = (e, row) => {
    setAnchorEl(e.currentTarget);
    setSelectedRow(row);
  };

  return (
    <Paper>
      {/* 상단 필터 바 */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 좌측: 상태 + 타입 필터 */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexShrink: 0 }}
          >
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              sx={{ minWidth: 120, fontSize: "0.8rem" }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>

            <Select
              size="small"
              value={typeFilter}
              onChange={(e) => handleTypeChange(e.target.value)}
              sx={{ minWidth: 120, fontSize: "0.8rem" }}
            >
              {TYPE_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          {/* 가운데: 검색바 */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <TextField
              size="small"
              placeholder="돛단배 검색 (제목/내용)"
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
                endAdornment: keywordInput !== "" && (
                  <InputAdornment position="end">
                    <Clear
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                      onClick={clearQuery}
                    />
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={runKeywordSearch}
              sx={{ flexShrink: 0 }}
            >
              검색
            </Button>
          </Stack>

          {/* 우측: 총건수 + 페이지 사이즈 */}
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
              총 {totalElements.toLocaleString()}건
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

            {loading && <CircularProgress size={18} />}
          </Stack>
        </Stack>
      </Box>

      {/* 에러 표시 */}
      {error && (
        <Box sx={{ px: 2, pb: 1, fontSize: 12, color: "error.main" }}>
          목록 조회 실패: {error?.message ?? "unknown error"}
        </Box>
      )}

      {/* === 테이블 === */}
      <TableContainer sx={{ mt: 1 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
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
                    cursor: sortableKeys.includes(col.key)
                      ? "pointer"
                      : "default",
                  }}
                  onClick={() =>
                    sortableKeys.includes(col.key) && handleSort(col.key)
                  }
                >
                  {col.label}{" "}
                  {sortableKeys.includes(col.key) && renderSortIcon(col.key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 && !loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 4, fontSize: 12, color: "text.secondary" }}
                >
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={(e) => handleRowClick(e, row)}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{
                        border: "1px solid #ccc",
                        fontSize: "12px",
                        cursor: "pointer",
                        maxWidth: col.width,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color:
                          col.key === "status"
                            ? (STATUS_COLOR[safeStr(row[col.key])] ?? "inherit")
                            : "inherit",
                        fontWeight: col.key === "status" ? 600 : "normal",
                      }}
                      title={safeStr(row[col.key])}
                    >
                      {safeStr(row[col.key])}
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
        count={totalPages || 1}
        page={Math.min(page, totalPages || 1)}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
      />

      <BoatDetail
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setSelectedRow(null);
        }}
        row={selectedRow}
      />
    </Paper>
  );
}
