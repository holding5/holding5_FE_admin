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
import useReportedPosts from "../hooks/useReportedPosts";
import { labelMapper } from "../../utils/LabelMapper";

// 처리대기, 무혐의, 처리완료
const POST_STATUS_FILTER_OPTIONS = [
  { value: "", label: "신고상태 전체" },
  ...["OPEN", "DISMISSED", "RESOLVED"].map((key) => ({
    value: key,
    label: labelMapper("reportedPostStatusMap", key),
  })),
];

const columns = [
  { key: "id", label: "번호", width: "4rem" },
  {
    key: "reportStatus",
    label: "처리상태",
    width: "5rem",
    valueFormatter: (v) => labelMapper("reportedPostStatusMap", v),
  },
  { key: "authorNickname", label: "작성자", width: "8rem" },
  {
    key: "postType",
    label: "분류",
    width: "10rem",
    valueFormatter: (v, row) =>
      row.commentId != null ? "댓글" : labelMapper("reportedPostTypeMap", v),
  },

  { key: "content", label: "내용", width: "30rem" },
  {
    key: "dominantReportType",
    label: "신고 분류",
    width: "4rem",
    valueFormatter: (v) => labelMapper("dominantReportTypeMap", v),
  },
  {
    key: "firstReportedAt",
    label: "신고 시점",
    width: "8rem",
    valueFormatter: (v) =>
      typeof v === "string" ? v.slice(0, 16).replace("T", " ") : "-",
  },
  {
    key: "bannedAt",
    label: "영구정지 시점",
    width: "8rem",
    valueFormatter: (v) =>
      typeof v === "string" ? v.slice(0, 16).replace("T", " ") : "-",
  },
  { key: "totalReportCount", label: "신고수", width: "3rem" },
  { key: "verbalAbuseCount", label: "언어폭력", width: "3rem" },
  { key: "spammingCount", label: "도배", width: "3rem" },
  { key: "inappropriateLanguageCount", label: "부적절한 언어", width: "3rem" },
  { key: "sexualHarassmentCount", label: "음담패설/성희롱", width: "3rem" },
];

const sortableKeys = ["firstReportedAt", "totalReportCount"];

export default function ReportedPostTable() {
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
  } = useReportedPosts({ initialSize: 25 });

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

  const statusFilterValue = params?.status ?? "";

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setParams((prev) => {
      const next = { ...prev };
      if (!value) {
        delete next.status;
      } else {
        next.status = value;
      }
      return next;
    });

    setPage(1); // 필터 바꾸면 1페이지로 이동
  };

  const statusColorMap = {
    OPEN: "orange",
    DISMISSED: "green",
    RESOLVED: "red",
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
            value={statusFilterValue}
            onChange={handleStatusChange}
            displayEmpty
            sx={{ minWidth: 160, fontSize: "0.8rem" }}
          >
            {POST_STATUS_FILTER_OPTIONS.map((opt) => (
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
                  key={row.key}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    nav(`detail/user/${row.id}/post/${row.postId}`)
                  }
                >
                  {columns.map((col) => {
                    let value = row[col.key];

                    if (
                      col.key === "createdAt" &&
                      typeof row.createdAt === "string"
                    ) {
                      value = row.createdAt.slice(0, 10);
                    }
                    if (col.valueFormatter) {
                      value = col.valueFormatter(value, row);
                    }

                    return (
                      <TableCell
                        key={col.key}
                        align="center"
                        sx={{
                          border: "1px solid #ccc",
                          fontSize: "12px",
                          color:
                            col.key === "reportStatus"
                              ? statusColorMap[row.reportStatus] || "inherit"
                              : "inherit",
                        }}
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
