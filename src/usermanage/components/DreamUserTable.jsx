import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Stack
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";

const sampleData = [
  { id: 1, nickname: "추", gender: "남", name: "추동훈", createdAt: "2025-08-22", phoneNumber: "010-9744-5113", email: "cdh5113@naver.com", religion: "불교", status: "활동중"  },
];

const columns = [
  { key: "id", label: "번호", width: "30px" },
  { key: "nickname", label: "닉네임", width: "70px" },
  { key: "gender", label: "성별", width: "30px" },
  { key: "name", label: "이름", width: "70px" },
  { key: "createdAt", label: "가입일", width: "100px" },
  { key: "phoneNumber", label: "전화", width: "100px" },
  { key: "email", label: "이메일", width: "100px" },
  { key: "religion", label: "종교", width: "60px" },
  { key: "status", label: "현상태", width: "60px" },
  { key: "ageGroup", label: "구간구분", width: "70px" },
  { key: "holpaScore", label: "홀파스코어", width: "50px" },
  { key: "holpaRank", label: "홀파등급", width: "60px" },
  { key: "totalReportCount", label: "신고건수", width: "30px"},
  { key: "totalAttendanceCount", label: "출첵누적", width: "30px" },
  { key: "AvgAttendanceCount", label: "출첵평균", width: "30px" }, 
];

const DreamUserTable = ({ itemsPerPage = 10 }) => {
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

export default DreamUserTable;
