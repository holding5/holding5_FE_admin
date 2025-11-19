// DreamUserTable.jsx
import React, { useState, useEffect, useMemo } from "react";
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
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useHappyinPosts } from "../hooks/useHappyins";
import { labelMapper } from "../../utils/LabelMapper";

// 날짜 포맷 유틸
const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
};

const columns = [
  { key: "id", label: "번호", width: "2rem" },
  {
    key: "category",
    label: "카테고리",
    width: "4rem",
    valueFormatter: (v) => (v ? labelMapper("postCategoryTypeMap", v) : "-"),
  },
  {
    key: "topic",
    label: "분류",
    width: "7rem",
    valueFormatter: (v) => (v ? labelMapper("postTopicMap", v) : "-"),
  },
  {
    key: "type",
    label: "글 종류",
    width: "3rem",
    valueFormatter: (v) => (v ? labelMapper("postTypeMap", v) : "-"),
  },
  { key: "content", label: "제목/내용", width: "12rem" },
  {
    key: "createdAt",
    label: "작성일",
    width: "6rem",
    valueFormatter: formatDateTime,
  },
  {
    key: "mediaFiles",
    label: "미디어",
    width: "80px",
    valueFormatter: (files) => {
      if (!files || files.length === 0) return "-";
      // 예: "이미지 2, 오디오 1" 같이 보여주기
      const imageCount = files.filter((f) => f.kind === "IMAGE").length;
      const audioCount = files.filter((f) => f.kind === "AUDIO").length;
      const videoCount = files.filter((f) => f.kind === "VIDEO").length;

      const parts = [];
      if (imageCount) parts.push(`이미지 ${imageCount}`);
      if (audioCount) parts.push(`오디오 ${audioCount}`);
      if (videoCount) parts.push(`영상 ${videoCount}`);

      return parts.join(", ");
    },
  },
  { key: "holpaScore", label: "홀파스코어", width: "3rem" },
  { key: "reportCount", label: "신고 수", width: "3rem" },

  { key: "authorNickname", label: "작성자", width: "5rem" },
];

const sortableKeys = ["createdAt"];

export default function HappyUserPosts() {
  const { id } = useParams();
  const happyinId = id;
  const nav = useNavigate();

  // ✅ 카테고리에 따라 디테일 페이지 path 계산
  const getDetailPath = (row) => {
    const cat = row.category;

    switch (cat) {
      case "HOLPA_WALL":
      case "홀파담벼락":
        return `/admin/post/holpa/detail/${row.postId}`;

      case "CATS_EYE":
      case "캣츠아이":
        return `/admin/post/catseye/detail/${row.postId}`;

      case "OVERCOME":
      case "극복수기":
        return `/admin/post/overcome/detail/${row.postId}`;

      default:
        return null; // 알 수 없는 카테고리면 이동 안 함
    }
  };

  const handleRowClick = (row) => {
    const path = getDetailPath(row);
    if (path) {
      nav(path);
    }
  };

  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const [categoryFilter, setCategoryFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const {
    rows,
    totalElements,
    totalPages,
    loading,
    page,
    setPage,
    size,
    setSize,
    setSort,
  } = useHappyinPosts(happyinId, {
    initialPage: 1,
    initialSize: 25,
    initialSort: sortConfig,
  });

  // 옵션은 현재 rows 기준으로 동적 생성 (필요하면 하드코딩도 가능)
  const categoryOptions = useMemo(
    () => Array.from(new Set(rows.map((r) => r.category).filter((v) => !!v))),
    [rows]
  );
  const topicOptions = useMemo(
    () => Array.from(new Set(rows.map((r) => r.topic).filter((v) => !!v))),
    [rows]
  );
  const typeOptions = useMemo(
    () => Array.from(new Set(rows.map((r) => r.type).filter((v) => !!v))),
    [rows]
  );

  // 🔍 셀렉트로 클라이언트 필터링
  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        if (categoryFilter && row.category !== categoryFilter) return false;
        if (topicFilter && row.topic !== topicFilter) return false;
        if (typeFilter && row.type !== typeFilter) return false;
        return true;
      }),
    [rows, categoryFilter, topicFilter, typeFilter]
  );

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

  // 📄 페이지당 개수
  const onChangePageSize = (v) => {
    setSize(v);
    setPage(1);
  };

  return (
    <Paper>
      {/* 상단 영역 */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* 왼쪽: 역할 셀렉트 */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            {/* category */}
            <Select
              size="small"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              displayEmpty
              sx={{ minWidth: 140, fontSize: "0.8rem" }}
            >
              <MenuItem value="">
                <em>카테고리 전체</em>
              </MenuItem>
              {categoryOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {labelMapper("postCategoryTypeMap", t)}
                </MenuItem>
              ))}
            </Select>

            {/* topic */}
            <Select
              size="small"
              value={topicFilter}
              onChange={(e) => {
                setTopicFilter(e.target.value);
                setPage(1);
              }}
              displayEmpty
              sx={{ minWidth: 140, fontSize: "0.8rem" }}
            >
              <MenuItem value="">
                <em>분류 전체</em>
              </MenuItem>
              {topicOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {labelMapper("holpaPostCategory", t)}
                </MenuItem>
              ))}
            </Select>

            {/* type */}
            <Select
              size="small"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              displayEmpty
              sx={{ minWidth: 120, fontSize: "0.8rem" }}
            >
              <MenuItem value="">
                <em>글 종류 전체</em>
              </MenuItem>
              {typeOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {labelMapper("postTypeMap", t)}
                </MenuItem>
              ))}
            </Select>
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
                {filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ py: 4, fontSize: "14px", color: "text.secondary" }}
                    >
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows.map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row)}
                    >
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          align="center"
                          sx={{
                            border: "1px solid #ccc",
                            fontSize: "12px",
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
    </Paper>
  );
}
