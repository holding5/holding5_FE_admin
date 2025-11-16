// DreamUserTable.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Stack,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  UnfoldMore,
  Search as SearchIcon,
  Clear,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useHappyinApplications } from "../hooks/useHappyins";
import { labelMapper } from "../../utils/LabelMapper";
import HappyUserForceCreateDialog from "../components/HappyUserForceCreateDialog";

const columns = [
  { key: "id", label: "번호", width: "50px" },
  {
    key: "status",
    label: "심사상태",
    width: "80px",
    valueFormatter: (v) => labelMapper("happyApplicationStatusMap", v),
  },
  {
    key: "serviceRole",
    label: "신청 구분",
    width: "120px",
    valueFormatter: (v) => labelMapper("serviceRoleMap", v),
  },
  { key: "nickname", label: "닉네임", width: "100px" },
  { key: "birthDate", label: "생년월일", width: "100px" },
  { key: "phoneNumber", label: "전화번호", width: "150px" },

  { key: "jobTitle", label: "직장명", width: "80px" },
  { key: "career", label: "경력사항", width: "100px" },
  { key: "selfIntroduction", label: "자기소개", width: "100px" },
  { key: "motivation", label: "동기", width: "100px" },
  { key: "createdAt", label: "신청일자", width: "100px" },
  {
    key: "hasAttachment",
    label: "첨부파일",
    width: "90px",
    valueFormatter: (v) => (v ? "있음" : "없음"),
  },
];

const sortableKeys = ["createdAt"];

