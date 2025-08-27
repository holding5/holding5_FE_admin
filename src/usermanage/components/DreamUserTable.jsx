import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, Stack
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";

import useTableApi from "../../hooks/useTableApi"; // ✅ 훅 import

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
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" });

  const { data, total, loading, setParams } = useTableApi({
    url: "/admin/member/dreamins",
    initialParams: {
      page: page - 1,
      size: itemsPerPage,
      sort: `${sortConfig.key},${sortConfig.direction}`,
    },
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const newSort = { key, direction };
    setSortConfig(newSort);

    setParams((prev) => ({
      ...prev,
      sort: `${key},${direction}`,
    }));
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <UnfoldMore fontSize="small" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (e, value) => {
    setPage(value);
    setParams((prev) => ({
      ...prev,
      page: value - 1,
    }));
  };

  return (
    <Paper>
      {/* 필터 추후 연결 */}
      <Stack direction="row" spacing={2} sx={{ p: 1 }}>
        {/* 필터 조건이 있을 경우 여기에 */}
      </Stack>

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
            {data.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell key={col.key} align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>
                    {row[col.key] ?? "-"}
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
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Paper>
  );
};

export default DreamUserTable;
