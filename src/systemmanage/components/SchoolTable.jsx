// src/pages/components/SchoolTable.jsx
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
  Divider,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Clear, Search } from "@mui/icons-material";
import { REGIONS } from "../utils/eduSupportData";
import { labelMapper } from "../../utils/LabelMapper";
import { schoolTypeMap } from "../../constant/codeMaps";

const columns = [
  { key: "id", label: "번호", width: "3rem" },
  { key: "schoolType", label: "분류", width: "8rem" },
  { key: "province", label: "지역", width: "8rem" },
  { key: "name", label: "학교명", width: "8rem" },
  { key: "phoneNumber", label: "전화", width: "10rem" },
  { key: "address", label: "주소", width: "12rem" },
  { key: "memberCount", label: "회원수", width: "4rem" },
];

// province는 서버가 라벨(예: '경상북도')을 받으므로 라벨을 옵션으로 노출
const PROVINCE_OPTIONS = ["전체", ...REGIONS.map((r) => r.label)];
const PAGE_SIZE_OPTIONS = [25, 50, 100];

export default function SchoolTable({
  // 데이터/상태
  rows = [],
  totalPages = 1,
  page = 1,
  loading = false,

  // 컨트롤러 (useSchoolList에서 전달)
  setPage,
  filters = {},
  setFilters,
  size,
  setSize,
}) {
  const safeRows = useMemo(
    () =>
      Array.isArray(rows) ? rows.filter((r) => r && typeof r === "object") : [],
    [rows]
  );

  const clearKeyword = () => setFilters((f) => ({ ...f, keyword: "" }));

  const resetFilters = () =>
    setFilters({
      schoolType: "",
      province: "",
      keyword: "",
    });

  return (
    <Paper sx={{ overflow: "hidden" }}>
      {/* ====== 컨트롤 바 ====== */}
      <Box sx={{ p: 1.25 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.25}
          alignItems="center"
        >
          {/* 학교 타입 */}
          <Select
            size="small"
            value={filters.schoolType ?? ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, schoolType: e.target.value }))
            }
            sx={{ minWidth: 120, fontSize: "0.8em" }}
            displayEmpty
            renderValue={(val) =>
              val === "" ? "전체" : labelMapper("schoolTypeMap", val)
            }
          >
            <MenuItem value="">전체</MenuItem>
            {Object.keys(schoolTypeMap).map((code) => (
              <MenuItem key={code} value={code}>
                {labelMapper("schoolTypeMap", code)}
              </MenuItem>
            ))}
          </Select>

          {/* 지역(라벨) */}
          <Select
            size="small"
            value={filters.province || "전체"}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                province: e.target.value === "전체" ? "" : e.target.value,
              }))
            }
            sx={{ minWidth: 130, fontSize: "0.8em" }}
          >
            {PROVINCE_OPTIONS.map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>

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
              placeholder="학교명 검색"
              value={filters.keyword || ""}
              onChange={(e) =>
                setFilters((f) => ({ ...f, keyword: e.target.value }))
              }
              InputProps={{
                startAdornment: <Search fontSize="small" sx={{ mr: 0.5 }} />,
                endAdornment: !!filters.keyword && (
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
          {typeof size !== "undefined" && setSize && (
            <Select
              size="small"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              sx={{ minWidth: 90, fontSize: "0.8em" }}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <MenuItem key={n} value={n}>
                  {n}개
                </MenuItem>
              ))}
            </Select>
          )}

          {/* 초기화 */}
          <Tooltip title="필터 초기화">
            <IconButton
              onClick={resetFilters}
              size="small"
              aria-label="reset filters"
            >
              <Clear fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Divider />

      {/* ====== 테이블 ====== */}
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table size="small" stickyHeader aria-label="학교 목록 테이블">
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
            ) : safeRows.length === 0 ? (
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
              safeRows.map((row) => (
                <TableRow key={row.id} hover>
                  {columns.map((col) => {
                    let val = row?.[col.key] ?? "";

                    if (col.key === "schoolType" && val) {
                      val = labelMapper("schoolTypeMap", val);
                    }
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
                    if (
                      col.key === "memberCount" &&
                      typeof row.memberCount === "number"
                    ) {
                      val = row.memberCount.toLocaleString();
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
          count={Math.max(1, totalPages)}
          page={page}
          onChange={(_, value) => setPage?.(value)}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </Box>
    </Paper>
  );
}
