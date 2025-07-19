import { useState } from "react";
import { Box, Select, MenuItem, Stack, Typography, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// 샘플 데이터 (실제로는 API로부터 받아옵니다)
const sampleRows = [
  {
    id: 55,
    category: "생명메시지",
    classification: "공통",
    religion: "상관없음",
    content: "그래도 행복을 꿈꿔야 합니다.",
    file: "240405067.m4a",
    date: "2024.03.12 16:24:24",
    author: "어리버리청춘",
  },
  {
    id: 54,
    category: "희망메시지",
    classification: "성적, 학업문제",
    religion: "기독교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 53,
    category: "홀파담락",
    classification: "부모갈등",
    religion: "기독교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 52,
    category: "",
    classification: "공통",
    religion: "무관",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 51,
    category: "",
    classification: "선생님과 갈등",
    religion: "불교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 50,
    category: "",
    classification: "외모문제",
    religion: "천주교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 49,
    category: "",
    classification: "왕따, 폭력문제",
    religion: "기독교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 48,
    category: "",
    classification: "공통",
    religion: "무관",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 47,
    category: "",
    classification: "공통",
    religion: "상관없음",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
];

const UserDetailPosts = () => {
  // 컬럼 정의
  const columns = [
    { field: "id", headerName: "NO", width: 70 },
    { field: "category", headerName: "카테고리", width: 150 },
    { field: "classification", headerName: "분류", width: 150 },
    { field: "religion", headerName: "종교", width: 120 },
    { field: "content", headerName: "제목 / 내용", width: 250 },
    { field: "file", headerName: "파일명", width: 150 },
    { field: "date", headerName: "등록일시", width: 180 },
    {
      field: "author",
      headerName: "작성자 닉네임",
      width: 150,
      renderCell: (params) => (
        <Link href="#" underline="always">
          {params.value}
        </Link>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }} alignItems="center">
        <Select defaultValue="all" size="small">
          <MenuItem value="all">전체 V</MenuItem>
        </Select>
        <Select defaultValue="all" size="small">
          <MenuItem value="all">전체 V</MenuItem>
        </Select>
        <Select defaultValue="all" size="small">
          <MenuItem value="all">전체 V</MenuItem>
        </Select>
        <Box sx={{ flexGrow: 1 }} />
        <Select defaultValue={50} size="small">
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Stack>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={sampleRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default UserDetailPosts;
