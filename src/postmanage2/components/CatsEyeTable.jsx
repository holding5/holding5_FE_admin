// CatsEyeTable.jsx
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
import useCatsEyePosts from "../hooks/useCatsEyePosts";
import { labelMapper } from "../../utils/LabelMapper";

// ✅ 시/도 단위 옵션 (원하는 대로 추가/수정 가능)
const REGION_OPTIONS = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const columns = [
  { key: "id", label: "번호", width: "4rem" },
  { key: "address", label: "지역", width: "10rem" },
  { key: "content", label: "내용", width: "28rem" },
  { key: "nickname", label: "작성자", width: "10rem" },
  { key: "createdAt", label: "작성일", width: "9rem" },
  { key: "likeCount", label: "추천", width: "3rem" },
  { key: "reportCount", label: "신고", width: "3rem" },
  { key: "commentCount", label: "댓글", width: "3rem" },
  { key: "shareTypes", label: "신고처", width: "10rem" },
];

const sortableKeys = ["createdAt", "likeCount", "reportCount", "commentCount"];

export default function CatsEyeTable() {
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
  } = useCatsEyePosts({ initialSize: 25 });

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

  // ✅ region 변경 시 params.region 갱신
  const handleRegionChange = (e) => {
    const value = e.target.value;
    setPage(1);

    setParams((prev) => {
      const next = { ...prev };
      if (!value) {
        // 전체 선택 시 region 파라미터 제거
        delete next.region;
      } else {
        next.region = value;
      }
      return next;
    });
  };

  const currentRegion = params.region ?? "";

  return (
    <Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // 왼쪽: 지역필터, 오른쪽: 개수/페이지크기
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        {/* ✅ 왼쪽: 지역 필터 */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Select
            size="small"
            value={currentRegion}
            onChange={handleRegionChange}
            displayEmpty
            sx={{ minWidth: 120, fontSize: "0.8rem" }}
          >
            <MenuItem value="">지역 전체</MenuItem>
            {REGION_OPTIONS.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        {/* ✅ 오른쪽: 총 건수 & 페이지 크기 */}
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

                    if (col.key === "shareTypes") {
                      const list = row.shareTypes ?? [];
                      value =
                        list.length === 0
                          ? "-"
                          : list
                              .map((t) => labelMapper("catsEyeShareTypeMap", t))
                              .join(", ");
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
