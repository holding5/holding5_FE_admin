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

import usePausedUsers from "../../hooks/usePausedUsers";
import { releasePausedUsers } from "../../hooks/usePausedUsers";
import { banPausedUsers } from "../../hooks/usePausedUsers";
import { labelMapper } from "../../utils/LabelMapper";

const columns = [
  { key: "userId", label: "번호", width: "3em" },
  { key: "nickname", label: "닉네임", width: "6em" },
  { key: "suspensionStartAt", label: "일시정지 시점", width: "12em" },
  { key: "elapsedDays", label: "경과일", width: "3em" },
  { key: "suspensionEndAt", label: "자동해제 시점", width: "12em" },
  { key: "remainingDays", label: "잔여일", width: "3em" },
  { key: "totalReportCount", label: "총 신고 수", width: "4em" },
  { key: "spammingCount", label: "언어폭력", width: "2em" },
  { key: "inappropriateLanguageCount", label: "도배", width: "2em" },
  { key: "verbalAbuseCount", label: "부적절한 언어", width: "4em" },
  { key: "sexualHarassmentCount", label: "음담패설, 성희롱", width: "4em" },
];

const PausedUserTable = ({ itemsPerPage = 25 }) => {
  const nav = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: "startDate",
    direction: "desc",
  });
  const [selectedIds, setSelectedIds] = useState([]);

  const {
    rows: pausedUsers = [],
    totalPages = 0,
    loading,
    refetch,
    page,
    setPage,
    size,
    setSize,
  } = usePausedUsers({
    initialPage: 1,
    initialSort: sortConfig,
    initialSize: itemsPerPage,
  });

  const handleRelease = async () => {
    try {
      await releasePausedUsers(selectedIds);
      alert("정지해지 완료");
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("정지해지 실패", error);
      alert("해지에 실패했습니다.");
    }
  };

  const handleBan = async () => {
    try {
      await banPausedUsers(selectedIds);
      alert("영구정지 완료");
      setSelectedIds([]);
      refetch();
    } catch (error) {
      console.error("영구정지 실패", error);
      alert("영구정지에 실패했습니다.");
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === pausedUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pausedUsers.map((row) => row.id));
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
        {/* ✅ 페이지당 행 수 셀렉트 */}
        <Select
          size="small"
          sx={{ fontSize: "11px", minWidth: "4rem" }}
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value)); // ✅ 행 수 변경
            setPage(1); // ✅ 첫 페이지로 리셋
            setSelectedIds([]); // 선택 초기화(권장)
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
          정지해지
        </button>

        <button
          onClick={handleBan}
          disabled={selectedIds.length === 0}
          style={{
            backgroundColor: "#ff3c00ff",
            color: "#fff",
            padding: "6px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          영구제명
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
                    pausedUsers.length > 0 &&
                    selectedIds.length === pausedUsers.length
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
              pausedUsers.map((row) => (
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

export default PausedUserTable;
