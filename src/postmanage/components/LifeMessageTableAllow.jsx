import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Stack
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import LifeMessageDetail from "./LifeMessageDetail";

const sampleData = [
  { id: 1, classification: "공통", isAllow: "승인", religion: "상관없음", title: "생명메세지 승인리스트 테스트", file: "240808.m4a", date: "2025.01.02", nickName: "유재석(메뚜기)", reports: 0, comments: 3, lifeSaves: 4, courage: 6, notHelpFul: 8, sending: 15, approver: "관리자1" },
  { id: 2, classification: "학폭", isAllow: "승인대기", religion: "불교", title: "제목 1", file: "240809.m4a", date: "2025.01.05", nickName: "추동훈(메뚜기)", reports: 1, comments: 3, lifeSaves: 6, courage: 11, notHelpFul: 8, sending: 15, approver: "관리자2" }
];

const columns = [
  { key: "id", label: "번호", width: "50px" },
  {
    key: "classification",
    label: "분류",
    width: "80px",
    filterable: true,
    options: ["전체", "공통", "학폭", "가정문제", "기타"]
  },
  {
    key: "isAllow",
    label: "승인여부",
    width: "100px",
    filterable: true,
    options: ["전체", "승인", "승인대기"]
  },
  {
    key: "religion",
    label: "종교",
    width: "80px",
    filterable: true,
    options: ["전체", "상관없음", "기독교", "불교", "천주교"]
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

const LifeMessageTableAllow = ({ itemsPerPage = 10 }) => {
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
      <LifeMessageDetail
        anchorEl={detailAnchor}
        onClose={handleCloseDetail}
        row={selectedRow}
      />
    </Paper>
  );
};

export default LifeMessageTableAllow;
