import { useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Stack, Button, CircularProgress, Chip,
  Select, MenuItem, TextField, InputAdornment, IconButton,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Search as SearchIcon, Clear } from "@mui/icons-material";
import { useNoticeList, AUDIENCE_LABEL } from "../hooks/useNotices";
import NoticeFormDialog from "../components/NoticeFormDialog";

const columns = [
  { key: "id", label: "번호", width: "50px" },
  { key: "title", label: "제목", width: "180px" },
  { key: "content", label: "내용", width: "260px" },
  { key: "audienceLabel", label: "대상", width: "70px" },
  { key: "fileLabel", label: "파일명", width: "120px" },
  { key: "authorName", label: "작성자", width: "110px" },
  { key: "createdAt", label: "등록일시", width: "140px" },
];

/** 공지사항 관리 페이지 — 목록/작성/수정/삭제. */
const NoticePage = () => {
  const {
    rows, totalPages, page, setPage, loading, error, refetch, setQuery, setAudience,
  } = useNoticeList();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("");

  const openCreate = () => { setEditId(null); setDialogOpen(true); };
  const openEdit = (id) => { setEditId(id); setDialogOpen(true); };

  const runSearch = () => setQuery(keywordInput);
  const clearSearch = () => { setKeywordInput(""); setQuery(""); };
  const handleAudience = (v) => { setAudienceFilter(v); setAudience(v || null); };

  return (
    <Box component="section" sx={{ flexGrow: 1, p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>공지사항 관리</Typography>
        <Button variant="contained" onClick={openCreate}>+ 공지 작성</Button>
      </Stack>

      <Paper>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1.5 }}>
          <Select
            size="small"
            displayEmpty
            value={audienceFilter}
            onChange={(e) => handleAudience(e.target.value)}
            sx={{ minWidth: 120, flexShrink: 0 }}
          >
            <MenuItem value="">대상 전체</MenuItem>
            {Object.entries(AUDIENCE_LABEL).map(([v, l]) => (
              <MenuItem key={v} value={v}>{l}</MenuItem>
            ))}
          </Select>
          <TextField
            size="small"
            placeholder="공지 검색 (제목/내용)"
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
                  <TableCell key={col.key} align="center"
                    sx={{ color: "#fff", width: col.width, border: "1px solid #ccc", fontSize: "12px", whiteSpace: "nowrap" }}>
                    {col.label}
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
                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>등록된 공지가 없습니다.</Typography>
                </TableCell></TableRow>
              )}
              {!loading && !error && rows.map((row) => (
                <TableRow key={row.id} hover sx={{ cursor: "pointer" }} onClick={() => openEdit(row.id)}>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.id}</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.title}</TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", fontSize: "12px", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.content}</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>
                    <Chip size="small" label={row.audienceLabel} variant="outlined" />
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.fileLabel}</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.authorName}</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.createdAt}</TableCell>
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
      </Paper>

      <NoticeFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editId={editId}
        onSaved={() => refetch?.()}
      />
    </Box>
  );
};

export default NoticePage;
