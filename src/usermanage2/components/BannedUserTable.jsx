import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Checkbox,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import useBannedUsers from "../hooks/useBannedUser";
import releaseBannedUsers from "../../api/releaseBannedUsers";
import { labelMapper } from "../../utils/LabelMapper";

const columns = [
  { key: "id", label: "번호", width: "40px" },
  { key: "nickname", label: "닉네임", width: "100px" },
  {
    key: "status",
    label: "상태",
    width: "80px",
    valueFormatter: (v) => labelMapper("statusMap", v),
  },
  { key: "bannedAt", label: "영구제명 시점", width: "180px" },
  { key: "totalReportCount", label: "총 신고 수", width: "50px" },
  { key: "spammingCount", label: "언어폭력", width: "50px" },
  { key: "inappropriateLanguageCount", label: "도배", width: "50px" },
  { key: "verbalAbuseCount", label: "부적절한 언어", width: "50px" },
  { key: "sexualHarassmentCount", label: "음담패설, 성희롱", width: "50px" },
];

const BannedUserTable = ({ itemsPerPage = 25 }) => {
  const nav = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: "userId",
    direction: "asc",
  });
  const [selectedIds, setSelectedIds] = useState([]);

  const {
    rows: bannedUsers = [],
    totalPages = 0,
    loading,
    refetch,
    page,
    setPage,
    size,
    setSize,
  } = useBannedUsers({
    initialPage: 1,
    initialSort: sortConfig,
    initialSize: itemsPerPage,
  });

  const handleRelease = async () => {
    try {
      await releaseBannedUsers(selectedIds);
      alert("영구제명 해제 완료");
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("해제 실패", error);
      alert("해제에 실패했습니다.");
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === bannedUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(bannedUsers.map((row) => row.id));
    }
  };

  const isSelected = (id) => selectedIds.includes(id);

  return (
    <Paper>
      {/* === 상단 해제 버튼 === */}
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ px: 2, pt: 2, m: 1 }}
      >
        {/* ✅ 페이지당 행 수 */}
        <Select
          size="small"
          sx={{ fontSize: "11px", minWidth: "6em" }}
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value)); // ✅ 행 수 변경
            setPage(1); // ✅ 첫 페이지로 리셋
            setSelectedIds([]); // (권장) 선택 초기화
          }}
        >
          {[25, 50, 100].map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
        <button
          onClick={handleRelease}
          disabled={selectedIds.length === 0}
          style={{
            backgroundColor: "#FF9800",
            color: "#fff",
            padding: "6px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          영구제명 해제
        </button>
      </Stack>

      {/* === 테이블 === */}
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="default"
                  onChange={handleSelectAll}
                  checked={
                    bannedUsers.length > 0 &&
                    selectedIds.length === bannedUsers.length
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
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  불러오는 중...
                </TableCell>
              </TableRow>
            ) : (
              bannedUsers.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="default"
                      checked={isSelected(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{
                        border: "1px solid #ccc",
                        fontSize: "12px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                      onClick={
                        col.key === "nickname"
                          ? () => nav(`/user/dream/detail/${row.id}`)
                          : undefined
                      }
                    >
                      {col.valueFormatter
                        ? col.valueFormatter(row[col.key])
                        : row[col.key] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
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
    </Paper>
  );
};

export default BannedUserTable;
