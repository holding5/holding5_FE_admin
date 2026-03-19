import React, { useMemo, useState, useEffect } from "react";
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
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  ArrowUpward,
  ArrowDownward,
  UnfoldMore,
  Search as SearchIcon,
  Clear,
} from "@mui/icons-material";
import HopeMessageDetail from "./HopeMessageDetail";
import useHopeMessages from "../hooks/useHopeMessages";

const columns = [
  { key: "id", label: "번호", width: "50px" },
  {
    key: "status",
    label: "상태",
    width: "70px",
    filterable: true,
    options: ["전체", "대기", "승인", "거절"],
  },
  { key: "title", label: "제목", width: "120px" },
  { key: "content", label: "내용", width: "260px" },
  { key: "file", label: "파일명", width: "120px" },
  { key: "createdAt", label: "등록일시", width: "140px" },
  { key: "nickName", label: "작성자 닉네임", width: "80px" },
  {
    key: "log",
    label: "비고",
    width: "110px",
    filterable: true,
    options: ["전체", "희망", "희망>생명", "삭제"],
  },
];

const sortableKeys = [];

// ✅ 한글 → 백엔드 Status enum
const STATUS_TO_ENUM = {
  전체: "전체",
  대기: "DIP",
  보류: "SUSPENDED",
  승인: "ACTIVATED",
  거절: "DISMISSED",
};

// ✅ 비고(log) UI 라벨 → 백엔드 typeFilter
const LOG_TO_TYPE_FILTER = {
  전체: null,
  희망: "HOPE",
  "희망>생명": "CONVERTED",
  삭제: "DELETED",
};

// ✅ 상태별 텍스트 색상
const STATUS_COLOR = {
  승인: "#27ae60",
  거절: "#e74c3c",
  대기: "#999",
  삭제: "#000",
  생명변환: "#1976d2",
  보류: "#f39c12",
};

const HopeMessageTable = ({ itemsPerPage = 25 }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const [detailAnchor, setDetailAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // ✅ filterable 초기값
  const initialFilters = useMemo(() => {
    return columns
      .filter((col) => col.filterable)
      .reduce((acc, col) => ({ ...acc, [col.key]: "전체" }), {});
  }, []);

  const [filters, setFilters] = useState(initialFilters);

  // ✅ 검색 input (UI용)
  const [keywordInput, setKeywordInput] = useState("");

  // ✅ 목록 훅
  const {
    rows,
    totalPages,
    totalElements,
    page,
    setPage,
    size,
    setSize,
    params,
    setParams,
    loading,
    error,
    refetch,
    setStatus,
    setQuery,
    setSortByTableKey,
  } = useHopeMessages({
    initialSort: { key: "createdAt", dir: "desc" },
    initialPage: 1,
    initialSize: itemsPerPage,
  });

  // ✅ params.keyword -> input 동기화
  useEffect(() => {
    if (params?.keyword !== undefined) setKeywordInput(params?.keyword ?? "");
  }, [params?.keyword]);

  // ✅ 필터 변경
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    // 상태 → 서버 statusFilter
    if (key === "status") {
      setStatus(value); // 훅 내부에서 한글→enum 변환
      setPage(1);
      return;
    }

    // 비고(log) → 서버 typeFilter
    if (key === "log") {
      const mapped = LOG_TO_TYPE_FILTER[value];
      setParams((prev) => {
        const next = { ...prev };
        if (mapped) next.typeFilter = mapped;
        else delete next.typeFilter;
        return next;
      });
      setPage(1);
      return;
    }
  };

  // 🔎 검색 실행 → 서버 keyword로 전송
  const runKeywordSearch = () => {
    const kw = keywordInput.trim();
    setQuery(kw);
    setPage(1);
  };

  const clearQuery = () => {
    setKeywordInput("");
    setQuery("");
    setPage(1);
  };

  // 📄 페이지당 개수
  const onChangePageSize = (v) => {
    if (setSize) setSize(v);
    setPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
    setSortByTableKey(key, direction);
    setPage(1);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <UnfoldMore fontSize="small" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

  const handleCellClick = (e, row) => {
    setSelectedRow(row);
    setDetailAnchor(e.currentTarget);
  };

  const handleCloseDetail = () => {
    setDetailAnchor(null);
    setSelectedRow(null);
  };

  // ✅ 상세 팝오버에서 액션(승인/거절/삭제) 후 목록 새로고침
  const handleActionDone = () => {
    refetch?.();
  };

  return (
    <Paper>
      <Box sx={{ px: 2, pt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 좌측: 셀렉트 2개 */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexShrink: 0 }}
          >
            {/* 상태 */}
            <Select
              size="small"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              sx={{ minWidth: 120, fontSize: "0.8rem" }}
            >
              {columns
                .find((c) => c.key === "status")
                ?.options?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
            </Select>

            {/* 비고(log) → 서버 typeFilter */}
            <Select
              size="small"
              value={filters.log}
              onChange={(e) => handleFilterChange("log", e.target.value)}
              sx={{ minWidth: 140, fontSize: "0.8rem" }}
            >
              {columns
                .find((c) => c.key === "log")
                ?.options?.map((opt) => (
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
              placeholder="희망메시지 검색 (제목/내용)"
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

          {/* 우측: 총개수 + 페이지당 */}
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
              value={size ?? itemsPerPage}
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
                <TableRow key={row.id} hover>
                  {columns.map((col) => {
                    // ✅ 상태 컬럼 색상 적용
                    let cellColor = "inherit";
                    if (col.key === "status") {
                      cellColor = STATUS_COLOR[row[col.key]] ?? "inherit";
                    }

                    return (
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
                          color: cellColor,
                          fontWeight: col.key === "status" ? 700 : "normal",
                        }}
                        onClick={(e) => handleCellClick(e, row)}
                        title={String(row[col.key] ?? "")}
                      >
                        {row[col.key]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        showFirstButton
        showLastButton
        count={Math.max(1, totalPages)}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
      />

      <HopeMessageDetail
        anchorEl={detailAnchor}
        onClose={handleCloseDetail}
        row={selectedRow}
        onActionDone={handleActionDone}
      />
    </Paper>
  );
};

export default HopeMessageTable;
