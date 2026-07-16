import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Typography, Stack, TextField, Button, InputAdornment, IconButton,
  Select, MenuItem, Chip,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  ArrowUpward, ArrowDownward, UnfoldMore, Search as SearchIcon, Clear,
} from "@mui/icons-material";
import CongratulatoryMessageDetail from "./CongratulatoryMessageDetail";
import useCelebrationMessages, { TAB_TO_TYPE, TYPE_TO_LABEL } from "../hooks/useCelebrationMessages";

const columns = [
  { key: "id", label: "번호", width: "50px" },
  { key: "classification", label: "분류", width: "80px" },
  { key: "religion", label: "종교", width: "80px" },
  { key: "title", label: "제목/내용", width: "150px" },
  { key: "file", label: "파일명", width: "100px" },
  { key: "statusLabel", label: "상태", width: "70px" },
  { key: "date", label: "등록일시", width: "120px" },
  { key: "nickName", label: "작성자 닉네임", width: "120px" },
];

// 서버 정렬 가능한 컬럼 → 서버 정렬 필드
const SORT_KEY_MAP = {
  date: "createdAt",
  classification: "type",
  nickName: "authorName",
};
const sortableKeys = ["classification", "date", "nickName"];

/**
 * 축하/시험격려 메시지 목록 테이블.
 * @param {string} filter - 상위 탭 값(all/accession/birth/test) → 백엔드 유형으로 변환
 */
const CongratulatoryMessageTable = ({ filter = "all", itemsPerPage = 10 }) => {
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [detailAnchor, setDetailAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [typeFilter, setTypeFilter] = useState(TAB_TO_TYPE[filter] ?? "");

  const {
    rows,
    totalPages,
    page,
    setPage,
    loading,
    error,
    refetch,
    setType,
    setQuery,
    setSortByTableKey,
  } = useCelebrationMessages({
    initialType: TAB_TO_TYPE[filter] ?? null,
    initialSize: itemsPerPage,
  });

  const runSearch = () => setQuery(keywordInput);
  const clearSearch = () => { setKeywordInput(""); setQuery(""); };

  // 상위 탭 변경 → 드롭다운·서버 유형 필터 동기화
  useEffect(() => {
    const t = TAB_TO_TYPE[filter] ?? "";
    setTypeFilter(t);
    setType(t || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleTypeChange = (v) => {
    setTypeFilter(v);
    setType(v || null);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
    setSortByTableKey(SORT_KEY_MAP[key] ?? key, direction);
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

  return (
    <Paper>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1.5 }}>
        <Select
          size="small"
          displayEmpty
          value={typeFilter}
          onChange={(e) => handleTypeChange(e.target.value)}
          sx={{ minWidth: 130, fontSize: "0.85rem", flexShrink: 0 }}
        >
          <MenuItem value="">유형 전체</MenuItem>
          {Object.entries(TYPE_TO_LABEL).map(([v, l]) => (
            <MenuItem key={v} value={v}>{l}</MenuItem>
          ))}
        </Select>
        <TextField
          size="small"
          placeholder="축하메시지 검색 (제목/내용)"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
            ),
            endAdornment: keywordInput ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch}><Clear fontSize="small" /></IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        <Button variant="contained" size="small" onClick={runSearch} sx={{ flexShrink: 0 }}>검색</Button>
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align="center"
                  sx={{
                    color: "#fff", width: col.width, border: "1px solid #ccc",
                    fontSize: "12px", whiteSpace: "nowrap",
                    cursor: sortableKeys.includes(col.key) ? "pointer" : "default",
                  }}
                  onClick={() => sortableKeys.includes(col.key) && handleSort(col.key)}
                >
                  {col.label} {sortableKeys.includes(col.key) && renderSortIcon(col.key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={22} />
                </TableCell>
              </TableRow>
            )}
            {!loading && error && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography sx={{ fontSize: 12, color: "error.main" }}>
                    목록 조회에 실패했습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                    데이터가 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && rows.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align="center"
                    sx={{ border: "1px solid #ccc", fontSize: "12px", cursor: "pointer" }}
                    onClick={(e) => handleCellClick(e, row)}
                  >
                    {col.key === "statusLabel" ? (
                      <Chip
                        size="small"
                        label={row.statusLabel}
                        color={row.status === "DEACTIVATED" ? "default" : "success"}
                        variant={row.status === "DEACTIVATED" ? "outlined" : "filled"}
                      />
                    ) : (
                      row[col.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        showFirstButton
        showLastButton
        count={totalPages || 1}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
      />

      <CongratulatoryMessageDetail
        anchorEl={detailAnchor}
        onClose={handleCloseDetail}
        row={selectedRow}
        onChanged={() => refetch?.()}
      />
    </Paper>
  );
};

export default CongratulatoryMessageTable;
