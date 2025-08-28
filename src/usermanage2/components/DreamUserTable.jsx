import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Pagination
} from "@mui/material";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // 테이블 셀 클릭시 Detail/:id 페이지로 이동

import useDreamins from "../../hooks/useDreamins"; // ✅ 커스텀 훅 사용
import { labelMapper } from "../../utils/LabelMapper";

const columns = [
  { key: "id", label: "번호", width: "50px" },
  { key: "gender", label: "성별", width: "50px", valueFormatter: (v) => labelMapper("genderMap", v) },
  { key: "religion", label: "종교", width: "80px", valueFormatter: (v) => labelMapper("religionMap", v) },
  { key: "nickname", label: "닉네임", width: "100px" },
  { key: "name", label: "이름", width: "100px" },
  { key: "createdAt", label: "가입일", width: "100px" },
  { key: "phoneNumber", label: "전화번호", width: "100px" },
  { key: "email", label: "이메일", width: "100px" },
  { key: "status", label: "현상태", width: "100px", valueFormatter: (v) => labelMapper("statusMap", v) },
  { key: "ageGroup", label: "구간구분", width: "100px", valueFormatter: (v) => labelMapper("ageGroupMap", v) },
  { key: "holpaScore", label: "홀파스코어", width: "50px" },
  { key: "holpaRank", label: "홀파등급", width: "100px" },
  { key: "reports", label: "신고건수", width: "100px" },
  { key: "totalAccess", label: "출첵누적", width: "100px" },
  { key: "avgAccess", label: "출첵평균", width: "100px" },
];

const sortableKeys = [
  "nickname", "gender", "name", "createdAt", "status",
  "ageGroup", "holpaScore", "holpaRank", "reports",
  "totalAccess", "avgAccess"
];

const DreamUserTable = ({ itemsPerPage = 10 }) => {
  const nav = useNavigate();
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  const {
    rows,
    totalElements,
    loading,
    setSort,
  } = useDreamins({
    initialPage: page,
    initialSize: itemsPerPage,
    initialSort: sortConfig,
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setSort({ key, dir: direction }); // API 정렬 요청
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <UnfoldMore fontSize="small" />;
    return sortConfig.direction === "asc"
      ? <ArrowUpward fontSize="small" />
      : <ArrowDownward fontSize="small" />;
  };

  return (
    <Paper>
      {loading ? (
        <div style={{ padding: "20px", textAlign: "center" }}>로딩 중...</div>
      ) : (
        <>
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
                        cursor: sortableKeys.includes(col.key) ? "pointer" : "default"
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
                {rows.map((row) => (
                  <TableRow key={row.id} hover sx={{ cursor: "pointer" }} onClick={() => nav(`/user/dream/detail/${row.id}`)}>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        align="center"
                        sx={{ border: "1px solid #ccc", fontSize: "12px" }}
                      >
                        {col.valueFormatter
                          ? col.valueFormatter(row[col.key])
                          : row[col.key] ?? "-"
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 페이지네이션 */}
          <Pagination
            sx={{ display: "flex", justifyContent: "center", my: 2 }}
            count={Math.ceil(totalElements / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </>
      )}
    </Paper>
  );
};

export default DreamUserTable;
