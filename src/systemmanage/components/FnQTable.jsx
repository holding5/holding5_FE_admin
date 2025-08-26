import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Stack
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import FnQDetail from "./FnQDetail";

const sampleData = [
  { id: 1, category: "기능", question: "설치가 안될때" },
  { id: 2, category: "규칙", question: "규칙에 대한 질문1" }
];

const columns = [
  { key: "id", label: "번호", width: "50px" },
  { key: "category", 
    label: "카테고리", 
    width: "120px",
    filterable: true,
    options: ["전체", "기능", "규칙", "기타" ], 
  },
  { key: "question", label: "질문", width: "500px" },
  
];

const FnQTable = ({ itemsPerPage = 10 }) => {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // ✅ 팝오버용 상태
  const [detailAnchor, setDetailAnchor] = useState(null); // HTMLElement
  const [selectedRow, setSelectedRow] = useState(null);   // 클릭된 행 데이터

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

  // ✅ 셀 클릭 시 팝오버 열기
  const handleCellClick = (e, row) => {
    setSelectedRow(row);
    setDetailAnchor(e.currentTarget); // 이 셀을 기준으로 팝오버 앵커 지정
  };

  // ✅ 팝오버 닫기
  const handleCloseDetail = () => {
    setDetailAnchor(null);
    setSelectedRow(null);
  };

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
                  <TableCell key={col.key} align="center" sx={{ border: "1px solid #ccc", fontSize: "12px", cursor: "pointer" }}
                  onClick={(e) => handleCellClick(e, row)}>
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

      {/* ✅ 디테일 팝오버 */}
      <FnQDetail
        anchorEl={detailAnchor}
        onClose={handleCloseDetail}
        row={selectedRow}
      />

    </Paper>
  );
};

export default FnQTable;
