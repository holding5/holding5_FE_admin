import React, { useState } from "react";
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
  Checkbox, // ✅ 추가
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { reportedPostMock } from "../utils/ReportedPostMock"; // mock 데이터

const columns = [
  { key: "post_id", label: "번호", width: "50px" },
  { key: "nickname", label: "닉네임", width: "80px" },
  { key: "email", label: "이메일", width: "100px" },
  { key: "type", label: "분류", width: "80px" },
  { key: "status", label: "현상태", width: "80px" },
  { key: "content", label: "내용", width: "150px" },
  { key: "reportedAt", label: "신고시점", width: "100px" },
  { key: "bannedAt", label: "영구제명 시점", width: "100px" },
  { key: "totalReportCount", label: "총 신고 수", width: "50px" },
  { key: "spammingCount", label: "언어폭력", width: "50px" },
  { key: "inappropriateLanguageCount", label: "도배", width: "50px" },
  { key: "verbalAbuseCount", label: "부적절한 언어", width: "50px" },
  { key: "sexualHarassmentCount", label: "음담패설, 성희롱", width: "50px" },
];

const sortableKeys = [];

const ReportedPostTable = ({ itemsPerPage = 10 }) => {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const nav = useNavigate();

  // ✅ 선택 상태 추가
  const [selectedIds, setSelectedIds] = useState([]);

  const initialFilters = columns
    .filter((col) => col.filterable)
    .reduce((acc, col) => ({ ...acc, [col.key]: "전체" }), {});
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <UnfoldMore fontSize="small" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

  // ✅ 필터 적용
  const filteredData = reportedPostMock.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === "전체") return true;
      return row[key] === value;
    });
  });

  // ✅ 정렬 적용
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key;
    if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const visibleRows = sortedData.slice(startIdx, startIdx + itemsPerPage);

  // ✅ 개별 선택/해제
  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  // ✅ 현재 페이지(visibleRows) 기준 전체 선택/해제
  const handleSelectAll = () => {
    const pageIds = visibleRows.map((r) => r.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      // 현재 페이지 아이디들만 제거
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      // 현재 페이지 아이디들 추가(중복 제거)
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const isSelected = (id) => selectedIds.includes(id);

  // 테이블 셀 클릭 핸들러
  const handleCellClick = (e, row, colKey) => {
    if (["nickname", "email"].includes(colKey)) return;
    if (e.target.type === "checkbox") return;
    nav(`/post/reported/detail/${row.post_id}`);
  };

  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ px: 2, pt: 2, m: 1 }}
      >
        <button
          disabled={selectedIds.length === 0}
          style={{
            backgroundColor: "#57b306ff",
            color: "#fff",
            padding: "6px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          일괄 행정처리
        </button>
      </Stack>

      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {/* ✅ 헤더 체크박스 컬럼 */}
              <TableCell padding="checkbox" sx={{ border: "1px solid #ccc" }}>
                <Checkbox
                  color="default"
                  onChange={handleSelectAll}
                  checked={
                    visibleRows.length > 0 &&
                    visibleRows.every((r) => selectedIds.includes(r.id))
                  }
                  indeterminate={
                    visibleRows.some((r) => selectedIds.includes(r.id)) &&
                    !visibleRows.every((r) => selectedIds.includes(r.id))
                  }
                />
              </TableCell>

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
                  onClick={() => {
                    if (sortableKeys.includes(col.key)) {
                      handleSort(col.key);
                    }
                  }}
                >
                  {col.label}{" "}
                  {sortableKeys.includes(col.key) && renderSortIcon(col.key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.post_id} hover>
                {/* ✅ 행 체크박스 */}
                <TableCell padding="checkbox" sx={{ border: "1px solid #ccc" }}>
                  <Checkbox
                    color="default"
                    checked={isSelected(row.post_id)}
                    onChange={() => handleSelectRow(row.post_id)}
                  />
                </TableCell>

                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align="center"
                    sx={{
                      border: "1px solid #ccc",
                      fontSize: "12px",
                      cursor: ["nickname", "email"].includes(col.key)
                        ? "default"
                        : "pointer",
                    }}
                    onClick={(e) => handleCellClick(e, row, col.key)}
                  >
                    {row[col.key]}
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
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
      />
    </Paper>
  );
};

export default ReportedPostTable;
