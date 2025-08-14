import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Stack
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";

const sampleData = [
  { id: 1, title: "그래도 행복을 꿈꿔야합니다.", target: "전체", content: "힘든 소년들에게 ...", file: "240808.m4a", date: "2025.01.02", approver: "관리자1" },
  { id: 2, title: "제목 1", target: "전체", content: "축하인사 올리기가...", file: "240809.m4a", date: "2025.01.05", approver: "관리자2" }
];

const columns = [
  { key: "id", label: "번호", width: "50px" },
  { key: "title", label: "제목", width: "150px" },
  { key: "target", label: "대상", width: "80px" },
  { key: "content", label: "내용", width: "200px" },
  { key: "file", label: "파일명", width: "100px" },
  { key: "date", label: "등록일시", width: "100px" },
  { key: "approver", label: "결재인", width: "80px" },
];

const AnnouncementTable = ({ itemsPerPage = 10 }) => {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // filter 상태를 컬럼 기반으로 자동 생성
  const initialFilters = columns
    .filter(col => col.filterable)
    .reduce((acc, col) => ({ ...acc, [col.key]: "전체" }), {});
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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

  // 정렬 처리
  const sortedData = [...sampleData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const visibleRows = sortedData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <Paper>
      {/* === 필터 (filterable=true)만 위에 렌더링 === */}
      <Stack direction="row" spacing={2} sx={{ p: 1 }}>
        {columns.filter(c => c.filterable).map(col => (
          <Select
            key={col.key}
            size="small"
            value={filters[col.key]}
            sx={{ fontSize: "12px" }}
            onChange={(e) => handleFilterChange(col.key, e.target.value)}
          >
            {col.options.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        ))}
      </Stack>

      {/* === 테이블 === */}
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align="center"
                  sx={{ color: "#fff", width: col.width, border: "1px solid #ccc", fontSize: "12px", whiteSpace: "nowrap" }}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label} {renderSortIcon(col.key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell key={col.key} align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>
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

export default AnnouncementTable;
