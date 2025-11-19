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
  Collapse,
  Chip,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  UnfoldMore,
  Search as SearchIcon,
  Clear,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DetailSearchBar from "./DetailSearchBar";
import useHappyins from "../hooks/useHappyins";
import { labelMapper } from "../../utils/LabelMapper";

const columns = [
  { key: "id", label: "번호", width: "50px" },
  {
    key: "gender",
    label: "성별",
    width: "30px",
    valueFormatter: (v) => labelMapper("genderMap", v),
  },
  {
    key: "religion",
    label: "종교",
    width: "80px",
    valueFormatter: (v) => labelMapper("religionMap", v),
  },
  {
    key: "serviceRole",
    label: "해피인 분류",
    width: "120px",
    valueFormatter: (v) => labelMapper("serviceRoleMap", v),
  },
  { key: "nickname", label: "닉네임", width: "100px" },
  { key: "name", label: "이름", width: "100px" },
  { key: "createdAt", label: "가입일", width: "100px" },
  { key: "phoneNumber", label: "전화번호", width: "150px" },
  { key: "email", label: "이메일", width: "100px" },
  {
    key: "status",
    label: "현상태",
    width: "80px",
    valueFormatter: (v) => labelMapper("statusMap", v),
  },
  {
    key: "ageGroup",
    label: "구간구분",
    width: "80px",
    valueFormatter: (v) => labelMapper("ageGroupMap", v),
  },
  { key: "reports", label: "신고건수", width: "50px" },
];

const sortableKeys = [
  "nickname",
  "gender",
  "name",
  "createdAt",
  "status",
  "totalAccess",
  "avgAccess",
];

export default function HappyUserTable({ filters = {} }) {
  // ✅ props 형태 수정
  const nav = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [showDetail, setShowDetail] = useState(false);
  const [detailFilters, setDetailFilters] = useState(filters);
  const [useSearch, setUseSearch] = useState(false); // ✅ /search 엔드포인트 사용 여부

  // ✅ 역할 필터 상태
  const [roleFilter, setRoleFilter] = useState("");

  // ✅ 기본은 /table, 상세조건 있으면 /table/search 사용
  const endpoint = useSearch
    ? "/admin/happyin/table/search"
    : "/admin/happyin/table";

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
  } = useHappyins({
    endpoint, // ← 훅이 endpoint 옵션을 받도록 (1줄 변경 필요할 수 있음)
    initialPage: 1,
    initialSize: 25,
    initialSort: sortConfig,
    initialParams: { onlyActive: true, q: "" },
    externalParams: detailFilters, // (훅이 지원하면 병합해서 초기화)
  });

  // 🔁 params.role 변경되면 셀렉트 값 동기화
  useEffect(() => {
    setRoleFilter(params?.role ?? "");
  }, [params?.role]);

  // ✅ 역할 선택 변경 시 쿼리 파라미터 반영
  const handleRoleChange = (e) => {
    const value = e.target.value; // "", "DREAMIN", "GROUP_HAPPYIN" ...
    setRoleFilter(value);

    setParams((prev) => {
      const next = { ...prev };
      if (value) next.role = value;
      else delete next.role; // 전체 선택 시 role 파라미터 제거
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
    setKeywordInput(params?.q ?? "");
  }, [params?.q]);

  // 🔎 검색 실행
  const runKeywordSearch = () => {
    const kw = keywordInput.trim();
    setParams((prev) => {
      const next = { ...prev };
      if (kw) next.q = kw;
      else delete next.q;
      return next;
    });
    setPage(1);
  };

  // 🔎 검색어 지우기
  const clearQuery = () => {
    setKeywordInput("");
    setParams((prev) => {
      const next = { ...prev };
      delete next.q;
      return next;
    });
    setPage(1);
  };

  // 📄 페이지당 개수
  const onChangePageSize = (v) => {
    setSize(v);
    setPage(1);
  };

  // ✅ 상세검색 적용: 파라미터 합치고 /search 전환
  const applyDetailFilters = (f) => {
    setDetailFilters(f);

    const hasFilter = Object.keys(f || {}).length > 0;
    setUseSearch(hasFilter);
    // createdFrom/createdTo, gender, religion, status, ageGroup(이미 ENUM으로 변환됨) 들어옴
    setParams((prev) => {
      // 상세 필터 제거/적용을 깔끔하게 하려면 관련 키만 정리
      const cleared = { ...prev };
      [
        "gender",
        "religion",
        "status",
        "ageGroup",
        "createdFrom",
        "createdTo",
      ].forEach((k) => delete cleared[k]);
      return { ...cleared, ...(f || {}) };
    });
    setPage(1);
  };

  return (
    <Paper>
      {/* 상단 영역 */}
      <Box sx={{ px: 2, pt: 2 }}>
        {/* 상세검색 패널 */}
        <Collapse in={showDetail} unmountOnExit>
          <DetailSearchBar
            defaultValues={detailFilters}
            onApply={applyDetailFilters}
            onReset={() => applyDetailFilters({})}
          />
        </Collapse>

        {/* 검색행 */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 왼쪽: 역할 셀렉트 + 토글 + 검색바(가변폭) */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            {/* ✅ 역할 필터 셀렉트 */}
            <Select
              size="small"
              value={roleFilter}
              onChange={handleRoleChange}
              displayEmpty
              sx={{ minWidth: 120, fontSize: "0.8rem" }}
            >
              <MenuItem value="">
                <em>역할 전체</em>
              </MenuItem>
              <MenuItem value="GROUP_HAPPYIN">그룹해피인</MenuItem>
              <MenuItem value="BASIC_HAPPYIN">해피인</MenuItem>
              <MenuItem value="STAR_HAPPYIN">스타해피인</MenuItem>
              <MenuItem value="TEEN_HAPPYIN">또래해피인</MenuItem>
            </Select>
            <Button
              variant={showDetail ? "contained" : "outlined"}
              size="small"
              onClick={() => setShowDetail((p) => !p)}
              sx={{ flexShrink: 0 }}
            >
              {showDetail ? "상세검색 닫기" : "상세검색"}
            </Button>

            {/* 활성 필터 뱃지(선택) */}
            {useSearch && (
              <Chip
                size="small"
                label="상세필터 적용됨"
                onDelete={() => applyDetailFilters({})}
                sx={{ ml: 0.5 }}
              />
            )}

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
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => nav(`/user/happy/detail/${row.id}`)}
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
                              ? row[col.key] === "SUSPENDED"
                                ? "orange" // 일시정지
                                : row[col.key] === "BANNED"
                                ? "red" // 영구정지
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
                ))}
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
    </Paper>
  );
}
