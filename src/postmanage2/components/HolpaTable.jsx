// src/pages/components/HolpaTable.jsx
import React from "react";
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
  CircularProgress,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import useHolpaPosts from "../hooks/useHolpaPosts";
import { labelMapper } from "../../utils/LabelMapper";
import { holpaPostCategory } from "../../constant/codeMaps";
import { useNavigate } from "react-router-dom";

const columns = [
  { key: "id", label: "번호", width: "4rem" },
  {
    key: "category",
    label: "분류",
    width: "10rem",
    filterable: true,
    // 옵션은 아래 Select에서 직접 생성하므로 표시용으로만 둠
    options: ["전체"],
  },
  { key: "content", label: "내용", width: "28rem" },
  { key: "authorName", label: "작성자", width: "10rem" },
  { key: "createdAt", label: "작성일", width: "12rem" },
  { key: "likeCount", label: "추천", width: "3rem" },
  { key: "reportCount", label: "신고", width: "3rem" },
  { key: "commentCount", label: "댓글", width: "3rem" },
  { key: "severity", label: "심각성", width: "3rem" },
  { key: "state", label: "마음상태", width: "3rem" },
  // ✅ 새 컬럼: 상태총점(심각성 + 마음상태)
  { key: "stateTotal", label: "상태총점", width: "3rem" },
];

const sortableKeys = ["createdAt", "likeCount", "reportCount", "commentCount"];
// stateTotal은 서버 정렬 컬럼이 아니므로 sortableKeys에 넣지 않음

export default function HolpaTable() {
  const {
    rows,
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
  } = useHolpaPosts({ initialSize: 25 });

  const nav = useNavigate();

  /** 카테고리 필터 */
  const handleCategoryChange = (value) => {
    if (value === "전체") {
      setParams((prev) => {
        const next = { ...prev };
        delete next.category;
        return next;
      });
    } else {
      // 한글 → 코드 역매핑
      const entries = Object.entries(holpaPostCategory);
      const code =
        entries.find(([_, label]) => label === value)?.[0] ?? undefined;
      setParams((prev) => ({ ...prev, category: code }));
    }
    setPage(1);
  };

  /** 정렬 */
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

  return (
    <Paper>
      {/* === 필터 드롭다운 === */}
      <Stack direction="row" spacing={1} sx={{ p: 0.5, ml: "0" }}>
        {/* 페이지당 행 수 */}
        <Select
          size="small"
          sx={{ fontSize: "11px", minWidth: "4rem" }}
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value)); // ✅ 행 수 변경
            setPage(1); // ✅ 첫 페이지로 리셋
          }}
        >
          {[25, 50, 100].map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          sx={{ fontSize: "11px", minWidth: "8.5rem" }}
          value={
            params?.category
              ? labelMapper("holpaPostCategory", params.category)
              : "전체"
          }
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <MenuItem value="전체">전체</MenuItem>
          {Object.entries(holpaPostCategory).map(([code, label]) => (
            <MenuItem key={code} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {/* === 로딩/에러 처리 === */}
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

      {/* === 테이블 === */}
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
                    // 기본 value
                    let value = row[col.key];

                    // 표시용 변환
                    if (col.key === "category") {
                      value = labelMapper("holpaPostCategory", row.category);
                    }
                    if (col.key === "severity") {
                      value = labelMapper("severityMap", row.severity); // 1~5
                    }
                    if (col.key === "state") {
                      value = labelMapper("stateMap", row.state); // 1~5
                    }
                    if (
                      col.key === "createdAt" &&
                      typeof row.createdAt === "string"
                    ) {
                      value = row.createdAt.slice(0, 10);
                    }

                    // ✅ 상태총점 = 심각성(숫자) + 마음상태(숫자)
                    if (col.key === "stateTotal") {
                      const sev =
                        Number(labelMapper("severityMap", row.severity)) || 0;
                      const stt =
                        Number(labelMapper("stateMap", row.state)) || 0;
                      value = sev + stt; // 필요하면 가중치 적용 가능 (예: sev*2 + stt)
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

      {/* === 페이지네이션 === */}
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
