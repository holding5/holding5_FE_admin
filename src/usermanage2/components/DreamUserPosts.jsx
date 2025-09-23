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
  Pagination,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDreaminPosts } from "../hooks/useDreamins";

const columns = [
  { key: "no", label: "번호", width: "50px" },
  {
    key: "category",
    label: "카테고리",
    width: "80px",
    filterable: true,
    options: ["전체", "홀파담벼락", "캣츠아이", "돛단배"],
  },
  {
    key: "topic",
    label: "분류",
    width: "100px",
    filterable: true,
    options: ["전체", "일상", "왕따,학폭", "부모갈등", "선생갈등"],
  },
  {
    key: "type",
    label: "글종류",
    width: "130px",
    filterable: true,
    options: ["전체", "본문", "댓글"],
  },
  { key: "content", label: "제목/내용", width: "200px" },
  { key: "holpaScore", label: "홀파스코어", width: "80px" },
  { key: "reportCount", label: "신고건수", width: "80px" },
  { key: "createdAt", label: "등록일시", width: "100px" },
  { key: "authorNickname", label: "작성자닉네임", width: "120px" },
];

const sortableKeys = [
  "category",
  "topic",
  "type",
  "holpaScore",
  "reportCount",
  "createdAt",
];

const DreamUserPosts = ({ itemsPerPage = 10 }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [filters, setFilters] = useState(
    columns
      .filter((c) => c.filterable)
      .reduce((acc, col) => ({ ...acc, [col.key]: "전체" }), {})
  );

  const {
    rows,
    totalElements,
    loading,
    setSort,
    setParams,
    setPage: setQueryPage,
    page: queryPage,
  } = useDreaminPosts(id, {
    initialPage: 0,
    initialSize: itemsPerPage,
    initialSort: sortConfig,
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const cleaned = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== "전체")
    );
    setParams(cleaned);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setSort({ key, dir: direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <UnfoldMore fontSize="small" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );
  };

  const totalPages = Math.ceil((totalElements ?? 0) / itemsPerPage);

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ p: 1 }}>
        {columns
          .filter((c) => c.filterable)
          .map((col) => (
            <Select
              key={col.key}
              size="small"
              value={filters[col.key]}
              sx={{ fontSize: "12px" }}
              onChange={(e) => handleFilterChange(col.key, e.target.value)}
            >
              {col.options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          ))}
      </Stack>

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
              <TableRow key={row.no} hover>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align="center"
                    sx={{ border: "1px solid #ccc", fontSize: "12px" }}
                  >
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
        count={Math.max(totalPages, 1)}
        page={page}
        onChange={(e, value) => {
          setPage(value); // 로컬 페이지(1-based)
          setQueryPage(value - 1); // ✅ 훅에는 0-based로 전달
        }}
        variant="outlined"
        shape="rounded"
      />
    </Paper>
  );
};

export default DreamUserPosts;
