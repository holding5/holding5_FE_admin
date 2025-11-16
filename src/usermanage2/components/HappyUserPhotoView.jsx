// src/pages/components/HappyUserPhotoView.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Pagination,
} from "@mui/material";
import { Search as SearchIcon, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { labelMapper } from "../../utils/LabelMapper";
import {
  happyinRoleMap,
  groupCategoryMap,
  sortKeyMap,
} from "../../constant/codeMaps";
import { useHappyinCards } from "../hooks/useHappyins"; // ✅ useHappyinCards 추가 import

// 옵션들
const ROLE_OPTIONS = [
  { value: "", label: "해피인 분류 전체" },
  ...Object.keys(happyinRoleMap).map((key) => ({
    value: key,
    label: labelMapper("happyinRoleMap", key),
  })),
];

const CATEGORY_OPTIONS = [
  { value: "", label: "카테고리 전체" },
  ...Object.keys(groupCategoryMap).map((key) => ({
    value: key,
    label: labelMapper("groupCategoryMap", key),
  })),
];

const SORT_OPTIONS = Object.keys(sortKeyMap).map((key) => ({
  value: key,
  label: labelMapper("sortKeyMap", key),
}));

const PAGE_SIZE_OPTIONS = [12, 24, 36];

const HappyUserPhotoView = () => {
  const navigate = useNavigate();

  // 🔹 /admin/happyin 카드 목록 훅 사용
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
  } = useHappyinCards({
    initialPage: 1,
    initialSize: 12,
    initialParams: { sort: "NAME_ASC" },
  });

  // UI 상태
  const [roleFilter, setRoleFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortKey, setSortKey] = useState("NAME_ASC");
  const [keywordInput, setKeywordInput] = useState("");

  // params -> UI 동기화
  useEffect(() => {
    setRoleFilter(params?.role ?? "");
    setCategoryFilter(params?.category ?? "");
    setSortKey(params?.sort ?? "NAME_ASC");
    setKeywordInput(params?.q ?? "");
  }, [params?.role, params?.category, params?.sort, params?.q]);

  // 핸들러들
  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRoleFilter(value);
    setParams((prev) => {
      const next = { ...prev };
      if (value) next.role = value;
      else delete next.role;
      return next;
    });
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    setParams((prev) => {
      const next = { ...prev };
      if (value) next.category = value;
      else delete next.category;
      return next;
    });
    setPage(1);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortKey(value);
    setParams((prev) => ({
      ...prev,
      sort: value, // NAME_ASC 같은 ENUM
    }));
    setPage(1);
  };

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

  const clearQuery = () => {
    setKeywordInput("");
    setParams((prev) => {
      const next = { ...prev };
      delete next.q;
      return next;
    });
    setPage(1);
  };

  const onChangePageSize = (value) => {
    setSize(value);
    setPage(1);
  };

  const handleChangePage = (_e, value) => {
    setPage(value);
  };

  const handleCardClick = (id) => {
    navigate(`/user/happy/detail/${id}`);
  };

  const list = rows || [];

  return (
    <Paper>
      {/* 상단 바 */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <Select
              size="small"
              value={roleFilter}
              onChange={handleRoleChange}
              sx={{ minWidth: 140, fontSize: "0.8rem" }}
              displayEmpty
            >
              {ROLE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              size="small"
              value={categoryFilter}
              onChange={handleCategoryChange}
              sx={{ minWidth: 160, fontSize: "0.8rem" }}
              displayEmpty
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              size="small"
              value={sortKey}
              onChange={handleSortChange}
              sx={{ minWidth: 160, fontSize: "0.8rem" }}
            >
              {SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>

            <TextField
              size="small"
              placeholder="해피인 검색 (닉네임/이름으로 검색)"
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
                endAdornment:
                  keywordInput !== "" ? (
                    <InputAdornment position="end">
                      <Clear
                        fontSize="small"
                        sx={{ cursor: "pointer" }}
                        onClick={clearQuery}
                      />
                    </InputAdornment>
                  ) : null,
              }}
              sx={{ flexGrow: 1 }}
            />

            <Button
              variant="contained"
              size="small"
              onClick={runKeywordSearch}
              sx={{ flexShrink: 0 }}
            >
              검색
            </Button>
          </Stack>

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
              {PAGE_SIZE_OPTIONS.map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </Box>

      {/* 카드 그리드 */}
      <Box sx={{ px: 2, pb: 2 }}>
        {loading ? (
          <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
            로딩 중...
          </Box>
        ) : list.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
            <Typography variant="body1">
              조건에 맞는 해피인이 없습니다.
            </Typography>
            <Typography variant="body2">
              필터를 변경하거나 검색어를 다시 입력해보세요.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {list.map((profile) => (
              <Grid
                key={profile.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardActionArea
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                    onClick={() => handleCardClick(profile.id)}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        profile.thumbnailUrl ||
                        "https://placehold.co/400x260?text=HAPPYIN"
                      }
                      alt={profile.nickname || profile.name}
                      sx={{
                        width: 240,
                        height: 150, // ✅ 이미지 영역 고정
                        objectFit: "contain", // (원하면 cover 로 변경)
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack spacing={0.7}>
                        <Typography variant="subtitle1" fontWeight={600} noWrap>
                          {profile.name}
                          <span style={{ color: "#888", fontWeight: 400 }}>
                            {" "}
                            &nbsp;|&nbsp; {profile.nickname}
                          </span>
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          sx={{ minHeight: 32 }}
                        >
                          <Chip
                            size="small"
                            label={labelMapper(
                              "serviceRoleMap",
                              profile.serviceRole
                            )}
                            variant="outlined"
                            sx={{
                              "& .MuiChip-label": {
                                whiteSpace: "nowrap", // ✅ 칩 텍스트 줄 바꿈 방지
                              },
                            }}
                          />
                          {profile.category && (
                            <Chip
                              size="small"
                              label={labelMapper(
                                "groupCategoryMap",
                                profile.category
                              )}
                              variant="outlined"
                              sx={{
                                "& .MuiChip-label": {
                                  whiteSpace: "nowrap", // ✅ 여기도 줄 바꿈 방지
                                },
                              }}
                            />
                          )}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* 페이지네이션 */}
      <Pagination
        sx={{ display: "flex", justifyContent: "center", pb: 2 }}
        count={totalPages || Math.ceil((totalElements || 0) / (size || 12))}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Paper>
  );
};

export default HappyUserPhotoView;
