import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TextField,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
  Divider,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Clear, Search } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const columns = [
  { key: "__manage__", label: "관리", width: "3.5rem" },
  { key: "id", label: "번호", width: "4.5rem" },
  { key: "name", label: "이름", width: "8rem" },
  { key: "phoneNumber", label: "전화", width: "10rem" },
  { key: "email", label: "ID(이메일)", width: "14rem" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];

// ✅ 목데이터 5개
const MOCK_ADMINS = [
  {
    id: 101,
    name: "김관리",
    email: "admin.kim@example.com",
    phoneNumber: "010-1234-5678",
  },
  {
    id: 102,
    name: "이다스",
    email: "idas@example.com",
    phoneNumber: "010-9876-5432",
  },
  {
    id: 103,
    name: "박오퍼",
    email: "operator.park@example.com",
    phoneNumber: "010-2222-3333",
  },
  {
    id: 104,
    name: "최매니",
    email: "manager.choi@example.com",
    phoneNumber: "010-4444-5555",
  },
  {
    id: 105,
    name: "정어드",
    email: "admin.jeong@example.com",
    phoneNumber: "010-7777-8888",
  },
];

export default function AdminTable({ onPick }) {
  const [loading] = useState(false); // 목이므로 고정
  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);

  // 키워드 필터 (이름/이메일/전화)
  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return MOCK_ADMINS;
    return MOCK_ADMINS.filter((r) => {
      const hay = `${r.name} ${r.email} ${r.phoneNumber}`.toLowerCase();
      return hay.includes(k);
    });
  }, [keyword]);

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const paged = useMemo(() => {
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  }, [filtered, page, size]);

  const clearKeyword = () => setKeyword("");
  const resetAll = () => {
    setKeyword("");
    setSize(10);
    setPage(1);
  };

  return (
    <Paper sx={{ overflow: "hidden" }}>
      {/* ====== 컨트롤 바 ====== */}
      <Box sx={{ p: 1.25 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.25}
          alignItems="center"
        >
          {/* 검색 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flex: 1,
              minWidth: 200,
            }}
          >
            <TextField
              size="small"
              fullWidth
              placeholder="이름 / 이메일 / 전화 검색"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: <Search fontSize="small" sx={{ mr: 0.5 }} />,
                endAdornment: !!keyword && (
                  <Tooltip title="검색어 지우기">
                    <IconButton
                      size="small"
                      onClick={clearKeyword}
                      aria-label="clear keyword"
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Box>

          {/* 페이지당 개수 */}
          <Select
            size="small"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(1);
            }}
            sx={{ minWidth: 90, fontSize: "0.8em" }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <MenuItem key={n} value={n}>
                {n}개
              </MenuItem>
            ))}
          </Select>

          {/* 초기화 */}
          <Tooltip title="필터 초기화">
            <IconButton onClick={resetAll} size="small" aria-label="reset">
              <Clear fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Divider />

      {/* ====== 테이블 ====== */}
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table size="small" stickyHeader aria-label="관리자 목록 테이블">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align || "center"}
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                    borderRight: "1px solid rgba(255,255,255,0.12)",
                    whiteSpace: "nowrap",
                    width: col.width,
                    minWidth: col.width,
                    fontSize: 12,
                    userSelect: "none",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={0.75}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <span>{col.label}</span>
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <CircularProgress size={22} />
                </TableCell>
              </TableRow>
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 5 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    표시할 데이터가 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row) => (
                <TableRow key={row.id} hover>
                  {columns.map((col) => {
                    if (col.key === "__manage__") {
                      return (
                        <TableCell
                          key={col.key}
                          align="center"
                          sx={{
                            borderBottom: "1px solid #eee",
                            fontSize: 12,
                            width: col.width,
                            minWidth: col.width,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Tooltip title="이 행 정보로 위 폼 채우기">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => onPick?.(row)}
                            >
                              <ManageAccountsIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      );
                    }

                    let val = row?.[col.key] ?? "";

                    if (col.key === "phoneNumber" && val) {
                      val = (
                        <a
                          href={`tel:${String(row.phoneNumber).replace(
                            /[^0-9+]/g,
                            ""
                          )}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {row.phoneNumber}
                        </a>
                      );
                    }

                    return (
                      <TableCell
                        key={col.key}
                        align={col.align || "center"}
                        sx={{
                          borderBottom: "1px solid #eee",
                          fontSize: 12,
                          width: col.width,
                          minWidth: col.width,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {val}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ====== 페이지네이션 ====== */}
      <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}>
        <Pagination
          showFirstButton
          showLastButton
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </Box>
    </Paper>
  );
}
