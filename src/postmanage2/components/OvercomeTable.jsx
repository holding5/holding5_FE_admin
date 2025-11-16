// src/pages/components/OvercomeTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Select,
  MenuItem,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useOvercomePosts from "../hooks/useOvercomePosts";
import { labelMapper } from "../../utils/LabelMapper";

const GROUP_FILTER_OPTIONS = [
  { value: "", label: "분류 전체" },
  ...["HOLDING_WITH_STORY", "HOLDING_NO_STORY", "GENERAL"].map((key) => ({
    value: key,
    label: labelMapper("overcomeGroupMap", key),
  })),
];

const columns = [
  { key: "id", label: "번호", width: "4rem" },
  { key: "group", label: "분류", width: "8rem" },
  { key: "content", label: "내용", width: "30rem" },
  { key: "nickname", label: "작성자", width: "8rem" },
  { key: "createdAt", label: "작성일", width: "8rem" },
  { key: "likeCount", label: "추천", width: "3rem" },
  { key: "reportCount", label: "신고", width: "3rem" },
  { key: "commentCount", label: "댓글", width: "3rem" },
];

const sortableKeys = ["createdAt", "likeCount", "reportCount", "commentCount"];

export default function OvercomeTable() {
  const {
    rows,
    totalElements,
    totalPages,
    page,
    setPage,
    sort,
    setSort,
    params,
    setParams,
    size,
    setSize,
    loading,
    error,
  } = useOvercomePosts({ initialSize: 25 });

  const nav = useNavigate();

  const handleSort = (key) => {
    if (!sortableKeys.includes(key)) return;
    let dir = "asc";
    if (sort?.key === key && sort?.dir === "asc") dir = "desc";
    setSort({ key, dir });
    setPage(1);
  };

  const renderSortIcon = (key) => {
    if (!sortableKeys.includes(key)) return null;
    if (sort?.key !== key) return <UnfoldMore fontSize="small" />;
    return sort?.dir === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

  const onChangePageSize = (v) => {
    setSize(v);
    setPage(1);
  };

  // 🔹 현재 group 필터 값 (없으면 "")
  const groupFilterValue = params?.group ?? "";

  // 🔹 group 변경 시 쿼리 파라미터 업데이트
  const handleGroupChange = (e) => {
    const value = e.target.value;

    setParams((prev) => {
      const next = { ...prev };
      if (!value) {
        // 전체 선택 시 group 파라미터 제거 → 필터링 X
        delete next.group;
      } else {
        next.group = value;
      }
      return next;
    });

    setPage(1); // 필터 바꾸면 1페이지로 이동
  };

  return (
    <Paper>
      {/* 상단 툴바 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1,
        }}
      >
        {/* 🔹 왼쪽: group 필터 */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Select
            size="small"
            value={groupFilterValue}
            onChange={handleGroupChange}
            displayEmpty
            sx={{ minWidth: 160, fontSize: "0.8rem" }}
          >
            {GROUP_FILTER_OPTIONS.map((opt) => (
              <MenuItem key={opt.value || "ALL"} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        {/* 오른쪽: 총 개수 + 페이지 사이즈 */}
        <Stack direction="row" spacing={2} alignItems="center">
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
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      {error && (
        <Box sx={{ color: "error.main", px: 2, pb: 2 }}>
          목록을 불러오는 중 오류가 발생했습니다.
        </Box>
      )}

      {!loading && (
        <TableContainer>
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
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label} {renderSortIcon(col.key)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => nav(`detail/${row.id}`)}
                >
                  {columns.map((col) => {
                    let value = row[col.key];

                    if (
                      col.key === "createdAt" &&
                      typeof row.createdAt === "string"
                    ) {
                      value = row.createdAt.slice(0, 10);
                    }
                    if (col.key === "group") {
                      const list = row.group ?? [];
                      value =
                        list.length === 0
                          ? "-"
                          : list.map((t) => labelMapper("overcomeGroupMap", t));
                    }

                    return (
                      <TableCell
                        key={col.key}
                        align="center"
                        sx={{ border: "1px solid #ccc", fontSize: "12px" }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    표시할 데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        showFirstButton
        showLastButton
        count={Math.max(totalPages, 1)}
        page={page}
        onChange={(_, v) => setPage(v)}
        variant="outlined"
        shape="rounded"
      />
    </Paper>
  );
}
