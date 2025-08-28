import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Stack
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import LifeMessageDetail from "./LifeMessageDetail";
import { lifeMessageMock } from "../utils/lifeMessageMock"; // mock 데이터

const columns = [
  { key: "id", label: "번호", width: "50px" },
  {
    key: "classification",
    label: "분류",
    width: "80px",
    filterable: true,
    options: ["전체", "공통", "왕따,학폭", "성적,학업", "친구,이성", "부모갈등", "선생갈등", "가정형편,경제", "외모문제"]
  },
  {
    key: "isAllow",
    label: "승인여부",
    width: "100px",
  },
  {
    key: "religion",
    label: "종교",
    width: "80px",
    filterable: true,
    options: [ "전체", "상관없음", "기독교", "불교", "천주교", "무교" ]
  },
  { key: "title", label: "제목", width: "150px" },
  { key: "file", label: "파일명", width: "100px" },
  { key: "date", label: "등록일시", width: "100px" },
  { key: "nickName", label: "작성자 닉네임", width: "120px" },
  { key: "reports", label: "신고수", width: "80px" },
  { key: "comments", label: "답글", width: "80px" },
  { key: "lifeSaves", label: "생명살림", width: "80px" },
  { key: "courage", label: "큰용기,위안", width: "80px" },
  { key: "notHelpFul", label: "별 도움안됨", width: "80px" },
  { key: "sending", label: "발송 회수", width: "80px" },
  { key: "approver", label: "결재인", width: "80px" },
];

const sortableKeys = [ "date", "reports", "coments", "lifeSaves", "courage", "notHelpFul", "sending" ];

const LifeMessageTable = ({ itemsPerPage = 10 }) => {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [detailAnchor, setDetailAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

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

  // ✅ 필터 적용
  const filteredData = lifeMessageMock.filter((row) => {
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

  const handleCellClick = (e, row) => {
    setSelectedRow(row);
    setDetailAnchor(e.currentTarget);
  };

  const handleCloseDetail = () => {
    setDetailAnchor(null);
    setSelectedRow(null);
  };

  return (
    <Paper>
      {/* === 필터 드롭다운 === */}
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
                  sx={{
                    color: "#fff", width: col.width, border: "1px solid #ccc",
                    fontSize: "12px", whiteSpace: "nowrap",
                    cursor: sortableKeys.includes(col.key) ? "pointer" : "default"
                  }}
                  onClick={() => {
                    if (sortableKeys.includes(col.key)) {
                      handleSort(col.key);
                    }
                  }}
                >
                  {col.label} {" "}
                  {sortableKeys.includes(col.key) && renderSortIcon(col.key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align="center"
                    sx={{ border: "1px solid #ccc", fontSize: "12px", cursor: "pointer" }}
                    onClick={(e) => handleCellClick(e, row)}
                  >
                    {row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* === 페이지네이션 === */}
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

      {/* === 팝오버 상세 보기 === */}
      <LifeMessageDetail
        anchorEl={detailAnchor}
        onClose={handleCloseDetail}
        row={selectedRow}
      />
    </Paper>
  );
};

export default LifeMessageTable;
