import { useState } from "react";
import { Box, Select, MenuItem, Stack, Typography, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// 샘플 데이터 (실제로는 API로부터 받아옵니다)
const sampleRows = [
  {
    id: 55,
    category: "생명메시지",
    classification: "공통",
    section: "본문",
    content: "그래도 행복을 꿈꿔야 합니다.",
    score: "225",
    reports: "3",
    date: "2024.03.12 16:24:24",
    author: "어리버리청춘",
  },
  {
    id: 85,
    category: "홀파담벼락",
    classification: "공통",
    section: "댓글",
    content: "그래도 행복을 꿈꿔야 합니다.",
    score: "215",
    reports: "0",
    date: "2024.03.12 16:24:24",
    author: "어리버리청춘",
  },
];

const DreamUserDetailPosts = () => {
  // 컬럼 정의
  const columns = [
    { field: "id", headerName: "NO", width: 70 },
    { field: "category", headerName: "카테고리", width: 120 },
    { field: "classification", headerName: "분류", width: 80 },
    { field: "section", headerName: "글종류", width: 120 },
    { field: "content", headerName: "제목 / 내용", width: 250 },
    { field: "score", headerName: "홀파스코어", width: 120 },
    { field: "reports", headerName: "신고수", width: 100 },
    { field: "date", headerName: "등록일시", width: 200 },
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

export default DreamUserDetailPosts;
