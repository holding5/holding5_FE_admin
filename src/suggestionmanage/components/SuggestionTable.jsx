import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Stack, Select, MenuItem, CircularProgress, Typography, Chip, Box,
  TextField, Button, InputAdornment, IconButton,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  ArrowUpward, ArrowDownward, UnfoldMore, Search as SearchIcon, Clear,
} from "@mui/icons-material";
import SuggestionDetail from "./SuggestionDetail";
import useSuggestions from "../hooks/useSuggestions";

const columns = [
  { key: "id", label: "번호", width: "50px" },
  { key: "typeLabel", label: "유형", width: "90px" },
  { key: "title", label: "제목", width: "200px" },
  { key: "authorName", label: "작성자", width: "110px" },
  { key: "contact", label: "연락처", width: "130px" },
  { key: "handledLabel", label: "처리여부", width: "90px" },
  { key: "createdAt", label: "등록일시", width: "140px" },
];

const TYPE_OPTIONS = [
  { label: "유형 전체", value: "" },
  { label: "앱 문의", value: "APP_INQUIRY" },
  { label: "기관 신청", value: "INSTITUTION_REQUEST" },
];
const HANDLED_OPTIONS = [
  { label: "처리 전체", value: "" },
  { label: "대기", value: "false" },
  { label: "처리완료", value: "true" },
];

const SuggestionTable = ({ itemsPerPage = 25 }) => {
  const [typeFilter, setTypeFilter] = useState("");
  const [handledFilter, setHandledFilter] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [detailAnchor, setDetailAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const {
    rows, totalPages, page, setPage, loading, error, refetch,
    setType, setHandled, setQuery, setSortByTableKey,
  } = useSuggestions({ initialSize: itemsPerPage });

  const runSearch = () => setQuery(keywordInput);
  const clearSearch = () => { setKeywordInput(""); setQuery(""); };

  const handleType = (v) => {
    setTypeFilter(v);
    setType(v || null);
  };
  const handleHandled = (v) => {
    setHandledFilter(v);
    setHandled(v === "" ? null : v === "true");
  };
  const handleSort = () => {
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key: "createdAt", direction });
    setSortByTableKey("createdAt", direction);
    setPage(1);
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
        <Select size="small" displayEmpty value={typeFilter} onChange={(e) => handleType(e.target.value)} sx={{ minWidth: 130, fontSize: "0.8rem", flexShrink: 0 }}>
          {TYPE_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
        </Select>
        <Select size="small" displayEmpty value={handledFilter} onChange={(e) => handleHandled(e.target.value)} sx={{ minWidth: 120, fontSize: "0.8rem", flexShrink: 0 }}>
          {HANDLED_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
        </Select>
        <TextField
          size="small"
          placeholder="건의 검색 (제목/내용)"
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
                    cursor: col.key === "createdAt" ? "pointer" : "default",
                  }}
                  onClick={() => col.key === "createdAt" && handleSort()}
                >
                  {col.label}{" "}
                  {col.key === "createdAt" &&
                    (sortConfig.direction === "asc" ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}><CircularProgress size={22} /></TableCell></TableRow>
            )}
            {!loading && error && (
              <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                <Typography sx={{ fontSize: 12, color: "error.main" }}>목록 조회에 실패했습니다.</Typography>
              </TableCell></TableRow>
            )}
            {!loading && !error && rows.length === 0 && (
              <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>데이터가 없습니다.</Typography>
              </TableCell></TableRow>
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
                    {col.key === "handledLabel" ? (
                      <Chip size="small" label={row.handledLabel}
                        color={row.handled ? "success" : "default"} variant={row.handled ? "filled" : "outlined"} />
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
        showFirstButton showLastButton
        count={totalPages || 1}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined" shape="rounded"
      />

      <SuggestionDetail
        anchorEl={detailAnchor}
        onClose={handleCloseDetail}
        row={selectedRow}
        onChanged={() => refetch?.()}
      />
    </Paper>
  );
};

export default SuggestionTable;