export default function HappyUserApplicationTable() {
  // ✅ props 형태 수정
  const nav = useNavigate();
  const [forceOpen, setForceOpen] = useState(false); // 해피인 직권생성 팝업
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // ✅ 심사상태 필터 상태
  const [statusFilter, setStatusFilter] = useState("");

  const endpoint = "/admin/happyin/applications";

  const {
    rows,
    totalElements,
    totalPages,
    loading,
    page,
    setPage,
    size,
    setSize,
    params,
    setParams,
    setSort,
  } = useHappyinApplications({
    endpoint, // ← 훅이 endpoint 옵션을 받도록 (1줄 변경 필요할 수 있음)
    initialPage: 1,
    initialSize: 25,
    initialSort: sortConfig,
    initialParams: {},
  });

  // 🔁 params.role 변경되면 셀렉트 값 동기화
  useEffect(() => {
    setStatusFilter(params?.status ?? "");
  }, [params?.status]);

  // ✅ 역할 선택 변경 시 쿼리 파라미터 반영
  const handleStatusChange = (e) => {
    const value = e.target.value; // "", "DREAMIN", "GROUP_HAPPYIN" ...
    setStatusFilter(value);

    setParams((prev) => {
      const next = { ...prev };
      if (value) next.status = value;
      else delete next.status;
      return next;
    });
    setPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
    setSort({ key, dir: direction });
    setPage(1);
  };

  const renderSortIcon = (key) =>
    sortConfig.key !== key ? (
      <UnfoldMore fontSize="small" />
    ) : sortConfig.direction === "asc" ? (
      <ArrowUpward fontSize="small" />
    ) : (
      <ArrowDownward fontSize="small" />
    );

  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    setKeywordInput(params?.keyword ?? "");
  }, [params?.keyword]);

  // 🔎 검색 실행
  const runKeywordSearch = () => {
    const kw = keywordInput.trim();
    setParams((prev) => {
      const next = { ...prev };
      if (kw) next.keyword = kw;
      else delete next.keyword;
      return next;
    });
    setPage(1);
  };

  // 🔎 검색어 지우기
  const clearQuery = () => {
    setKeywordInput("");
    setParams((prev) => {
      const next = { ...prev };
      delete next.keyword;
      return next;
    });
    setPage(1);
  };

  // 📄 페이지당 개수
  const onChangePageSize = (v) => {
    setSize(v);
    setPage(1);
  };

  return (
    <Paper>
      {/* 상단 영역 */}
      <Box sx={{ px: 2, pt: 2 }}>
        {/* 검색행 */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 왼쪽: 심사상태 셀렉트 + 검색바(가변폭) */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            {/* 해피인 직권 생성 버튼 추가 */}
            <Button
              variant="outlined"
              onClick={() => setForceOpen(true)}
              sx={{ whiteSpace: "nowrap" }}
            >
              해피인직권생성
            </Button>
            {/* 심사상태 필터 셀렉트 */}
            <Select
              size="small"
              value={statusFilter}
              onChange={handleStatusChange}
              displayEmpty
              sx={{ minWidth: 120, fontSize: "0.8rem" }}
            >
              <MenuItem value="">
                <em>전체</em>
              </MenuItem>
              <MenuItem value="DIP">대기</MenuItem>
              <MenuItem value="ACTIVATED">승인</MenuItem>
              <MenuItem value="SUSPENDED">보류</MenuItem>
              <MenuItem value="DEACTIVATED">거절</MenuItem>
            </Select>

            <TextField
              size="small"
              placeholder="해피인 검색 (닉네임/이름/전화)"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runKeywordSearch();
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: keywordInput !== "" && (
                  <InputAdornment position="end">
                    <Clear
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                      onClick={clearQuery}
                    />
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{ flexGrow: 1 }} // ✅ 남는 공간을 전부 차지
            />
            {/* 검색 버튼 */}
            <Button
              variant="contained"
              size="small"
              onClick={runKeywordSearch}
              sx={{ flexShrink: 0 }}
            >
              검색
            </Button>
          </Stack>

          {/* 오른쪽: 총개수 + 페이지당 */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ flexShrink: 0 }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
            >
              총 {totalElements?.toLocaleString?.() ?? 0}건
            </Typography>
            <Select
              size="small"
              value={size}
              onChange={(e) => onChangePageSize(Number(e.target.value))}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </Box>

      {loading ? (
        <div style={{ padding: 20, textAlign: "center" }}>로딩 중...</div>
      ) : (
        <>
          <TableContainer sx={{ mt: 1 }}>
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
                      onClick={() =>
                        sortableKeys.includes(col.key) && handleSort(col.key)
                      }
                    >
                      {col.label}{" "}
                      {sortableKeys.includes(col.key) &&
                        renderSortIcon(col.key)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  // ✅ 데이터 없을 때 한 줄만 표시
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={columns.length}
                      sx={{
                        border: "1px solid #ccc",
                        fontSize: "12px",
                        color: "text.secondary",
                        py: 4, // 세로 여백 넉넉하게
                      }}
                    >
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  // ✅ 데이터 있을 때 기존 로직
                  rows.map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        nav(`/user/happy/application/detail/${row.userId}`)
                      }
                    >
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          align="center"
                          sx={{
                            border: "1px solid #ccc",
                            fontSize: "12px",
                            color:
                              col.key === "status"
                                ? row.status === "DIP"
                                  ? "#9E9E9E" // 대기 - 회색
                                  : row.status === "ACTIVATED"
                                  ? "#4CAF50" // 승인 - 초록
                                  : row.status === "SUSPENDED"
                                  ? "#FB8C00" // 보류 - 주황
                                  : row.status === "DEACTIVATED"
                                  ? "#F44336" // 거절 - 빨강
                                  : "inherit"
                                : "inherit",
                          }}
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

          <Pagination
            sx={{ display: "flex", justifyContent: "center", my: 2 }}
            count={totalPages || Math.ceil((totalElements || 0) / (size || 25))}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </>
      )}

      <HappyUserForceCreateDialog
        open={forceOpen}
        onClose={() => setForceOpen(false)}
        // onSuccess={() => refetch && refetch()}  // 목록 다시 불러오고 싶으면 이런 식으로
      />
    </Paper>
  );
}
